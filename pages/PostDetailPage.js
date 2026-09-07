const { expect } = require('@playwright/test');

class PostDetailPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.postTitle = page.locator('h1, .post-detail-title').first();
    this.categoryBadge = page.locator('.badge').first();
    this.eventDate = page.getByText(/event date|date:/i).or(page.locator('.event-date'));
    this.venue = page.getByText(/venue:/i).or(page.locator('.event-venue'));
    this.saveButton = page.getByRole('button', { name: /save|saved/i });
    this.shareButton = page.getByRole('button', { name: /share/i });
    this.registerButton = page.getByRole('link', { name: /register here|register/i });
    this.description = page.locator('.post-description, p').first();
  }

  async expectPostDetailVisible(expectedTitle) {
    await expect(this.postTitle).toBeVisible();
    if (expectedTitle) {
      await expect(this.postTitle).toContainText(expectedTitle);
    }
  }

  async toggleSavePost() {
    await this.saveButton.click();
  }

  async expectSavedStatus(isSaved) {
    const text = isSaved ? /saved/i : /^save$/i;
    await expect(this.saveButton).toHaveText(text);
  }
}

module.exports = PostDetailPage;
