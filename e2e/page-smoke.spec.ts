import { expect, test } from '@playwright/test'

test.describe('Page smoke tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Hero shows names and date', async ({ page }) => {
    const hero = page.locator('section').first()
    await expect(hero.getByRole('heading', { name: 'Martina' })).toBeVisible()
    await expect(hero.getByText('18 Settembre 2026')).toBeVisible()
  })

  test('Our Story section renders', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'La nostra storia' })
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toBeVisible()
  })

  test('Location section renders', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Location' })
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Villa Castelbarco Pindemonte Rezzonico' })
    ).toBeVisible()
  })

  test('Program section renders', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Il programma' }).first()
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toBeVisible()
    // Desktop/mobile layouts duplicate content — check at least one is visible
    await expect(page.getByText('16:00').last()).toBeVisible()
    await expect(page.getByText('22:00').last()).toBeVisible()
  })

  test('RSVP search form renders', async ({ page }) => {
    const heading = page.getByText('RSVP', { exact: true })
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toBeVisible()
    await expect(page.locator('#rsvp-first-name')).toBeVisible()
    await expect(page.locator('#rsvp-last-name')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cerca' })).toBeVisible()
  })

  test('Lista Nozze section renders', async ({ page }) => {
    const heading = page.getByText('Lista nozze')
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toBeVisible()
  })

  test('Footer renders', async ({ page }) => {
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer.getByText('Martina & Alessandro')).toBeVisible()
    await expect(footer.getByText('18 Settembre 2026')).toBeVisible()
  })
})
