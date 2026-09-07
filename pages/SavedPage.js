const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class SavedPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.heading = page.locator('h1, h2').filter({ hasText: /saved|bookmarks/i }).first();
    this.savedCards = page.locator('.card, .post-card, .saved-card');
    this.emptyStateMessage = page.getByText(/no saved posts|no bookmarks/i);
  }

  async goto() {
    await this.page.goto(ROUTES.SAVED);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectSavedPageVisible() {
    await expect(this.page).toHaveURL(new RegExp(`${ROUTES.SAVED}$`));
  }

  async verifyPostIsSaved(postTitle) {
    const card = this.savedCards.filter({ hasText: postTitle }).first();
    await expect(card).toBeVisible({ timeout: 5000 });
  }

  async removeSavedPost(postTitle) {
    const card = this.savedCards.filter({ hasText: postTitle }).first();
    await expect(card).toBeVisible();
    const unsaveBtn = card.getByRole('button', { name: /saved|unsave|remove|★/i }).first();
    await unsaveBtn.click();
  }
}

module.exports = SavedPage;
