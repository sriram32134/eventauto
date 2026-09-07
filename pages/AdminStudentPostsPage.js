const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class AdminStudentPostsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Table Locators
    this.postsTable = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');

    // Moderation Reason Modal Locators
    this.modal = page.locator('.modal-content, .modal-dialog').filter({ hasText: /reason|remove post|delete/i });
    this.reasonTextarea = page.getByPlaceholder(/incomplete contact|reason/i).or(page.locator('textarea'));
    this.confirmRemovalButton = page.getByRole('button', { name: /confirm removal|remove|delete/i });
  }

  async goto() {
    await this.page.goto(ROUTES.ADMIN_STUDENT_POSTS);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectAdminStudentPostsPageVisible() {
    await expect(this.page).toHaveURL(new RegExp(`${ROUTES.ADMIN_STUDENT_POSTS}$`));
  }

  async removePostWithReason(postTitle, reason) {
    const row = this.tableRows.filter({ hasText: postTitle }).first();
    await expect(row).toBeVisible({ timeout: 5000 });

    const removeBtn = row.getByRole('button', { name: /remove|delete/i }).or(row.locator('button.btn-danger'));
    await removeBtn.click();

    await expect(this.modal).toBeVisible();
    if (reason) {
      await this.reasonTextarea.fill(reason);
    }
    await this.confirmRemovalButton.click();
    await expect(this.modal).toBeHidden({ timeout: 5000 });
  }

  async verifyPostStatus(postTitle, expectedStatus) {
    const row = this.tableRows.filter({ hasText: postTitle }).first();
    await expect(row).toBeVisible({ timeout: 5000 });
    const badge = row.locator('.badge').filter({ hasText: new RegExp(expectedStatus, 'i') });
    await expect(badge).toBeVisible();
  }
}

module.exports = AdminStudentPostsPage;
