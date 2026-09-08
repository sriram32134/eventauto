const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class AdminAnnouncementsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Form Locators
    this.titleInput = page.getByPlaceholder(
      /e\.g\. Semester Exam Timetable Updated/i
    );

    this.descriptionTextarea = page.getByPlaceholder(
      /Full notice content/i
    );

    this.prioritySelect = page.locator('select').first();

    this.highlightCheckbox = page.getByLabel(
      /Highlight Announcement on Student Home Page Banner/i
    );

    this.publishButton = page.getByRole('button', {
      name: /publish announcement/i
    });


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
