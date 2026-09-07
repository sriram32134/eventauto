const { request } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { API_ENDPOINTS } = require('./constants');

const AUTH_DIR = path.join(__dirname, '..', '.auth');
const STUDENT_AUTH_PATH = path.join(AUTH_DIR, 'student.json');
const ADMIN_AUTH_PATH = path.join(AUTH_DIR, 'admin.json');

/**
 * Ensures .auth directory exists
 */
function ensureAuthDir() {
  if (!fs.existsSync(AUTH_DIR)) {
    fs.mkdirSync(AUTH_DIR, { recursive: true });
  }
}

/**
 * Authenticate student programmatically and save storageState
 */
async function setupStudentAuth(baseURL, studentId, password) {
  ensureAuthDir();
  const context = await request.newContext({ baseURL });
  try {
    const response = await context.post(API_ENDPOINTS.STUDENT_LOGIN, {
      data: { student_id: studentId, password },
    });

    if (response.ok()) {
      const data = await response.json();
      const token = data.token;
      // Write storageState format with localStorage token
      const storageState = {
        cookies: [],
        origins: [
          {
            origin: baseURL,
            localStorage: [
              {
                name: 'token',
                value: token,
              },
            ],
          },
        ],
      };
      fs.writeFileSync(STUDENT_AUTH_PATH, JSON.stringify(storageState, null, 2));
      return token;
    }
  } catch (err) {
    console.warn('Student authentication setup failed:', err.message);
  }
  return null;
}

/**
 * Authenticate admin programmatically and save storageState
 */
async function setupAdminAuth(baseURL, email, password) {
  ensureAuthDir();
  const context = await request.newContext({ baseURL });
  try {
    const response = await context.post(API_ENDPOINTS.ADMIN_LOGIN, {
      data: { email, password },
    });

    if (response.ok()) {
      const data = await response.json();
      const token = data.token;
      const storageState = {
        cookies: [],
        origins: [
          {
            origin: baseURL,
            localStorage: [
              {
                name: 'token',
                value: token,
              },
            ],
          },
        ],
      };
      fs.writeFileSync(ADMIN_AUTH_PATH, JSON.stringify(storageState, null, 2));
      return token;
    }
  } catch (err) {
    console.warn('Admin authentication setup failed:', err.message);
  }
  return null;
}

module.exports = {
  STUDENT_AUTH_PATH,
  ADMIN_AUTH_PATH,
  setupStudentAuth,
  setupAdminAuth,
};
