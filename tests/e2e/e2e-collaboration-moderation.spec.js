const { test, expect } = require('../../fixtures/test-fixtures');
const { DEFAULT_STUDENT, DEFAULT_ADMIN, generateCollaborationPostData } = require('../../utils/testData');

test.describe('E2E Workflow 2 — Collaboration Request & Admin Moderation @e2e @student @admin', () => {
  const collabPost = generateCollaborationPostData();
  const moderationReason = 'Inappropriate contact format provided.';

  test('Student creates post, Admin moderates with reason, Student checks status', async ({
    studentLoginPage,
    homePage,
    connectPage,
    adminLoginPage,
    adminDashboardPage,
    adminStudentPostsPage,
    myPostsPage,
  }) => {
    // Step 1: Student Login & Create Collaboration Post on Connect Board
    await studentLoginPage.goto();
    await studentLoginPage.login(DEFAULT_STUDENT.student_id, DEFAULT_STUDENT.password);
    await homePage.expectHomePageVisible();

    await connectPage.goto();
    await connectPage.expectConnectPageVisible();
    await connectPage.createCollaborationPost(collabPost);
    await connectPage.verifyPostVisible(collabPost.title);

    // Step 2: Student Logout
    await homePage.logout();

    // Step 3: Admin Login & Moderate Student Post
    await adminLoginPage.goto();
    await adminLoginPage.login(DEFAULT_ADMIN.email, DEFAULT_ADMIN.password);
    await adminDashboardPage.expectAdminDashboardVisible();

    await adminStudentPostsPage.goto();
    await adminStudentPostsPage.expectAdminStudentPostsPageVisible();
    await adminStudentPostsPage.removePostWithReason(collabPost.title, moderationReason);
    await adminStudentPostsPage.verifyPostStatus(collabPost.title, 'REMOVED');

    // Step 4: Admin Logout
    await adminDashboardPage.logout();

    // Step 5: Student Signs Back In & Verifies Removal Status & Moderation Reason on My Posts
    await studentLoginPage.goto();
    await studentLoginPage.login(DEFAULT_STUDENT.student_id, DEFAULT_STUDENT.password);
    await myPostsPage.goto();
    await myPostsPage.expectMyPostsPageVisible();
    await myPostsPage.verifyPostStatus(collabPost.title, 'REMOVED');
    await myPostsPage.verifyRemovalReason(collabPost.title, moderationReason);
  });
});
