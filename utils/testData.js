/**
 * Test Data Generator and Static Fixtures
 */

function generateUniqueId(prefix = 'TEST') {
  return `${prefix}_${Date.now().toString().slice(-6)}_${Math.floor(Math.random() * 1000)}`;
}

function generateStudentData() {
  const timestamp = Date.now().toString().slice(-4);
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return {
    student_id: `24B81A${timestamp}`,
    name: `Test Student ${randomNum}`,
    email: `teststudent_${timestamp}_${randomNum}@college.edu`,
    department: 'CSE',
    year: '3',
    section: 'A',
  };
}

function generateOfficialEventData() {
  const unique = generateUniqueId('EVENT');
  return {
    title: `Automation Event ${unique}`,
    subtitle: 'Hands-on Technical Workshop',
    category: 'EVENT', // EVENT | HACKATHON | SESSION | SPORTS
    description: 'This is an automated test official college event created by Playwright QA framework.',
    event_date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], // 5 days in future
    start_time: '10:00 AM',
    end_time: '04:00 PM',
    venue: 'Auditorium Hall A',
    registration_url: 'https://example.com/register',
  };
}

function generateCollaborationPostData() {
  const unique = generateUniqueId('COLLAB');
  return {
    title: `Need Fullstack Dev ${unique}`,
    requirement_type: 'Project Team', // Project Team | Hackathon | Sports | Cultural | Other
    description: 'Looking for 2 CSE students for AI Capstone Project collaboration.',
    contact_information: 'Phone: 9876543210 / Discord: @qa_tester',
    reason: 'National Level Hackathon Prep',
  };
}

function generateAnnouncementData() {
  const unique = generateUniqueId('ANNOUNCE');
  return {
    title: `Campus Notice ${unique}`,
    description: 'Official notice regarding upcoming mid-term evaluation schedules.',
    priority: 'IMPORTANT', // NORMAL | IMPORTANT | URGENT
    is_highlighted: true,
  };
}

module.exports = {
  generateUniqueId,
  generateStudentData,
  generateOfficialEventData,
  generateCollaborationPostData,
  generateAnnouncementData,

  // Static Default Test Credentials (from .env or fallback)
  DEFAULT_STUDENT: {
    student_id: process.env.STUDENT_ID || '23A81A0001',
    password: process.env.STUDENT_PASSWORD || 'student123',
  },
  DEFAULT_ADMIN: {
    email: process.env.ADMIN_EMAIL || 'admin@gmail.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  },
};
