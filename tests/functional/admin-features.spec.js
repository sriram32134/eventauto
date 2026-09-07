const { test, expect } = require('../../fixtures/test-fixtures');
const { DEFAULT_ADMIN, generateOfficialEventData, generateAnnouncementData, generateStudentData } = require('../../utils/testData');

test.describe('Admin Functional Features Suite @functional @admin', () => {
  test.beforeEach(async ({ adminLoginPage, adminDashboardPage }) => {
    await adminLoginPage.goto();
    await adminLoginPage.login(DEFAULT_ADMIN.email, DEFAULT_ADMIN.password);
    await adminDashboardPage.expectAdminDashboardVisible();
  });

  test('Verify Admin Dashboard layout and stat widgets', async ({ adminDashboardPage }) => {
    await expect(adminDashboardPage.statCards.first()).toBeVisible({ timeout: 5000 });
  });

  test('Admin creates official college event', async ({ adminPostsPage }) => {
    const eventData = generateOfficialEventData();
    await adminPostsPage.goto();
    await adminPostsPage.expectAdminPostsPageVisible();
    await adminPostsPage.createOfficialPost(eventData);
    await adminPostsPage.verifyPostInTable(eventData.title);
  });

  test('Admin provisions student account and filters by department', async ({ adminStudentsPage }) => {
    const studentData = generateStudentData();
    await adminStudentsPage.goto();
    await adminStudentsPage.expectAdminStudentsPageVisible();
    await adminStudentsPage.addStudent(studentData);
    await adminStudentsPage.filterByDepartment('CSE');
  });

  test('Admin creates announcement and toggles home banner highlight', async ({ adminAnnouncementsPage }) => {
    const announcementData = generateAnnouncementData();
    await adminAnnouncementsPage.goto();
    await adminAnnouncementsPage.expectAdminAnnouncementsPageVisible();
    await adminAnnouncementsPage.createAnnouncement(announcementData);
  });
});
