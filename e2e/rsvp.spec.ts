import { expect, test } from '@playwright/test'
import {
  EXISTING_CONFIRMED_RSVP,
  EXISTING_DECLINED_RSVP,
  FAMILY_MEMBERS,
  SOLO_CONFIRMED_RSVP,
  SOLO_DECLINED_RSVP,
  SOLO_MEMBER,
} from './fixtures/rsvp-data'
import { mockRsvpApi } from './helpers/rsvp-api'

// Run RSVP tests only on chromium to keep CI fast
test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only')

async function scrollToRsvp(page: import('@playwright/test').Page) {
  const heading = page.getByText('RSVP', { exact: true })
  await heading.scrollIntoViewIfNeeded()
  await expect(heading).toBeVisible()
}

async function fillAndSearch(
  page: import('@playwright/test').Page,
  firstName: string,
  lastName: string
) {
  await page.locator('#rsvp-first-name').fill(firstName)
  await page.locator('#rsvp-last-name').fill(lastName)
  await page.getByRole('button', { name: 'Cerca' }).click()
}

test.describe('RSVP - Happy path', () => {
  test('single member: search, confirm, success with singular copy', async ({ page }) => {
    await mockRsvpApi(page, {
      searchResults: [SOLO_MEMBER],
      familyMembers: [SOLO_MEMBER],
      existingRsvp: null,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Giulia', 'Bianchi')

    // Member select with solo member pre-checked
    await expect(page.getByRole('checkbox', { name: 'Giulia Bianchi' })).toBeChecked()

    // Confirm
    await page.getByRole('button', { name: 'Conferma Presenza' }).click()

    // Success with singular copy
    await expect(page.getByText('Grazie!')).toBeVisible()
    await expect(page.getByText('con te!')).toBeVisible()
  })

  test('multiple members: search, select 2, add notes, confirm, success with plural copy', async ({
    page,
  }) => {
    await mockRsvpApi(page, {
      searchResults: [FAMILY_MEMBERS[0]],
      familyMembers: FAMILY_MEMBERS,
      existingRsvp: null,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Mario', 'Rossi')

    // Mario pre-checked (searched member), others unchecked
    await expect(page.getByRole('checkbox', { name: 'Mario Rossi' })).toBeChecked()
    await expect(page.getByRole('checkbox', { name: 'Anna Rossi' })).not.toBeChecked()
    await expect(page.getByRole('checkbox', { name: 'Luca Rossi' })).not.toBeChecked()

    // Select Anna too (force: true because sr-only input is overlaid by motion.div)
    await page.getByRole('checkbox', { name: 'Anna Rossi' }).check({ force: true })

    // Add notes
    await page.locator('#rsvp-notes').fill('Allergia alle noci')

    // Confirm
    await page.getByRole('button', { name: 'Conferma Presenza' }).click()

    // Success with plural copy
    await expect(page.getByText('Grazie!')).toBeVisible()
    await expect(page.getByText('con voi!')).toBeVisible()
  })

  test('success edit link re-runs search and shows pre-populated member select', async ({
    page,
  }) => {
    await mockRsvpApi(page, {
      searchResults: [FAMILY_MEMBERS[0]],
      familyMembers: FAMILY_MEMBERS,
      existingRsvp: null,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Mario', 'Rossi')
    await page.getByRole('button', { name: 'Conferma Presenza' }).click()

    await expect(page.getByText('Grazie!')).toBeVisible()

    // Mock the existing RSVP for the edit flow
    await mockRsvpApi(page, {
      searchResults: [FAMILY_MEMBERS[0]],
      familyMembers: FAMILY_MEMBERS,
      existingRsvp: {
        id: 'rsvp-edit',
        family_id: 'family-multi',
        attending_members: [FAMILY_MEMBERS[0].id],
        declined: false,
        notes: 'Allergia ai crostacei',
        created_at: '2025-01-10T00:00:00Z',
        updated_at: '2025-01-10T00:00:00Z',
      },
    })

    // Click edit
    await page.getByRole('button', { name: 'Modifica la tua risposta' }).click()

    // Should show member select with pre-populated state from existing RSVP
    await expect(page.getByRole('checkbox', { name: 'Mario Rossi' })).toBeChecked()
    await expect(page.getByRole('checkbox', { name: 'Anna Rossi' })).not.toBeChecked()
    await expect(page.getByRole('button', { name: 'Aggiorna Informazioni' })).toBeVisible()
    await expect(page.locator('#rsvp-notes')).toHaveValue('Allergia ai crostacei')
  })
})

test.describe('RSVP - Decline flow', () => {
  test('single member: decline shows singular declined copy', async ({ page }) => {
    await mockRsvpApi(page, {
      searchResults: [SOLO_MEMBER],
      familyMembers: [SOLO_MEMBER],
      existingRsvp: null,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Giulia', 'Bianchi')

    // Decline hint NOT shown for singular
    await expect(page.getByText(/Cliccando "Purtroppo non riusciamo/)).not.toBeVisible()

    await page.getByRole('button', { name: /non riesco a partecipare/ }).click()

    await expect(page.getByText('Ci mancherai!')).toBeVisible()
    await expect(page.getByText('Speriamo di rivederti presto')).toBeVisible()
  })

  test('multiple members: decline shows plural declined copy and decline hint is visible', async ({
    page,
  }) => {
    await mockRsvpApi(page, {
      searchResults: [FAMILY_MEMBERS[0]],
      familyMembers: FAMILY_MEMBERS,
      existingRsvp: null,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Mario', 'Rossi')

    // Decline hint visible for plural
    await expect(page.getByText(/Cliccando "Purtroppo non riusciamo/)).toBeVisible()

    await page.getByRole('button', { name: /non riusciamo a partecipare/ }).click()

    await expect(page.getByText('Ci mancherete!')).toBeVisible()
    await expect(page.getByText('Speriamo di rivedervi presto')).toBeVisible()
  })

  test('declined edit link re-runs search and shows member select', async ({ page }) => {
    await mockRsvpApi(page, {
      searchResults: [SOLO_MEMBER],
      familyMembers: [SOLO_MEMBER],
      existingRsvp: null,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Giulia', 'Bianchi')

    await page.getByRole('button', { name: /non riesco a partecipare/ }).click()

    await expect(page.getByText('Ci mancherai!')).toBeVisible()

    // Mock for edit flow — use SOLO_DECLINED_RSVP (matching family_id: 'family-solo')
    await mockRsvpApi(page, {
      searchResults: [SOLO_MEMBER],
      familyMembers: [SOLO_MEMBER],
      existingRsvp: SOLO_DECLINED_RSVP,
    })

    await page.getByRole('button', { name: 'Modifica la tua risposta' }).click()

    // Should show member select with declined state
    await expect(page.getByRole('checkbox', { name: 'Giulia Bianchi' })).toBeVisible()
    await expect(page.getByRole('checkbox', { name: 'Giulia Bianchi' })).not.toBeChecked()
    await expect(page.getByText(/Avevi indicato che non potevi partecipare/)).toBeVisible()
  })
})

test.describe('RSVP - Error handling', () => {
  test('search not found shows error and retry resets form', async ({ page }) => {
    await mockRsvpApi(page, {
      searchResults: [],
      familyMembers: [],
      existingRsvp: null,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Nobody', 'Here')

    await expect(page.getByText('Non ti abbiamo trovato')).toBeVisible()

    await page.getByRole('button', { name: 'Riprova' }).click()

    // Back to empty search form
    await expect(page.locator('#rsvp-first-name')).toBeVisible()
    await expect(page.locator('#rsvp-first-name')).toHaveValue('')
    await expect(page.locator('#rsvp-last-name')).toHaveValue('')
  })

  test('family members fetch error shows error message', async ({ page }) => {
    await mockRsvpApi(page, {
      searchResults: [SOLO_MEMBER],
      familyMembers: [],
      existingRsvp: null,
      familyMembersError: true,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Giulia', 'Bianchi')

    await expect(page.getByText('Qualcosa è andato storto')).toBeVisible()

    await page.getByRole('button', { name: 'Riprova' }).click()

    await expect(page.locator('#rsvp-first-name')).toBeVisible()
    await expect(page.locator('#rsvp-first-name')).toHaveValue('')
  })

  test('submit error shows error message and retry resets form', async ({ page }) => {
    await mockRsvpApi(page, {
      searchResults: [SOLO_MEMBER],
      familyMembers: [SOLO_MEMBER],
      existingRsvp: null,
      upsertSuccess: false,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Giulia', 'Bianchi')
    await page.getByRole('button', { name: 'Conferma Presenza' }).click()

    await expect(page.getByText('Qualcosa è andato storto')).toBeVisible()

    await page.getByRole('button', { name: 'Riprova' }).click()

    await expect(page.locator('#rsvp-first-name')).toBeVisible()
    await expect(page.locator('#rsvp-first-name')).toHaveValue('')
  })

  test('decline error shows error message', async ({ page }) => {
    await mockRsvpApi(page, {
      searchResults: [SOLO_MEMBER],
      familyMembers: [SOLO_MEMBER],
      existingRsvp: null,
      upsertSuccess: false,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Giulia', 'Bianchi')

    await page.getByRole('button', { name: /non riesco a partecipare/ }).click()

    await expect(page.getByText('Qualcosa è andato storto')).toBeVisible()
  })
})

test.describe('RSVP - Update existing', () => {
  test('confirmed RSVP shows update button, pre-checked members, pre-filled notes', async ({
    page,
  }) => {
    await mockRsvpApi(page, {
      searchResults: [FAMILY_MEMBERS[0]],
      familyMembers: FAMILY_MEMBERS,
      existingRsvp: EXISTING_CONFIRMED_RSVP,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Mario', 'Rossi')

    // Update button instead of confirm
    await expect(page.getByRole('button', { name: 'Aggiorna Informazioni' })).toBeVisible()

    // Pre-checked: member-multi-1 and member-multi-2 (from EXISTING_CONFIRMED_RSVP)
    await expect(page.getByRole('checkbox', { name: 'Mario Rossi' })).toBeChecked()
    await expect(page.getByRole('checkbox', { name: 'Anna Rossi' })).toBeChecked()
    await expect(page.getByRole('checkbox', { name: 'Luca Rossi' })).not.toBeChecked()

    // Pre-filled notes
    await expect(page.locator('#rsvp-notes')).toHaveValue('Allergia ai crostacei')

    // Existing confirmed message
    await expect(page.getByText(/Avete già confermato/)).toBeVisible()
  })

  test('declined RSVP shows existing declined message and disabled decline button', async ({
    page,
  }) => {
    await mockRsvpApi(page, {
      searchResults: [FAMILY_MEMBERS[0]],
      familyMembers: FAMILY_MEMBERS,
      existingRsvp: EXISTING_DECLINED_RSVP,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Mario', 'Rossi')

    // Existing declined message
    await expect(page.getByText(/Avevate indicato che non potevate partecipare/)).toBeVisible()

    // Decline button disabled
    await expect(page.getByRole('button', { name: /non riusciamo a partecipare/ })).toBeDisabled()

    // Update/confirm disabled (no members selected since declined has empty attending_members)
    await expect(page.getByRole('button', { name: 'Aggiorna Informazioni' })).toBeDisabled()
  })

  test('solo confirmed RSVP shows singular confirmed message', async ({ page }) => {
    await mockRsvpApi(page, {
      searchResults: [SOLO_MEMBER],
      familyMembers: [SOLO_MEMBER],
      existingRsvp: SOLO_CONFIRMED_RSVP,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Giulia', 'Bianchi')

    // Singular confirmed message
    await expect(page.getByText(/Hai già confermato/)).toBeVisible()

    // Update button
    await expect(page.getByRole('button', { name: 'Aggiorna Informazioni' })).toBeVisible()

    // Pre-checked solo member
    await expect(page.getByRole('checkbox', { name: 'Giulia Bianchi' })).toBeChecked()

    // Pre-filled notes
    await expect(page.locator('#rsvp-notes')).toHaveValue('Vegetariana')
  })

  test('modify existing RSVP: change members, update notes, submit', async ({ page }) => {
    await mockRsvpApi(page, {
      searchResults: [FAMILY_MEMBERS[0]],
      familyMembers: FAMILY_MEMBERS,
      existingRsvp: EXISTING_CONFIRMED_RSVP,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Mario', 'Rossi')

    // Uncheck Anna, check Luca (force: true because sr-only input is overlaid by motion.div)
    await page.getByRole('checkbox', { name: 'Anna Rossi' }).uncheck({ force: true })
    await page.getByRole('checkbox', { name: 'Luca Rossi' }).check({ force: true })

    // Update notes
    await page.locator('#rsvp-notes').fill('Allergia al glutine')

    // Submit
    await page.getByRole('button', { name: 'Aggiorna Informazioni' }).click()

    await expect(page.getByText('Grazie!')).toBeVisible()
  })
})

test.describe('RSVP - Form interactions', () => {
  test('empty form does not submit', async ({ page }) => {
    await page.goto('/')
    await scrollToRsvp(page)

    // Click search with empty fields — HTML5 required should prevent submission
    await page.getByRole('button', { name: 'Cerca' }).click()

    // Form should still be visible (no navigation away)
    await expect(page.locator('#rsvp-first-name')).toBeVisible()
    await expect(page.locator('#rsvp-last-name')).toBeVisible()
  })

  test('partial form (one field empty) does not submit', async ({ page }) => {
    await page.goto('/')
    await scrollToRsvp(page)

    // Fill first name only, leave last name empty
    await page.locator('#rsvp-first-name').fill('Giulia')
    await page.getByRole('button', { name: 'Cerca' }).click()
    await expect(page.locator('#rsvp-first-name')).toBeVisible()
    await expect(page.locator('#rsvp-last-name')).toBeVisible()

    // Clear, fill last name only, leave first name empty
    await page.locator('#rsvp-first-name').fill('')
    await page.locator('#rsvp-last-name').fill('Bianchi')
    await page.getByRole('button', { name: 'Cerca' }).click()
    await expect(page.locator('#rsvp-first-name')).toBeVisible()
    await expect(page.locator('#rsvp-last-name')).toBeVisible()
  })

  test('confirm button disabled when no members selected, enabled when checked', async ({
    page,
  }) => {
    await mockRsvpApi(page, {
      searchResults: [FAMILY_MEMBERS[0]],
      familyMembers: FAMILY_MEMBERS,
      existingRsvp: null,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Mario', 'Rossi')

    // Mario is pre-checked, button enabled
    await expect(page.getByRole('button', { name: 'Conferma Presenza' })).toBeEnabled()

    // Uncheck Mario — button disabled (force: true because sr-only input is overlaid by motion.div)
    await page.getByRole('checkbox', { name: 'Mario Rossi' }).uncheck({ force: true })
    await expect(page.getByRole('button', { name: 'Conferma Presenza' })).toBeDisabled()

    // Re-check — button enabled again
    await page.getByRole('checkbox', { name: 'Anna Rossi' }).check({ force: true })
    await expect(page.getByRole('button', { name: 'Conferma Presenza' })).toBeEnabled()
  })

  test('"Cerca un altro nominativo" resets to empty search form', async ({ page }) => {
    await mockRsvpApi(page, {
      searchResults: [SOLO_MEMBER],
      familyMembers: [SOLO_MEMBER],
      existingRsvp: null,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Giulia', 'Bianchi')

    // On select step
    await expect(page.getByRole('checkbox', { name: 'Giulia Bianchi' })).toBeVisible()

    await page.getByRole('button', { name: 'Cerca un altro nominativo' }).click()

    // Back to empty search form
    await expect(page.locator('#rsvp-first-name')).toBeVisible()
    await expect(page.locator('#rsvp-first-name')).toHaveValue('')
    await expect(page.locator('#rsvp-last-name')).toHaveValue('')
  })

  test('notes textarea accepts input', async ({ page }) => {
    await mockRsvpApi(page, {
      searchResults: [SOLO_MEMBER],
      familyMembers: [SOLO_MEMBER],
      existingRsvp: null,
    })

    await page.goto('/')
    await scrollToRsvp(page)
    await fillAndSearch(page, 'Giulia', 'Bianchi')

    const notes = page.locator('#rsvp-notes')
    await notes.fill('Intolleranza al lattosio')
    await expect(notes).toHaveValue('Intolleranza al lattosio')
  })
})
