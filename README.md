# Event Manager — Playwright QA Automation Framework

An interview-ready, production-grade Playwright Test Automation framework built for the **College Events & Student Connect Platform / Event Manager**.

[![Playwright Tests](https://github.com/actions/workflows/playwright.yml/badge.svg)](https://github.com/actions/workflows/playwright.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Playwright Version](https://img.shields.io/badge/playwright-%5E1.50.0-blue.svg)](https://playwright.dev/)

---

## 📌 Project Overview

The **Event Manager Application** is a full-stack educational web application facilitating official college activity publishing (events, hackathons, technical workshops, sports tournaments) and peer-to-peer student collaboration.

This QA Automation Framework provides end-to-end (E2E), functional, authorization, negative, and API test suites designed with standard QA practices including:
- **Page Object Model (POM)** pattern.
- **Storage State Session Reuse** (bypassing repetitive UI sign-ins).
- **Playwright APIRequestContext** testing for REST backend endpoints.
- **Custom Fixtures** injecting page objects and API clients into test suites cleanly.
- **Environment-based credential management** (`.env`).
- **Tag-based test suite execution** (`@smoke`, `@functional`, `@negative`, `@api`, `@e2e`, `@student`, `@admin`).
- **CI/CD Integration** via GitHub Actions workflow with HTML artifact publishing.

---

## 🌐 Application Under Test

- **Live Application URL**: [https://eventmanage-wheat.vercel.app/login/student](https://eventmanage-wheat.vercel.app/login/student)
- **Roles & Portals**:
  - **Student Role**: Event discovery, category filtering, saving/bookmarking events, collaboration request creation, notification drawer, my posts moderation status.
  - **Admin Role**: Metrics dashboard, official post publishing/editing/deletion, student account provisioning with temporary password generation, announcement broadcasting & home banner highlighting, student post moderation with mandatory removal reasons.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js (v18+)** | Runtime environment |
| **JavaScript (ES6+)** | Language |
| **Playwright Test (^1.50)** | E2E & Component testing runner |
| **Playwright APIRequestContext** | REST API testing framework |
| **dotenv** | Environment configuration management |
| **GitHub Actions** | Continuous Integration (CI) pipeline |

---

## 📁 Project Structure

```
event-manager-playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml            # CI GitHub Actions pipeline
├── .auth/                            # StorageState auth states (ignored in git)
├── fixtures/
│   └── test-fixtures.js              # Custom Playwright test fixtures
├── pages/                            # Page Object Model (POM) classes
│   ├── StudentLoginPage.js           # Student sign-in & temp password reset modal
│   ├── AdminLoginPage.js             # Admin sign-in screen
│   ├── HomePage.js                   # Navbar, search, category pills & event cards
│   ├── PostDetailPage.js             # Detailed activity view, save & register links
│   ├── ConnectPage.js                # Collaboration board & request creation modal
│   ├── SavedPage.js                  # Saved bookmarks view
│   ├── MyPostsPage.js                # Logged student posts & moderation alerts
│   ├── AnnouncementsPage.js          # Campus notices feed
│   ├── CalendarPage.js               # Interactive month event calendar
│   ├── AdminDashboardPage.js         # High-level metrics & quick navigation
│   ├── AdminPostsPage.js             # Official post CRUD management
│   ├── AdminStudentsPage.js          # Student account provisioning & filtering
│   ├── AdminStudentPostsPage.js      # Student post moderation & removal modal
│   └── AdminAnnouncementsPage.js     # Notice broadcasting & highlight toggle
├── tests/
│   ├── e2e/
│   │   ├── e2e-discovery.spec.js     # E2E 1: Event Discovery & Bookmarking
│   │   ├── e2e-collaboration-moderation.spec.js # E2E 2: Collab Post & Admin Moderation
│   │   └── e2e-student-provisioning.spec.js     # E2E 3: Admin Provisioning & Temp Pass
│   ├── functional/
│   │   ├── student-features.spec.js  # Student feature specs (search, category, calendar)
│   │   └── admin-features.spec.js    # Admin feature specs (CRUD, student creation)
│   ├── negative/
│   │   ├── auth-negative.spec.js     # Login failure scenarios
│   │   └── authorization-negative.spec.js # Protected route & API permission specs
│   └── api/
│       └── api-tests.spec.js         # Playwright REST API test suite
├── utils/
│   ├── apiClient.js                  # API client helper class
│   ├── authHelper.js                 # Session storageState generator
│   ├── constants.js                  # Routes, endpoints & enum definitions
│   └── testData.js                   # Dynamic unique data generators
├── .env.example                      # Sample environment variables configuration
├── .gitignore                        # Git exclusion rules
├── package.json                      # Node project dependencies & scripts
├── playwright.config.js              # Playwright global runner config
└── README.md                         # Framework documentation
```

---

## 🎯 Test Coverage Matrix

### 1. Major E2E User Journeys
- **E2E 1 — Event Discovery**: Student Login ➔ Search/Filter Event ➔ Open Event Details ➔ Save Event ➔ Navigate Saved Page ➔ Verify Bookmarked Event (`@e2e @student @smoke`).
- **E2E 2 — Collaboration & Moderation**: Student creates collaboration post ➔ Admin opens student posts table ➔ Admin removes post with mandatory removal reason ➔ Student checks My Posts tab to verify status (`REMOVED`) and removal reason alert (`@e2e @student @admin`).
- **E2E 3 — Student Provisioning**: Admin provisions student account ➔ Retrieves assigned Student ID & temporary password ➔ Student signs in with temporary password ➔ Completes mandatory password change modal ➔ Navigates to Home (`@e2e @admin @student`).

### 2. Functional Suites
- **Student Features**: Search input debouncing, category pills filtering (`EVENT`, `HACKATHON`, `SESSION`, `SPORTS`), announcements feed, interactive calendar navigation, connect board requirement filtering (`@functional @student`).
- **Admin Features**: Dashboard stat metrics, official event publishing, student department/year filtering, notice broadcasting & top home banner highlight toggle (`@functional @admin`).

### 3. Negative & Authorization Suites
- Invalid student credentials / non-existent student ID alert (`@negative @smoke`).
- Invalid admin email / password alert (`@negative`).
- Unauthenticated user route redirect verification (navigating to `/` or `/admin/dashboard` redirects to `/login/student`).
- Protected API without Bearer token verification (`HTTP 401 Unauthorized`).
- Student user calling Admin restricted API endpoints (`HTTP 403 Forbidden`).

### 4. API Testing Suite
- `POST /api/auth/student/login` — 200 OK + JWT payload validation.
- `POST /api/auth/admin/login` — 200 OK + JWT payload validation.
- `GET /api/auth/me` — Bearer token session validation.
- `GET /api/posts` & `GET /api/announcements` — Public endpoints array response.
- `POST /api/student-posts` — Student collaboration request creation via API.
- `401 / 403 Negative API Assertions`.

---

## 🔑 Authentication Strategy

To prevent redundant UI login steps across hundreds of tests, the framework provides:
- **`utils/authHelper.js`**: Programmatically fetches JSON Web Tokens (JWT) for Student and Admin roles via API and constructs Playwright `storageState` JSON files in `.auth/student.json` and `.auth/admin.json`.
- **Custom Fixtures**: Automatically inject authenticated browser contexts or POM instances into individual spec files.

---

## ⚙️ Setup & Prerequisites

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Install Playwright Browsers
```bash
npx playwright install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env` and fill in credentials if required:
```bash
cp .env.example .env
```
Default configuration (`.env`):
```env
BASE_URL=https://eventmanage-wheat.vercel.app
STUDENT_ID=23A81A0001
STUDENT_PASSWORD=student123
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
API_BASE_URL=https://eventmanage-wheat.vercel.app
```

---

## 🚀 Execution & Useful Commands

| Action | Command |
| :--- | :--- |
| **Run All Tests (Headless)** | `npm test` or `npx playwright test` |
| **Run Tests in Headed Mode** | `npm run test:headed` or `npx playwright test --headed` |
| **Run Tests in Playwright UI Mode** | `npm run test:ui` or `npx playwright test --ui` |
| **Debug Mode** | `npx playwright test --debug` |
| **Run Smoke Test Suite** | `npm run test:smoke` or `npx playwright test --grep @smoke` |
| **Run API Test Suite** | `npm run test:api` or `npx playwright test --grep @api` |
| **Run E2E Workflows** | `npm run test:e2e` or `npx playwright test --grep @e2e` |
| **Run Student Tests Only** | `npm run test:student` or `npx playwright test --grep @student` |
| **Run Admin Tests Only** | `npm run test:admin` or `npx playwright test --grep @admin` |
| **Run Negative Tests Only** | `npm run test:negative` or `npx playwright test --grep @negative` |
| **View HTML Test Report** | `npm run report` or `npx playwright show-report` |

---

## 🔄 CI/CD Integration (GitHub Actions)

The framework includes a ready-to-use GitHub Actions workflow (`.github/workflows/playwright.yml`).
- Automatically triggers on `push` or `pull_request` to `main` / `master`.
- Installs Node.js, dependencies, and Playwright browsers (`npx playwright install --with-deps`).
- Executes test suite headlessly.
- Uploads `playwright-report` as a downloadable GitHub artifact upon job completion.

---

## 📝 QA Interview Walkthrough Highlights

When discussing this project in a QA Automation interview:
1. **Architecture**: Explain why POM was implemented alongside custom Playwright fixtures to decouple page locators from test logic.
2. **Session Security & StorageState**: Highlight how JWT tokens are injected directly into `localStorage` to avoid brittle, slow UI login loops.
3. **API & UI Layer Hybrid Testing**: Detail how data setup/teardown is handled fast via `APIRequestContext` before validating user experience on the UI.
4. **Locators**: Emphasize strict usage of user-facing locators (`getByRole`, `getByPlaceholder`, `getByText`, `getByLabel`) over brittle CSS/XPath selectors.
