/**
 * Constants used throughout the Playwright QA Automation Framework
 */

module.exports = {
  ROUTES: {
    STUDENT_LOGIN: '/login/student',
    ADMIN_LOGIN: '/login/admin',
    HOME: '/',
    CONNECT: '/connect',
    SAVED: '/saved',
    MY_POSTS: '/my-posts',
    ANNOUNCEMENTS: '/announcements',
    CALENDAR: '/calendar',
    ABOUT: '/about',
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_POSTS: '/admin/posts',
    ADMIN_STUDENTS: '/admin/students',
    ADMIN_STUDENT_POSTS: '/admin/student-posts',
    ADMIN_ANNOUNCEMENTS: '/admin/announcements',
    ADMIN_COLLEGE_INFO: '/admin/college-info',
  },

  API_ENDPOINTS: {
    STUDENT_LOGIN: '/api/auth/student/login',
    ADMIN_LOGIN: '/api/auth/admin/login',
    AUTH_ME: '/api/auth/me',
    CHANGE_PASSWORD: '/api/auth/change-password',
    POSTS: '/api/posts',
    STUDENT_POSTS: '/api/student-posts',
    MY_STUDENT_POSTS: '/api/student-posts/my-posts',
    ADMIN_STUDENT_POSTS: '/api/student-posts/admin-all',
    STUDENTS: '/api/students',
    ANNOUNCEMENTS: '/api/announcements',
    ADMIN_ANNOUNCEMENTS: '/api/announcements/admin-all',
    NOTIFICATIONS: '/api/notifications',
    SAVED_POSTS: '/api/saved-posts',
    CALENDAR: '/api/calendar',
    SEARCH: '/api/search',
    COLLEGE: '/api/college',
  },

  CATEGORIES: {
    EVENT: 'EVENT',
    HACKATHON: 'HACKATHON',
    SESSION: 'SESSION',
    SPORTS: 'SPORTS',
  },

  REQUIREMENT_TYPES: {
    PROJECT_TEAM: 'Project Team',
    HACKATHON: 'Hackathon',
    SPORTS: 'Sports',
    CULTURAL: 'Cultural',
    OTHER: 'Other',
  },

  ANNOUNCEMENT_PRIORITY: {
    NORMAL: 'NORMAL',
    IMPORTANT: 'IMPORTANT',
    URGENT: 'URGENT',
  },

  ROLES: {
    STUDENT: 'STUDENT',
    ADMIN: 'ADMIN',
  },

  POST_STATUS: {
    ACTIVE: 'ACTIVE',
    REMOVED: 'REMOVED',
    EXPIRED: 'EXPIRED',
  },
};
