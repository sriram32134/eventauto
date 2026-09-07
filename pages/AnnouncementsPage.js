const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class AnnouncementsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.heading = page.locator('h1, h2').filter({ hasText: /announcements|notices/i }).first();
    this.announcementCards = page.locator('.card, .announcement-card');
  }

  async goto() {
    await this.page.goto(ROUTES.ANNOUNCEMENTS);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectAnnouncementsPageVisible() {
    await expect(this.page).toHaveURL(new RegExp(`${ROUTES.ANNOUNCEMENTS}$`));
  }

  async verifyAnnouncementVisible(title) {
    const card = this.announcementCards.filter({ hasText: title }).first();
    await expect(card).toBeVisible({ timeout: 5000 });
  }
}

module.exports = AnnouncementsPage;
