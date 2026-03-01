import type { Page } from '@playwright/test'

interface MockRsvpApiOptions {
  searchResults: object[] | null
  familyMembers: object[]
  existingRsvp: object | null
  familyMembersError?: boolean
  upsertSuccess?: boolean
}

export async function mockRsvpApi(page: Page, options: MockRsvpApiOptions) {
  const {
    searchResults,
    familyMembers,
    existingRsvp,
    familyMembersError = false,
    upsertSuccess = true,
  } = options

  await page.route('**/rest/v1/family_members**', (route) => {
    const url = route.request().url()

    // Search by name: URL contains first_name=ilike params
    if (url.includes('first_name=ilike')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(searchResults ?? []),
      })
    }

    // Fetch family members by family_id
    if (url.includes('family_id=eq.')) {
      if (familyMembersError) {
        return route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Internal server error' }),
        })
      }
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(familyMembers),
      })
    }

    return route.continue()
  })

  await page.route('**/rest/v1/rsvps**', (route) => {
    const method = route.request().method()

    if (method === 'GET') {
      if (existingRsvp) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(existingRsvp),
        })
      }
      // maybeSingle() with no match: Supabase returns 406 with PGRST116
      return route.fulfill({
        status: 406,
        contentType: 'application/json',
        body: JSON.stringify({
          code: 'PGRST116',
          details: 'The result contains 0 rows',
          hint: null,
          message: 'JSON object requested, multiple (or no) rows returned',
        }),
      })
    }

    if (method === 'POST') {
      if (upsertSuccess) {
        return route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({}),
        })
      }
      return route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Bad request' }),
      })
    }

    return route.continue()
  })
}
