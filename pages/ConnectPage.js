const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class ConnectPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.heading = page.locator('h1, h2').filter({ hasText: /connect|collaboration/i }).first();
    this.createPostButton = page.getByRole('button', { name: /create collaboration post|new post|\+ post/i });
    this.searchBar = page.getByPlaceholder(/search collaboration|search/i);
    this.filterPills = page.locator('.btn-group button, .filter-pill, .badge');
    this.postCards = page.locator('.card, .student-post-card');

    // Create Modal Locators
    this.modal = page.locator('.modal-content, .modal-dialog').filter({ hasText: /create.*post|new collaboration/i });
    this.titleInput = page.getByPlaceholder(/need a backend|title/i).or(page.locator('input[name="title"]'));
    this.requirementSelect = page.locator('select.form-select, select[name="requirement_type"]');
    this.descriptionTextarea = page.getByPlaceholder(/describe your team|description/i).or(page.locator('textarea'));
    this.contactInput = page.getByPlaceholder(/phone:|contact/i).or(page.locator('input[name="contact_information"]'));
    this.submitPostButton = page.getByRole('button', { name: /create post|publish|submit/i });
  }

  async goto() {
    await this.page.goto(ROUTES.CONNECT);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectConnectPageVisible() {
    await expect(this.page).toHaveURL(new RegExp(`${ROUTES.CONNECT}$`));
  }

  async createCollaborationPost({ title, requirement_type, description, contact_information }) {
    await this.createPostButton.click();
    await expect(this.modal).toBeVisible();

    await this.titleInput.fill(title);
    if (requirement_type) {
      await this.requirementSelect.selectOption({ label: requirement_type });
    }
    await this.descriptionTextarea.fill(description);
    await this.contactInput.fill(contact_information);

    await this.submitPostButton.click();
    await expect(this.modal).toBeHidden({ timeout: 5000 });
  }

  async filterByRequirement(requirementType) {
    const btn = this.page.getByRole('button', { name: new RegExp(requirementType, 'i') });
    await btn.click();
  }

  async verifyPostVisible(title) {
    await expect(this.postCards.filter({ hasText: title }).first()).toBeVisible();
  }
}

module.exports = ConnectPage;
