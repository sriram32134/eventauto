const { test, expect } = require('../../fixtures/test-fixtures');
const { DEFAULT_STUDENT, generateOfficialEventData } = require('../../utils/testData');

test.describe('E2E Workflow 1 — Event Discovery & Bookmarking @e2e @student @smoke', () => {
  let createdEvent;

  test.beforeAll(async ({ apiClient }) => {
    // Optionally log in admin via API and create a test event to ensure discovery target exists
    const adminLoginRes = await apiClient.loginAdmin('admin@gmail.com', 'admin123');
    if (adminLoginRes.ok()) {
      const { token } = await adminLoginRes.json();
      createdEvent = generateOfficialEventData();
      await apiClient.createPost(createdEvent, token);
    }
  });

  test('Student performs complete event discovery journey', async ({
    studentLoginPage,
    homePage,
    postDetailPage,
    savedPage,
  }) => {
    // 1. Student Login
    await studentLoginPage.goto();
    await studentLoginPage.login(DEFAULT_STUDENT.student_id, DEFAULT_STUDENT.password);
    await homePage.expectHomePageVisible();

    // 2. Search / Filter Event on Home Page
    const searchTerm = createdEvent ? createdEvent.title : 'Workshop';
    await homePage.searchEvent(searchTerm);

    // 3. Open Event Details
    await homePage.openPostDetails(searchTerm);
    await postDetailPage.expectPostDetailVisible(searchTerm);

    // 4. Save / Bookmark Event
    await postDetailPage.toggleSavePost();
    await postDetailPage.expectSavedStatus(true);

    // 5. Navigate to Saved Page & Verify Event
    await savedPage.goto();
    await savedPage.expectSavedPageVisible();
    await savedPage.verifyPostIsSaved(searchTerm);
  });
});
