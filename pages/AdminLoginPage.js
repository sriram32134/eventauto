const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class AdminLoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.emailInput = page.getByPlaceholder(/e\.g\.\s*admin@gmail\.com|email/i).or(page.locator('input[type="email"]').first());
    this.passwordInput = page.locator('input[type="password"]').first();
    this.loginButton = page.getByRole('button', { name: 'Login as Admin', exact: true });
    this.studentLoginTab = page.getByRole('link', { name: /student login/i }).or(page.getByText(/student login/i));
    this.alertMessage = page.locator('.alert-danger, .alert').first();
  }

  async goto() {
    await this.page.goto(ROUTES.ADMIN_LOGIN);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(email, password) {
    if (email !== undefined) {
      await this.emailInput.fill(email);
    }
    if (password !== undefined) {
      await this.passwordInput.fill(password);
    }
    await this.loginButton.click();
  }

  async switchToStudentLogin() {
    await this.studentLoginTab.click();
  }

  async expectLoginError(expectedText) {
    await expect(this.alertMessage).toBeVisible();
    if (expectedText) {
      await expect(this.alertMessage).toContainText(expectedText);
    }
  }
}

module.exports = AdminLoginPage;
