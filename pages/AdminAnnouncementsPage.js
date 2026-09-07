const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class AdminAnnouncementsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Form Locators
    this.titleInput = page.getByPlaceholder(/title/i).or(page.locator('input[name="title"]'));
    this.descriptionTextarea = page.getByPlaceholder(/description/i).or(page.locator('textarea[name="description"]'));
    this.prioritySelect = page.locator('select[name="priority"]').or(page.locator('select.form-select').first());
    this.highlightCheckbox = page.locator('input[type="checkbox"][name="is_highlighted"], .form-check-input').first();
    this.publishButton = page.getByRole('button', { name: /publish announcement|create announcement|save/i });

    // Table Locators
    this.announcementsTable = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
  }

  async goto() {
    await this.page.goto(ROUTES.ADMIN_ANNOUNCEMENTS);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectAdminAnnouncementsPageVisible() {
    await expect(this.page).toHaveURL(new RegExp(`${ROUTES.ADMIN_ANNOUNCEMENTS}$`));
  }

  async createAnnouncement({ title, description, priority, is_highlighted }) {
    await this.titleInput.fill(title);
    await this.descriptionTextarea.fill(description);
    if (priority) await this.prioritySelect.selectOption(priority);
    if (is_highlighted && !(await this.highlightCheckbox.isChecked())) {
      await this.highlightCheckbox.check();
    }
    await this.publishButton.click();
  }

  async toggleHighlight(title) {
    const row = this.tableRows.filter({ hasText: title }).first();
    await expect(row).toBeVisible();
    const toggleBtn = row.getByRole('button', { name: /highlight|★|☆/i });
    await toggleBtn.click();
  }
}

module.exports = AdminAnnouncementsPage;
