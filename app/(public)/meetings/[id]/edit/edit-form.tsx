'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { updateMeeting, type State } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

const initialState: State = { message: null, errors: {} };

interface Props {
  meeting: SacramentMeeting;
}

export default function EditMeetingForm({ meeting }: Props) {
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);
  const [state, formAction, isPending] = useActionState(
    updateMeetingWithId,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      <Field
        label="Date"
        id="date"
        type="date"
        name="date"
        defaultValue={meeting.date}
        errors={state.errors?.date}
      />

      <div>
        <label htmlFor="meetingType" className="block text-sm font-medium text-slate-700 mb-1">
          Meeting Type
        </label>
        <select
          id="meetingType"
          name="meetingType"
          defaultValue={meeting.meetingType}
          className="block w-full rounded-md border border-slate-300 px-3 py-2"
          aria-describedby="meetingType-error"
        >
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
        </select>
        <ErrorList id="meetingType-error" errors={state.errors?.meetingType} />
      </div>

      <Field label="Presiding" id="presiding" name="presiding" defaultValue={meeting.presiding} errors={state.errors?.presiding} />
      <Field label="Conducting" id="conducting" name="conducting" defaultValue={meeting.conducting} errors={state.errors?.conducting} />

      <fieldset className="border rounded-md p-4">
        <legend className="px-1 text-sm font-medium text-slate-700">Opening Hymn</legend>
        <Field label="Number" id="openingHymnNumber" name="openingHymnNumber" type="number" defaultValue={String(meeting.openingHymn.number)} errors={state.errors?.['openingHymn.number']} />
        <Field label="Title" id="openingHymnTitle" name="openingHymnTitle" defaultValue={meeting.openingHymn.title} errors={state.errors?.['openingHymn.title']} />
      </fieldset>

      <Field label="Opening Prayer" id="openingPrayer" name="openingPrayer" defaultValue={meeting.openingPrayer} errors={state.errors?.openingPrayer} />

      <div>
        <label htmlFor="stakeBusiness" className="inline-flex items-center gap-2 text-sm">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={meeting.stakeBusiness}
          />
          Stake business
        </label>
      </div>

      <fieldset className="border rounded-md p-4">
        <legend className="px-1 text-sm font-medium text-slate-700">Sacrament Hymn</legend>
        <Field label="Number" id="sacramentHymnNumber" name="sacramentHymnNumber" type="number" defaultValue={String(meeting.sacramentHymn.number)} errors={state.errors?.['sacramentHymn.number']} />
        <Field label="Title" id="sacramentHymnTitle" name="sacramentHymnTitle" defaultValue={meeting.sacramentHymn.title} errors={state.errors?.['sacramentHymn.title']} />
      </fieldset>

      <fieldset className="border rounded-md p-4">
        <legend className="px-1 text-sm font-medium text-slate-700">Closing Hymn</legend>
        <Field label="Number" id="closingHymnNumber" name="closingHymnNumber" type="number" defaultValue={String(meeting.closingHymn.number)} errors={state.errors?.['closingHymn.number']} />
        <Field label="Title" id="closingHymnTitle" name="closingHymnTitle" defaultValue={meeting.closingHymn.title} errors={state.errors?.['closingHymn.title']} />
      </fieldset>

      <Field label="Closing Prayer" id="closingPrayer" name="closingPrayer" defaultValue={meeting.closingPrayer} errors={state.errors?.closingPrayer} />

      <input type="hidden" name="wardBusiness" value={JSON.stringify(meeting.wardBusiness)} />
      <input type="hidden" name="speakers" value={JSON.stringify(meeting.speakers)} />
      {meeting.announcements?.map((a, i) => (
        <input key={i} type="hidden" name="announcements" value={a} />
      ))}

      {state.message ? (
        <p className="text-sm text-red-600" aria-live="polite">
          {state.message}
        </p>
      ) : null}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
        <Link
          href={`/meetings/${meeting.id}`}
          className="rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  name,
  type = 'text',
  defaultValue,
  errors,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  defaultValue?: string;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="block w-full rounded-md border border-slate-300 px-3 py-2"
        aria-describedby={`${id}-error`}
      />
      <ErrorList id={`${id}-error`} errors={errors} />
    </div>
  );
}

function ErrorList({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors?.map((error) => (
        <p key={error} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}