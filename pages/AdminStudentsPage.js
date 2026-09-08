const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class AdminStudentsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Header & Filter Locators
    this.addStudentButton = page.getByRole('button', { name: /add student/i });
    this.deptFilterPills = page.locator('.btn-group button, .dept-pill');
    this.yearFilterSelect = page.locator('select[name="year"]').last();
    this.searchInput = page.getByPlaceholder(/search by name or student id/i);
    this.studentTable = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');

    // Add Student Modal
    this.addStudentModal = page.locator('.modal-content').filter({
      hasText: /Add New Student/i
    });
    this.studentIdInput = this.addStudentModal.getByPlaceholder(
      /e\.g\. 23A81A0001/i
    );

    this.nameInput = this.addStudentModal.getByPlaceholder(
      /e\.g\. Rahul Sharma/i
    );

    this.emailInput = this.addStudentModal.getByPlaceholder(
      /e\.g\. rahul@college\.edu/i
    );

    this.departmentSelect = this.addStudentModal.locator('select').nth(0);

    this.yearSelect = this.addStudentModal.locator('select').nth(1);
    this.sectionInput = this.addStudentModal.locator('input').nth(3);

    this.submitStudentButton = page.getByRole('button', {
      name: /create account/i
    });

    // Temporary Credentials
    this.tempCredentialsBox = page.locator('.alert-success, .credentials-box').first();
    this.copyCredentialsButton = page.getByRole('button', {
      name: /copy credentials|copy/i
    });
    this.closeModalButton = page.getByRole('button', {
      name: /close|done/i
    });
  }

  async goto() {
    await this.page.goto(ROUTES.ADMIN_STUDENTS);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectAdminStudentsPageVisible() {
    await expect(this.page).toHaveURL(
      new RegExp(`${ROUTES.ADMIN_STUDENTS}$`)
    );
  }

  async addStudent({ student_id, name, email, department, year, section }) {
    await this.addStudentButton.click();

    await this.studentIdInput.fill(student_id);
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);

    if (department) {
      await this.departmentSelect.selectOption({ label: department });
    }

    if (year) {
      const options = await this.yearSelect.locator('option').evaluateAll(
        opts => opts.map(option => ({
          value: option.value,
          label: option.textContent.trim()
        }))
      );

      const matchingOption = options.find(option =>
        option.label.toLowerCase().includes(String(year).toLowerCase()) ||
        option.value.toLowerCase() === String(year).toLowerCase()
      );

      if (!matchingOption) {
        throw new Error(
          `Year option "${year}" not found. Available options: ${JSON.stringify(options)}`
        );
      }

      await this.yearSelect.selectOption({
        value: matchingOption.value
      });
    }

    if (section) {
      await this.sectionInput.fill(section);
    }

    await this.submitStudentButton.click();

    // Wait for the account creation response/UI update
    await this.page.waitForTimeout(1000);

    // Close the Add New Student modal if it is still open
    if (await this.addStudentModal.isVisible().catch(() => false)) {
      const closeButton = this.addStudentModal.getByRole('button', {
        name: /close|cancel|done/i
      }).last();

      if (await closeButton.isVisible().catch(() => false)) {
        await closeButton.click();
      } else {
        // Bootstrap-style modal close button
        const bootstrapClose = this.addStudentModal.locator(
          'button.btn-close, [data-bs-dismiss="modal"]'
        ).last();

        if (await bootstrapClose.isVisible().catch(() => false)) {
          await bootstrapClose.click();
        }
      }
    }

    // Make sure no modal is blocking the page
    await expect(this.page.locator('.modal.show')).toHaveCount(0, {
      timeout: 5000
    });
  }

  async deleteStudent(studentId) {
    const row = this.tableRows.filter({ hasText: studentId }).first();
    await expect(row).toBeVisible();

    const deleteBtn = row
      .getByRole('button', { name: /delete|remove/i })
      .or(row.locator('button.btn-danger'));

    await deleteBtn.click();
  }

  async verifyStudentInTable(studentId) {
    const row = this.tableRows.filter({ hasText: studentId }).first();
    await expect(row).toBeVisible({ timeout: 5000 });
  }

  async filterByDepartment(dept) {
    const btn = this.page.getByRole('button', {
      name: new RegExp(`^${dept}$`, 'i')
    });

    await btn.click();
  }
}

module.exports = AdminStudentsPage;