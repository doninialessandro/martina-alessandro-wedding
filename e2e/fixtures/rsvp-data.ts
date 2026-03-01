export const SOLO_MEMBER = {
  id: 'member-solo-1',
  family_id: 'family-solo',
  first_name: 'Giulia',
  last_name: 'Bianchi',
  created_at: '2025-01-01T00:00:00Z',
}

export const FAMILY_MEMBERS = [
  {
    id: 'member-multi-1',
    family_id: 'family-multi',
    first_name: 'Mario',
    last_name: 'Rossi',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'member-multi-2',
    family_id: 'family-multi',
    first_name: 'Anna',
    last_name: 'Rossi',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'member-multi-3',
    family_id: 'family-multi',
    first_name: 'Luca',
    last_name: 'Rossi',
    created_at: '2025-01-01T00:00:00Z',
  },
]

export const EXISTING_CONFIRMED_RSVP = {
  id: 'rsvp-1',
  family_id: 'family-multi',
  attending_members: ['member-multi-1', 'member-multi-2'],
  declined: false,
  notes: 'Allergia ai crostacei',
  created_at: '2025-01-10T00:00:00Z',
  updated_at: '2025-01-10T00:00:00Z',
}

export const EXISTING_DECLINED_RSVP = {
  id: 'rsvp-2',
  family_id: 'family-multi',
  attending_members: [],
  declined: true,
  notes: null,
  created_at: '2025-01-10T00:00:00Z',
  updated_at: '2025-01-10T00:00:00Z',
}

export const SOLO_DECLINED_RSVP = {
  id: 'rsvp-3',
  family_id: 'family-solo',
  attending_members: [],
  declined: true,
  notes: null,
  created_at: '2025-01-10T00:00:00Z',
  updated_at: '2025-01-10T00:00:00Z',
}

export const SOLO_CONFIRMED_RSVP = {
  id: 'rsvp-4',
  family_id: 'family-solo',
  attending_members: ['member-solo-1'],
  declined: false,
  notes: 'Vegetariana',
  created_at: '2025-01-10T00:00:00Z',
  updated_at: '2025-01-10T00:00:00Z',
}
