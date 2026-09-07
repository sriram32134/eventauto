const { test, expect } = require('../../fixtures/test-fixtures');
const { DEFAULT_STUDENT } = require('../../utils/testData');

test.describe('Student Functional Features Suite @functional @student @smoke', () => {
  test.beforeEach(async ({ studentLoginPage, homePage }) => {
    await studentLoginPage.goto();
    await studentLoginPage.login(DEFAULT_STUDENT.student_id, DEFAULT_STUDENT.password);
    await homePage.expectHomePageVisible();
  });

  test('Search events on Home Page', async ({ homePage }) => {
    await homePage.searchEvent('Hackathon');
    // Verify cards update or render search results
    await expect(homePage.eventCards.first()).toBeVisible({ timeout: 5000 });
  });

  test('Filter events by Category (EVENT, HACKATHON, SESSION, SPORTS)', async ({ homePage }) => {
    await homePage.filterByCategory('HACKATHON');
    await expect(homePage.page).toHaveURL(/category|status|HACKATHON/i);
  });

  test('View Announcements Feed', async ({ announcementsPage }) => {
    await announcementsPage.goto();
    await announcementsPage.expectAnnouncementsPageVisible();
  });

  test('View Interactive Event Calendar', async ({ calendarPage }) => {
    await calendarPage.goto();
    await calendarPage.expectCalendarPageVisible();
  });

  test('Filter Connect Collaboration Board by requirement type', async ({ connectPage }) => {
    await connectPage.goto();
    await connectPage.expectConnectPageVisible();
    await connectPage.filterByRequirement('Project Team');
  });
});
