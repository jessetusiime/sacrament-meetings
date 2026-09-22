'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createMeeting as dbCreateMeeting,
  updateMeeting as dbUpdateMeeting,
  deleteMeeting as dbDeleteMeeting,
} from './meetings-db';
import type { SacramentMeeting, SpeakerItem, WardBusinessItem } from './types';

const HymnSchema = z.object({
  number: z.coerce
    .number()
    .int('Hymn number must be a whole number.')
    .min(1, 'Hymn number must be at least 1.')
    .max(400, 'Hymn number is too high.'),
  title: z.string().min(1, 'Hymn title is required.'),
});

const SpeakerSchema = z.object({
  name: z.string().min(1, 'Speaker or group name is required.'),
  topic: z.string().optional().default(''),
  type: z.enum(['speaker', 'musical-number']),
});

const WardBusinessSchema = z.object({
  description: z.string().min(1, 'Description is required.'),
});

const MeetingFormSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general']),
  presiding: z.string().min(1, 'Presiding is required.'),
  conducting: z.string().min(1, 'Conducting is required.'),
  announcements: z.array(z.string()).default([]),
  openingHymn: HymnSchema,
  openingPrayer: z.string().min(1, 'Opening prayer is required.'),
  wardBusiness: z.array(WardBusinessSchema).default([]),
  stakeBusiness: z.coerce.boolean(),
  sacramentHymn: HymnSchema,
  speakers: z.array(SpeakerSchema).default([]),
  closingHymn: HymnSchema,
  closingPrayer: z.string().min(1, 'Closing prayer is required.'),
});

export type State = {
  errors?: Record<string, string[] | undefined>;
  message?: string | null;
};

function parseFormData(formData: FormData) {
  const announcements = formData.getAll('announcements').map(String).filter(Boolean);
  let wardBusiness: WardBusinessItem[] = [];
  const wardBusinessRaw = formData.get('wardBusiness');
  if (typeof wardBusinessRaw === 'string' && wardBusinessRaw.length > 0) {
    try {
      wardBusiness = JSON.parse(wardBusinessRaw);
    } catch {
      wardBusiness = [];
    }
  }

  let speakers: SpeakerItem[] = [];
  const speakersRaw = formData.get('speakers');
  if (typeof speakersRaw === 'string' && speakersRaw.length > 0) {
    try {
      speakers = JSON.parse(speakersRaw);
    } catch {
      speakers = [];
    }
  }

  return {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements,
    openingHymn: {
      number: formData.get('openingHymnNumber'),
      title: formData.get('openingHymnTitle'),
    },
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness,
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    sacramentHymn: {
      number: formData.get('sacramentHymnNumber'),
      title: formData.get('sacramentHymnTitle'),
    },
    speakers,
    closingHymn: {
      number: formData.get('closingHymnNumber'),
      title: formData.get('closingHymnTitle'),
    },
    closingPrayer: formData.get('closingPrayer'),
  };
}

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validated = MeetingFormSchema.safeParse(parseFormData(formData));

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Please fix the errors above.',
    };
  }

  try {
    await dbCreateMeeting(validated.data as Omit<SacramentMeeting, 'id'>);
  } catch (error) {
    console.error('Error creating meeting:', error);
    return {
      message: 'Database error: failed to create meeting. Please try again.',
    };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validated = MeetingFormSchema.safeParse(parseFormData(formData));

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Please fix the errors above.',
    };
  }

  try {
    const updated = await dbUpdateMeeting(
      id,
      validated.data as Omit<SacramentMeeting, 'id'>
    );
    if (!updated) {
      return { message: 'Meeting not found.' };
    }
  } catch (error) {
    console.error('Error updating meeting:', error);
    return {
      message: 'Database error: failed to update meeting. Please try again.',
    };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect(`/meetings/${id}`);
}

export async function deleteMeeting(id: number): Promise<void> {
  try {
    await dbDeleteMeeting(id);
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Failed to delete meeting. Please try again later.');
  }
  revalidatePath('/meetings');
  redirect('/meetings');
}