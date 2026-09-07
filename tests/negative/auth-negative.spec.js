const { test, expect } = require('../../fixtures/test-fixtures');

test.describe('Authentication Negative Scenarios @negative @smoke', () => {
  test('Student login with wrong password displays error alert', async ({ studentLoginPage }) => {
    await studentLoginPage.goto();
    await studentLoginPage.login('23A81A0001', 'wrong_password_999');
    await studentLoginPage.expectLoginError('Invalid Student ID or Password');
  });

  test('Student login with non-existent Student ID displays error alert', async ({ studentLoginPage }) => {
    await studentLoginPage.goto();
    await studentLoginPage.login('INVALID_STUDENT_999', 'student123');
    await studentLoginPage.expectLoginError();
  });

  test('Admin login with invalid email displays error alert', async ({ adminLoginPage }) => {
    await adminLoginPage.goto();
    await adminLoginPage.login('nonexistent_admin@gmail.com', 'admin123');
    await adminLoginPage.expectLoginError('Invalid Admin Credentials');
  });

  test('Admin login with wrong password displays error alert', async ({ adminLoginPage }) => {
    await adminLoginPage.goto();
    await adminLoginPage.login('admin@gmail.com', 'wrong_admin_password');
    await adminLoginPage.expectLoginError('Invalid Admin Credentials');
  });
});
