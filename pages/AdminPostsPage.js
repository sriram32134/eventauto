const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class AdminPostsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Create / Edit Form Locators
    this.titleInput = page.getByPlaceholder(/ai & machine learning|title/i).or(page.locator('input[name="title"]'));
    this.subtitleInput = page.getByPlaceholder(/learn fundamentals|hands-on|subtitle/i).or(page.locator('input[name="subtitle"]'));
    this.categorySelect = page.locator('select[name="category"]').or(page.locator('select').first());
    this.descriptionTextarea = page.getByPlaceholder(/detailed event|description/i).or(page.locator('textarea[name="description"]'));
    this.eventDateInput = page.locator('input[type="date"], input[name="event_date"]').first();
    this.startTimeInput = page.locator('input[name="start_time"]').or(page.getByPlaceholder(/10:00 AM/i));
    this.endTimeInput = page.locator('input[name="end_time"]').or(page.getByPlaceholder(/04:00 PM/i));
    this.venueInput = page.getByPlaceholder(/seminar hall|auditorium|venue/i).or(page.locator('input[name="venue"]'));
    this.registrationUrlInput = page.getByPlaceholder(/http|registration/i).or(page.locator('input[name="registration_url"]'));
    this.publishButton = page.getByRole('button', { name: /publish post|create post|save/i });

    // Activities Table Locators
    this.postsTable = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
  }

  async goto() {
    await this.page.goto(ROUTES.ADMIN_POSTS);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectAdminPostsPageVisible() {
    await expect(this.page).toHaveURL(new RegExp(`${ROUTES.ADMIN_POSTS}$`));
  }

  async createOfficialPost({ title, subtitle, category, description, event_date, venue }) {
    await this.titleInput.fill(title);
    if (subtitle) {
      if (await this.subtitleInput.isVisible({ timeout: 2000 }).catch(() => false)) {
        await this.subtitleInput.fill(subtitle);
      }
    }
    if (category) await this.categorySelect.selectOption(category);
    await this.descriptionTextarea.fill(description);
    if (event_date) await this.eventDateInput.fill(event_date);
    if (venue) await this.venueInput.fill(venue);

    await this.publishButton.click();
    await this.page.waitForTimeout(500);
  }

  async deletePost(postTitle) {
    const row = this.tableRows.filter({ hasText: postTitle }).first();
    await expect(row).toBeVisible();
    const deleteBtn = row.getByRole('button', { name: /delete|remove/i }).or(row.locator('button.btn-danger'));
    await deleteBtn.click();
  }

  async verifyPostInTable(postTitle) {
    const row = this.tableRows.filter({ hasText: postTitle }).first();
    await expect(row).toBeVisible({ timeout: 5000 });
  }
}

module.exports = AdminPostsPage;
