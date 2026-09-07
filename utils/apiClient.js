const { API_ENDPOINTS } = require('./constants');

class ApiClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} requestContext
   * @param {string} baseURL
   */
  constructor(requestContext, baseURL = '') {
    this.request = requestContext;
    this.baseURL = baseURL;
  }

  /**
   * Student Login API
   */
  async loginStudent(studentId, password) {
    return await this.request.post(API_ENDPOINTS.STUDENT_LOGIN, {
      data: { student_id: studentId, password },
    });
  }

  /**
   * Admin Login API
   */
  async loginAdmin(email, password) {
    return await this.request.post(API_ENDPOINTS.ADMIN_LOGIN, {
      data: { email, password },
    });
  }

  /**
   * Get Current User Details API
   */
  async getMe(token) {
    return await this.request.get(API_ENDPOINTS.AUTH_ME, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  /**
   * Get Official Posts API
   */
  async getPosts(params = {}) {
    const searchParams = new URLSearchParams(params).toString();
    const url = searchParams ? `${API_ENDPOINTS.POSTS}?${searchParams}` : API_ENDPOINTS.POSTS;
    return await this.request.get(url);
  }

  /**
   * Create Official Event (Admin API)
   */
  async createPost(postData, token) {
    return await this.request.post(API_ENDPOINTS.POSTS, {
      data: postData,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  /**
   * Delete Official Event (Admin API)
   */
  async deletePost(id, token) {
    return await this.request.delete(`${API_ENDPOINTS.POSTS}/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  /**
   * Get Student Collaboration Posts API
   */
  async getStudentPosts(params = {}) {
    const searchParams = new URLSearchParams(params).toString();
    const url = searchParams ? `${API_ENDPOINTS.STUDENT_POSTS}?${searchParams}` : API_ENDPOINTS.STUDENT_POSTS;
    return await this.request.get(url);
  }

  /**
   * Create Student Collaboration Post API
   */
  async createStudentPost(postData, token) {
    return await this.request.post(API_ENDPOINTS.STUDENT_POSTS, {
      data: postData,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  /**
   * Moderate/Remove Student Collaboration Post (Admin API)
   */
  async removeStudentPost(id, reason, token) {
    return await this.request.delete(`${API_ENDPOINTS.STUDENT_POSTS}/${id}`, {
      data: { reason },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  /**
   * Get Students List (Admin API)
   */
  async getStudents(params = {}, token) {
    const searchParams = new URLSearchParams(params).toString();
    const url = searchParams ? `${API_ENDPOINTS.STUDENTS}?${searchParams}` : API_ENDPOINTS.STUDENTS;
    return await this.request.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  /**
   * Create Student Account (Admin API)
   */
  async createStudent(studentData, token) {
    return await this.request.post(API_ENDPOINTS.STUDENTS, {
      data: studentData,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  /**
   * Delete Student Account (Admin API)
   */
  async deleteStudent(id, token) {
    return await this.request.delete(`${API_ENDPOINTS.STUDENTS}/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  /**
   * Get Announcements API
   */
  async getAnnouncements(params = {}) {
    const searchParams = new URLSearchParams(params).toString();
    const url = searchParams ? `${API_ENDPOINTS.ANNOUNCEMENTS}?${searchParams}` : API_ENDPOINTS.ANNOUNCEMENTS;
    return await this.request.get(url);
  }

  /**
   * Get Student Notifications API
   */
  async getNotifications(token) {
    return await this.request.get(API_ENDPOINTS.NOTIFICATIONS, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }
}

module.exports = ApiClient;
