const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class AdminDashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Admin Navbar / Header Locators
    this.brandLogo = page.locator('a.navbar-brand').first();
    this.navDashboardLink = page.getByRole('link', { name: /dashboard/i });
    this.navManagePostsLink = page.getByRole('link', { name: /manage posts|posts/i });
    this.navManageStudentsLink = page.getByRole('link', { name: /manage students|students/i });
    this.navStudentPostsLink = page.getByRole('link', { name: /student posts/i });
    this.navAnnouncementsLink = page.getByRole('link', { name: /announcements/i });

    // Dashboard Cards & Widgets
    this.statCards = page.locator('.stat-card, .card, .dashboard-card');
    this.recentActivitiesTable = page.locator('table').first();
    this.logoutButton = page.getByRole('button', { name: /logout/i });
  }

  async goto() {
    await this.page.goto(ROUTES.ADMIN_DASHBOARD);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectAdminDashboardVisible() {
    await expect(this.page).toHaveURL(new RegExp(`${ROUTES.ADMIN_DASHBOARD}$`));
  }

  async navigateToSection(sectionName) {
    const link = this.page.getByRole('link', { name: new RegExp(sectionName, 'i') });
    await link.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = AdminDashboardPage;
