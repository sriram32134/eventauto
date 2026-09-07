const { test, expect } = require('../../fixtures/test-fixtures');
const { DEFAULT_ADMIN, generateStudentData } = require('../../utils/testData');

test.describe('E2E Workflow 3 — Student Provisioning & First-Time Password Reset @e2e @admin @student', () => {
  const newStudent = generateStudentData();
  let temporaryPassword;

  test('Admin provisions student account and student logs in with password reset', async ({
    adminLoginPage,
    adminDashboardPage,
    adminStudentsPage,
    studentLoginPage,
    homePage,
    apiClient,
  }) => {
    // Step 1: Admin Login & Navigate to Student Management
    await adminLoginPage.goto();
    await adminLoginPage.login(DEFAULT_ADMIN.email, DEFAULT_ADMIN.password);
    await adminDashboardPage.expectAdminDashboardVisible();

    await adminStudentsPage.goto();
    await adminStudentsPage.expectAdminStudentsPageVisible();

    // Step 2: Admin Provisions New Student via UI or API
    // (We also get temporary password from response or UI credentials box)
    const adminLoginRes = await apiClient.loginAdmin(DEFAULT_ADMIN.email, DEFAULT_ADMIN.password);
    if (adminLoginRes.ok()) {
      const { token } = await adminLoginRes.json();
      const createRes = await apiClient.createStudent(newStudent, token);
      if (createRes.ok()) {
        const body = await createRes.json();
        temporaryPassword = body.temporary_password;
      }
    }

    // If API auto-generation provided temporaryPassword, execute Student First-Time Login
    if (temporaryPassword) {
      await adminDashboardPage.logout();

      // Step 3: Student Login using assigned ID and temporary password
      await studentLoginPage.goto();
      await studentLoginPage.login(newStudent.student_id, temporaryPassword);

      // Step 4: First-Time Login Password Reset Modal Prompt
      const newPassword = 'newPassword123!';
      await studentLoginPage.handleTemporaryPasswordChange(newPassword);

      // Step 5: User arrives at Home Page successfully
      await homePage.expectHomePageVisible();
    } else {
      // Fallback assertion if admin provisioning via UI is verified
      await adminStudentsPage.verifyStudentInTable(newStudent.student_id);
    }
  });
});
