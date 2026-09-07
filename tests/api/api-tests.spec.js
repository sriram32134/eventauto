const { test, expect } = require('../../fixtures/test-fixtures');
const { DEFAULT_STUDENT, DEFAULT_ADMIN, generateCollaborationPostData } = require('../../utils/testData');

test.describe('Playwright API Testing Suite @api @smoke', () => {
  let studentToken;
  let adminToken;

  test('POST /api/auth/student/login — Successful Student Auth', async ({ apiClient }) => {
    console.log('[Diagnostic] API_BASE_URL:', process.env.API_BASE_URL);
    console.log('[Diagnostic] Final API URL for /api/auth/student/login:', `${process.env.API_BASE_URL}/api/auth/student/login`);

    const res = await apiClient.loginStudent(DEFAULT_STUDENT.student_id, DEFAULT_STUDENT.password);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('user');
    expect(body.user.role).toBe('STUDENT');
    studentToken = body.token;
  });

  test('POST /api/auth/admin/login — Successful Admin Auth', async ({ apiClient }) => {
    const res = await apiClient.loginAdmin(DEFAULT_ADMIN.email, DEFAULT_ADMIN.password);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('user');
    expect(body.user.role).toBe('ADMIN');
    adminToken = body.token;
  });

  test('GET /api/auth/me — Validate Session Token', async ({ apiClient }) => {
    const authRes = await apiClient.loginStudent(DEFAULT_STUDENT.student_id, DEFAULT_STUDENT.password);
    const { token } = await authRes.json();

    const res = await apiClient.getMe(token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    const user = body.user || body;
    expect(user.student_id ? user.student_id.toLowerCase() : user.email).toBeTruthy();
  });

  test('GET /api/posts — Public Access to Official College Activities', async ({ apiClient }) => {
    const res = await apiClient.getPosts();
    expect(res.status()).toBe(200);
    const body = await res.json();
    const postsList = Array.isArray(body) ? body : body.posts;
    expect(Array.isArray(postsList)).toBeTruthy();
  });

  test('GET /api/announcements — Public Access to College Notices', async ({ apiClient }) => {
    const res = await apiClient.getAnnouncements();
    expect(res.status()).toBe(200);
    const body = await res.json();
    const announcementsList = Array.isArray(body) ? body : body.announcements;
    expect(Array.isArray(announcementsList)).toBeTruthy();
  });

  test('POST /api/student-posts — Student Creates Collaboration Post', async ({ apiClient }) => {
    const authRes = await apiClient.loginStudent(DEFAULT_STUDENT.student_id, DEFAULT_STUDENT.password);
    const { token } = await authRes.json();

    const collabData = generateCollaborationPostData();
    const res = await apiClient.createStudentPost(collabData, token);
    expect([200, 201]).toContain(res.status());

    const body = await res.json();
    const createdPost = body.post || body;
    expect(createdPost.title).toBe(collabData.title);
    expect(createdPost.status).toBe('ACTIVE');
  });

  test('API Negative: Invalid Student Credentials returns HTTP 401', async ({ apiClient }) => {
    const res = await apiClient.loginStudent('INVALID_ID', 'wrong_pass');
    expect(res.status()).toBe(401);
  });

  test('API Negative: Unauthenticated GET /api/notifications returns HTTP 401', async ({ apiClient }) => {
    const res = await apiClient.getNotifications('');
    expect(res.status()).toBe(401);
  });

  test('API Negative: Student Token calling GET /api/students returns HTTP 403 Forbidden', async ({ apiClient }) => {
    const authRes = await apiClient.loginStudent(DEFAULT_STUDENT.student_id, DEFAULT_STUDENT.password);
    const { token } = await authRes.json();

    const res = await apiClient.getStudents({}, token);
    expect(res.status()).toBe(403);
  });
});
