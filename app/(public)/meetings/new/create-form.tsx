'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { createMeeting, type State } from '@/lib/actions';
import type { SpeakerItem } from '@/lib/types';

const initialState: State = { message: null, errors: {} };

export default function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState
  );

  const [speakers, setSpeakers] = useState<SpeakerItem[]>([
    { name: '', topic: '', type: 'speaker' },
  ]);

  function updateSpeaker(index: number, patch: Partial<SpeakerItem>) {
    setSpeakers((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...patch } : s))
    );
  }

  function addSpeaker() {
    setSpeakers((prev) => [...prev, { name: '', topic: '', type: 'speaker' }]);
  }

  function removeSpeaker(index: number) {
    setSpeakers((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      <Field label="Date" id="date" name="date" type="date" errors={state.errors?.date} />

      <div>
        <label htmlFor="meetingType" className="block text-sm font-medium text-slate-700 mb-1">
          Meeting Type
        </label>
        <select
          id="meetingType"
          name="meetingType"
          defaultValue="regular"
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

      <Field label="Presiding" id="presiding" name="presiding" errors={state.errors?.presiding} />
      <Field label="Conducting" id="conducting" name="conducting" errors={state.errors?.conducting} />

      <fieldset className="border rounded-md p-4">
        <legend className="px-1 text-sm font-medium text-slate-700">Opening Hymn</legend>
        <Field label="Number" id="openingHymnNumber" name="openingHymnNumber" type="number" errors={state.errors?.['openingHymn.number']} />
        <Field label="Title" id="openingHymnTitle" name="openingHymnTitle" errors={state.errors?.['openingHymn.title']} />
      </fieldset>

      <Field label="Opening Prayer" id="openingPrayer" name="openingPrayer" errors={state.errors?.openingPrayer} />

      <div>
        <label htmlFor="stakeBusiness" className="inline-flex items-center gap-2 text-sm">
          <input id="stakeBusiness" name="stakeBusiness" type="checkbox" />
          Stake business
        </label>
      </div>

      <fieldset className="border rounded-md p-4">
        <legend className="px-1 text-sm font-medium text-slate-700">Sacrament Hymn</legend>
        <Field label="Number" id="sacramentHymnNumber" name="sacramentHymnNumber" type="number" errors={state.errors?.['sacramentHymn.number']} />
        <Field label="Title" id="sacramentHymnTitle" name="sacramentHymnTitle" errors={state.errors?.['sacramentHymn.title']} />
      </fieldset>

      <fieldset className="border rounded-md p-4 space-y-3">
        <legend className="px-1 text-sm font-medium text-slate-700">Speakers & Musical Numbers</legend>
        {speakers.map((s, i) => (
          <div key={i} className="flex flex-wrap gap-2 items-start">
            <div className="flex-1 min-w-[150px]">
              <label htmlFor={`speaker-name-${i}`} className="block text-xs text-slate-600 mb-1">Name</label>
              <input
                id={`speaker-name-${i}`}
                value={s.name}
                onChange={(e) => updateSpeaker(i, { name: e.target.value })}
                className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label htmlFor={`speaker-topic-${i}`} className="block text-xs text-slate-600 mb-1">Topic</label>
              <input
                id={`speaker-topic-${i}`}
                value={s.topic}
                onChange={(e) => updateSpeaker(i, { topic: e.target.value })}
                className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label htmlFor={`speaker-type-${i}`} className="block text-xs text-slate-600 mb-1">Type</label>
              <select
                id={`speaker-type-${i}`}
                value={s.type}
                onChange={(e) =>
                  updateSpeaker(i, { type: e.target.value as SpeakerItem['type'] })
                }
                className="rounded-md border border-slate-300 px-2 py-1 text-sm"
              >
                <option value="speaker">Speaker</option>
                <option value="musical-number">Musical Number</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => removeSpeaker(i)}
              className="text-sm text-red-600 hover:underline mt-5"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSpeaker}
          className="text-sm text-blue-700 hover:underline"
        >
          + Add speaker
        </button>
      </fieldset>

      <fieldset className="border rounded-md p-4">
        <legend className="px-1 text-sm font-medium text-slate-700">Closing Hymn</legend>
        <Field label="Number" id="closingHymnNumber" name="closingHymnNumber" type="number" errors={state.errors?.['closingHymn.number']} />
        <Field label="Title" id="closingHymnTitle" name="closingHymnTitle" errors={state.errors?.['closingHymn.title']} />
      </fieldset>

      <Field label="Closing Prayer" id="closingPrayer" name="closingPrayer" errors={state.errors?.closingPrayer} />

      <input type="hidden" name="speakers" value={JSON.stringify(speakers)} />
      <input type="hidden" name="wardBusiness" value={JSON.stringify([])} />

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
          {isPending ? 'Creating...' : 'Create Meeting'}
        </button>
        <Link
          href="/meetings"
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