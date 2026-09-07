const base = require('@playwright/test');
require('dotenv').config();

const StudentLoginPage = require('../pages/StudentLoginPage');
const AdminLoginPage = require('../pages/AdminLoginPage');
const HomePage = require('../pages/HomePage');
const PostDetailPage = require('../pages/PostDetailPage');
const ConnectPage = require('../pages/ConnectPage');
const SavedPage = require('../pages/SavedPage');
const MyPostsPage = require('../pages/MyPostsPage');
const AnnouncementsPage = require('../pages/AnnouncementsPage');
const CalendarPage = require('../pages/CalendarPage');
const AdminDashboardPage = require('../pages/AdminDashboardPage');
const AdminPostsPage = require('../pages/AdminPostsPage');
const AdminStudentsPage = require('../pages/AdminStudentsPage');
const AdminStudentPostsPage = require('../pages/AdminStudentPostsPage');
const AdminAnnouncementsPage = require('../pages/AdminAnnouncementsPage');
const ApiClient = require('../utils/apiClient');

const API_BASE_URL = process.env.API_BASE_URL || 'https://eventmanage-backend-6h6p.onrender.com';

/**
 * Custom Playwright Fixtures providing Page Object Model instances & API Client
 */
exports.test = base.test.extend({
  // Page Objects
  studentLoginPage: async ({ page }, use) => {
    await use(new StudentLoginPage(page));
  },
  adminLoginPage: async ({ page }, use) => {
    await use(new AdminLoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  postDetailPage: async ({ page }, use) => {
    await use(new PostDetailPage(page));
  },
  connectPage: async ({ page }, use) => {
    await use(new ConnectPage(page));
  },
  savedPage: async ({ page }, use) => {
    await use(new SavedPage(page));
  },
  myPostsPage: async ({ page }, use) => {
    await use(new MyPostsPage(page));
  },
  announcementsPage: async ({ page }, use) => {
    await use(new AnnouncementsPage(page));
  },
  calendarPage: async ({ page }, use) => {
    await use(new CalendarPage(page));
  },
  adminDashboardPage: async ({ page }, use) => {
    await use(new AdminDashboardPage(page));
  },
  adminPostsPage: async ({ page }, use) => {
    await use(new AdminPostsPage(page));
  },
  adminStudentsPage: async ({ page }, use) => {
    await use(new AdminStudentsPage(page));
  },
  adminStudentPostsPage: async ({ page }, use) => {
    await use(new AdminStudentPostsPage(page));
  },
  adminAnnouncementsPage: async ({ page }, use) => {
    await use(new AdminAnnouncementsPage(page));
  },

  // Dedicated API Request Context Fixture targeting API_BASE_URL
  apiRequestContext: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext({
      baseURL: API_BASE_URL,
      extraHTTPHeaders: {
        'Accept': 'application/json',
      },
    });
    await use(apiContext);
    await apiContext.dispose();
  },

  // API Client Fixture backed by API_BASE_URL request context
  apiClient: async ({ apiRequestContext }, use) => {
    await use(new ApiClient(apiRequestContext, API_BASE_URL));
  },
});

exports.expect = base.expect;

