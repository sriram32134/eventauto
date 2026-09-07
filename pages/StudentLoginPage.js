const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class StudentLoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Locators
    this.studentIdInput = page.getByPlaceholder(/e\.g\.\s*23A81A0001|student id/i).or(page.locator('input[type="text"]').first());
    this.passwordInput = page.locator('input[type="password"]').first();
    this.loginButton = page.getByRole('button', { name: 'Login as Student', exact: true });
    this.adminLoginTab = page.getByRole('link', { name: /admin login/i }).or(page.getByText(/admin login/i));
    this.alertMessage = page.locator('.alert-danger, .alert').first();
    
    // Mandatory Password Change Modal Locators
    this.forcePasswordModal = page.locator('.modal-content, .modal-dialog').filter({ hasText: /change.*password|temporary password/i });
    this.newPasswordInput = page.locator('input[name="newPassword"], input[placeholder*="new password"i]').first();
    this.confirmPasswordInput = page.locator('input[name="confirmPassword"], input[placeholder*="confirm password"i]').first();
    this.savePasswordButton = page.getByRole('button', { name: /update password|save password|change password/i });
  }

  async goto() {
    await this.page.goto(ROUTES.STUDENT_LOGIN);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(studentId, password) {
    if (studentId !== undefined) {
      await this.studentIdInput.fill(studentId);
    }
    if (password !== undefined) {
      await this.passwordInput.fill(password);
    }
    await this.loginButton.click();
  }

  async switchToAdminLogin() {
    await this.adminLoginTab.click();
  }

  async expectLoginError(expectedText) {
    await expect(this.alertMessage).toBeVisible();
    if (expectedText) {
      await expect(this.alertMessage).toContainText(expectedText);
    }
  }

  async handleTemporaryPasswordChange(newPassword) {
    await expect(this.forcePasswordModal).toBeVisible({ timeout: 5000 });
    await this.newPasswordInput.fill(newPassword);
    await this.confirmPasswordInput.fill(newPassword);
    await this.savePasswordButton.click();
    await expect(this.forcePasswordModal).toBeHidden({ timeout: 5000 });
  }
}

module.exports = StudentLoginPage;
