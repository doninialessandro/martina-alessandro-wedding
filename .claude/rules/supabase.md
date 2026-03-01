# Supabase & RSVP Data

## Client

`lib/supabase/client.ts` — browser-side `createClient` using:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Singleton export: `supabase`

## Types — `lib/supabase/types.ts`

```
Family     { id, code, created_at }
FamilyMember { id, family_id, first_name, last_name, created_at }
Rsvp       { id, family_id, attending_members: string[], declined: boolean, notes: string | null, created_at, updated_at }
```

## Queries — `lib/rsvp/queries.ts`

| Function | Table | Method | Notes |
|----------|-------|--------|-------|
| `searchFamilyMember(first, last)` | `family_members` | `.ilike()` on first_name + last_name | Returns matching rows |
| `getFamilyMembers(familyId)` | `family_members` | `.eq('family_id', id)` | All members in family |
| `getExistingRsvp(familyId)` | `rsvps` | `.eq().maybeSingle()` | Returns null or existing RSVP |
| `upsertRsvp(payload)` | `rsvps` | `.upsert(payload, { onConflict: 'family_id' })` | Insert or update |

## Database Tables

- `family_members` — lookup by first/last name (case-insensitive via ilike)
- `rsvps` — one row per family, upsert on `family_id` conflict

## Architecture Notes

- All queries are client-side (no server actions, no API routes)
- Env vars must be `NEXT_PUBLIC_*` prefixed for browser access
- RSVP flow: search member > get family > check existing RSVP > upsert response
