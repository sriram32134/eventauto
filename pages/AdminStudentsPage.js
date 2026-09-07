const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class AdminStudentsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Header & Filter Locators
    this.addStudentButton = page.getByRole('button', { name: /add student|\+ student/i });
    this.deptFilterPills = page.locator('.btn-group button, .dept-pill');
    this.yearFilterSelect = page.locator('select.form-select, select[name="year"]');
    this.searchInput = page.getByPlaceholder(/search student|search name|search id/i);
    this.studentTable = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');

    // Add Student Form Locators
    this.addStudentForm = page.locator('form, .card, div').filter({ hasText: /add new student|create account/i }).first();
    this.studentIdInput = page.getByPlaceholder(/23A81A0001|student id/i).or(page.locator('input[name="student_id"]'));
    this.nameInput = page.getByPlaceholder(/rahul sharma|name/i).or(page.locator('input[name="name"]'));
    this.emailInput = page.getByPlaceholder(/rahul@college\.edu|email/i).or(page.locator('input[name="email"]'));
    this.departmentSelect = page.locator('select[name="department"]').or(page.locator('select').first());
    this.yearSelect = page.locator('select[name="year"]').or(page.locator('select').nth(1));
    this.sectionInput = page.locator('input[name="section"]').or(page.getByPlaceholder(/section/i));
    this.submitStudentButton = page.getByRole('button', { name: /create account|create student|add student|submit/i });

    // Temporary Credentials Box
    this.tempCredentialsBox = page.locator('.alert-success, .credentials-box').first();
    this.copyCredentialsButton = page.getByRole('button', { name: /copy credentials|copy/i });
    this.closeModalButton = page.getByRole('button', { name: /close|done/i });
  }

  async goto() {
    await this.page.goto(ROUTES.ADMIN_STUDENTS);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectAdminStudentsPageVisible() {
    await expect(this.page).toHaveURL(new RegExp(`${ROUTES.ADMIN_STUDENTS}$`));
  }

  async addStudent({ student_id, name, email, department, year, section }) {
    if (await this.addStudentButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.addStudentButton.click();
    }

    await this.studentIdInput.fill(student_id);
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    if (department) await this.departmentSelect.selectOption(department);

    await this.submitStudentButton.click();
  }

  async deleteStudent(studentId) {
    const row = this.tableRows.filter({ hasText: studentId }).first();
    await expect(row).toBeVisible();
    const deleteBtn = row.getByRole('button', { name: /delete|remove/i }).or(row.locator('button.btn-danger'));
    await deleteBtn.click();
  }

  async verifyStudentInTable(studentId) {
    const row = this.tableRows.filter({ hasText: studentId }).first();
    await expect(row).toBeVisible({ timeout: 5000 });
  }

  async filterByDepartment(dept) {
    const btn = this.page.getByRole('button', { name: new RegExp(dept, 'i') });
    await btn.click();
  }
}

module.exports = AdminStudentsPage;
