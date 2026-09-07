const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class MyPostsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.heading = page.locator('h1, h2').filter({ hasText: /my posts/i }).first();
    this.myPostCards = page.locator('.card, .student-post-card, .my-post-card');
    this.newPostButton = page.getByRole('button', { name: /new post|create/i });
  }

  async goto() {
    await this.page.goto(ROUTES.MY_POSTS);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectMyPostsPageVisible() {
    await expect(this.page).toHaveURL(new RegExp(`${ROUTES.MY_POSTS}$`));
  }

  async verifyPostStatus(postTitle, expectedStatus) {
    const card = this.myPostCards.filter({ hasText: postTitle }).first();
    await expect(card).toBeVisible({ timeout: 5000 });
    const badge = card.locator('.badge, .status-badge').filter({ hasText: new RegExp(expectedStatus, 'i') });
    await expect(badge).toBeVisible();
  }

  async verifyRemovalReason(postTitle, expectedReason) {
    const card = this.myPostCards.filter({ hasText: postTitle }).first();
    await expect(card).toBeVisible();
    const alertBox = card.locator('.alert, .alert-danger, .removal-reason').first();
    await expect(alertBox).toBeVisible();
    if (expectedReason) {
      await expect(alertBox).toContainText(expectedReason);
    }
  }
}

module.exports = MyPostsPage;
