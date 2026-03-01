# RSVP Section

## State Machine

```
search --> loading --> notfound
                  --> select --> submitting --> success
                                           --> declined
                                           --> error
```

`reset()` returns to `search` from any state.

## `useSectionData` Hook — `use-section-data.ts`

Manages all RSVP state and Supabase interactions:

- **search()**: trims input, validates non-empty, calls `searchFamilyMember` > `getFamilyMembers` > `getExistingRsvp`. Pre-selects searched member or loads existing RSVP data.
- **toggleMember(id)**: adds/removes from `selectedIds` Set. Sets `deselectedId` for 1s (triggers sad emoji animation).
- **submit()**: upserts RSVP with `declined: false` and selected member IDs.
- **decline()**: upserts RSVP with `declined: true` and empty `attending_members`.
- **reset()**: clears all state back to initial.
- **fadeKey**: increments on step change to re-trigger mount animations.

## Components

- **`search-form.tsx`**: first/last name inputs with HTML5 required validation, trim-on-blur
- **`member-select.tsx`**: checkbox list of family members, notes textarea, confirm/decline/reset buttons. Singular vs plural copy variants based on `familyMembers.length > 1`.
- **`status-view.tsx`**: renders UI for loading, notfound, submitting, success, declined, error steps. Uses `Typewriter` for text reveal, `MonolineFlower` for loading spinners, `ConfettiBurst` on success.
- **`confetti-burst.tsx`**: 300-particle physics simulation via `useAnimationFrame` (gravity, decay, wobble, tilt)
- **`typewriter.tsx`**: grapheme-aware (`Intl.Segmenter`) text reveal using Framer Motion staggered children

## Copy Variants

`copy.json` provides singular/plural variants for:
- `existingConfirmedSingular` / `existingConfirmedPlural`
- `existingDeclinedSingular` / `existingDeclinedPlural`
- `declineButtonSingular` / `declineButtonPlural`
- `success.messageSingular` / `success.messagePlural`
- `declined.titleSingular` / `declined.titlePlural`
- `declined.messageSingular` / `declined.messagePlural`

## Tests

Co-located test files:
- `use-section-data.test.ts` — state machine tests (search, toggle, submit, decline, reset)
- `components/search-form.test.tsx` — form rendering, input handling, trim-on-blur
- `components/member-select.test.tsx` — checkbox toggling, confirm/decline, singular/plural copy
- `components/status-view.test.tsx` — loading, notfound, success, declined, error step rendering

## No-JS Support

- `data-nojs-hide` on the interactive form container
- `<noscript>` block shows fallback message from `copy.noJs.message`
- `@media (scripting: none)` in globals.css handles the CSS
