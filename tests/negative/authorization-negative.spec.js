const { test, expect } = require('../../fixtures/test-fixtures');
const { ROUTES } = require('../../utils/constants');
const { DEFAULT_STUDENT } = require('../../utils/testData');

test.describe('Authorization & Route Protection Negative Tests @negative @security', () => {
  test('Unauthenticated user navigating to Home page is redirected to Student Login', async ({ page }) => {
    await page.goto(ROUTES.HOME);
    await expect(page).toHaveURL(new RegExp(ROUTES.STUDENT_LOGIN));
  });

  test('Unauthenticated user navigating to Admin Dashboard is redirected to Student Login or Admin Login', async ({ page }) => {
    await page.goto(ROUTES.ADMIN_DASHBOARD);
    await expect(page).toHaveURL(/login/i);
  });

  test('Logged-in Student navigating to Admin Dashboard is redirected or restricted', async ({
    studentLoginPage,
    homePage,
    page,
  }) => {
    await studentLoginPage.goto();
    await studentLoginPage.login(DEFAULT_STUDENT.student_id, DEFAULT_STUDENT.password);
    await homePage.expectHomePageVisible();

    // Attempt direct URL access to protected Admin route
    await page.goto(ROUTES.ADMIN_DASHBOARD);

    // Verify redirected away from Admin Dashboard back to Student home or login
    await expect(page).not.toHaveURL(new RegExp(`${ROUTES.ADMIN_DASHBOARD}$`));
  });

  test('Protected API access without Bearer token returns HTTP 401 Unauthorized', async ({ apiClient }) => {
    const res = await apiClient.getMe('');
    expect(res.status()).toBe(401);
  });

  test('Student user calling Admin API (e.g. GET /api/students) returns HTTP 403 Forbidden', async ({ apiClient }) => {
    // 1. Authenticate as Student
    const studentAuthRes = await apiClient.loginStudent(DEFAULT_STUDENT.student_id, DEFAULT_STUDENT.password);
    expect(studentAuthRes.ok()).toBeTruthy();
    const { token } = await studentAuthRes.json();

    // 2. Call Admin restricted API using Student token
    const adminApiRes = await apiClient.getStudents({}, token);
    expect(adminApiRes.status()).toBe(403);
  });
});
