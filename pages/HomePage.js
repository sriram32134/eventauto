const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navbar Locators
    this.brandLogo = page.locator('a.navbar-brand').first();
    this.navConnectLink = page.getByRole('link', { name: /connect/i });
    this.navAnnouncementsLink = page.getByRole('link', { name: /announcements/i });
    this.navCalendarLink = page.getByRole('link', { name: /calendar/i });
    this.navSavedLink = page.getByRole('link', { name: /saved/i });
    this.notificationBell = page.locator('button[title="Notifications"], button:has(.lucide-bell)');
    this.notificationBadge = page.locator('.badge.bg-danger, .notification-badge').first();
    this.profileDropdownButton = page.locator('nav .position-relative > button, nav .dropdown-toggle').first();
    this.logoutButton = page.getByRole('button', { name: /logout/i });
    this.myPostsLink = page.getByRole('link', { name: /my posts/i }).or(page.getByText(/my posts/i));

    // Home Body Locators
    this.welcomeHeading = page.locator('h1, h2, .welcome-banner').first();
    this.searchInput = page.getByPlaceholder(/search events|search/i);
    this.categoryPills = page.locator('.category-pill, .btn-category, .nav-pills button, .badge');
    this.eventCards = page.locator('.card, .post-card');
    this.connectBannerButton = page.getByRole('link', { name: /connect with students|go to connect/i });
  }

  async goto() {
    await this.page.goto(ROUTES.HOME);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectHomePageVisible() {
    await expect(this.page).toHaveURL(new RegExp(`${ROUTES.HOME}$`));
    await expect(this.brandLogo).toBeVisible();
  }

  async searchEvent(query) {
    await this.searchInput.fill(query);
    await this.page.waitForTimeout(400); // Debounce delay in UI is 300ms
  }

  async filterByCategory(categoryName) {
    const categoryLink = this.page.locator(`a[href*="/category/${categoryName}"]`).or(this.page.getByRole('link', { name: new RegExp(categoryName, 'i') })).first();
    await categoryLink.click();
  }

  async openPostDetails(postTitle) {
    const card = this.eventCards.filter({ hasText: postTitle }).first();
    await expect(card).toBeVisible();
    const detailsBtn = card.getByRole('link', { name: /view details|details|open/i }).or(card.getByRole('button', { name: /view details/i }));
    await detailsBtn.click();
  }

  async bookmarkPost(postTitle) {
    const card = this.eventCards.filter({ hasText: postTitle }).first();
    await expect(card).toBeVisible();
    const bookmarkBtn = card.locator('button').filter({ hasText: /save|saved|★|☆/i }).first();
    await bookmarkBtn.click();
  }

  async logout() {
    if (await this.profileDropdownButton.isVisible()) {
      await this.profileDropdownButton.click();
    }
    await this.logoutButton.click();
  }
}

module.exports = HomePage;
