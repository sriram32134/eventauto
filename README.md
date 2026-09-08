# Event Manager – QA Automation Framework

A professional QA automation framework developed for the **Event Manager** web application using **Playwright and JavaScript**. The project focuses on validating application functionality through UI automation, API testing, negative testing, and end-to-end workflows using a maintainable Page Object Model architecture.

---

## Project Overview

Event Manager is a role-based college event management platform designed to help students and administrators manage college events, announcements, student accounts, and collaboration activities.

This project automates important application workflows from a QA perspective and demonstrates practical software testing concepts including functional testing, API testing, negative testing, authentication validation, role-based testing, and end-to-end workflow automation.

### Application

**Frontend:**  
https://eventmanage-wheat.vercel.app/login/student

**Backend:**  
https://eventmanage-backend-6h6p.onrender.com

**GitHub Repository:**  
https://github.com/sriram32134/eventauto

---

## Objectives

The primary objectives of this QA automation project are:

- Automate critical Event Manager application workflows.
- Validate student and administrator functionality.
- Verify backend REST APIs.
- Cover positive and negative scenarios.
- Validate role-based access and authentication.
- Implement reusable Page Object Model classes.
- Create reusable Playwright fixtures.
- Generate dynamic and unique test data.
- Maintain clear separation between test logic and page implementation.
- Build a scalable automation framework suitable for regression testing.
- Demonstrate practical QA automation engineering practices.

---

# Application Features Covered

The automation framework covers major Event Manager functionality including:

### Student Features

- Student authentication
- Student dashboard
- Event discovery
- Event details
- Collaboration posts
- User interactions
- Protected student workflows

### Administrator Features

- Administrator authentication
- Admin dashboard
- Dashboard statistics
- Official college event management
- Student account provisioning
- Department filtering
- Announcement management
- Announcement banner highlighting
- Administrative workflows

### Collaboration Features

- Creating collaboration posts
- Collaboration requirements
- Post details
- Moderation-related workflows
- User interaction workflows

---

# Technology Stack

| Technology | Purpose |
|---|---|
| Playwright | UI, API and E2E automation |
| JavaScript | Automation scripting |
| Node.js | Runtime environment |
| React | Frontend application |
| Vite | Frontend build tooling |
| Express.js | Backend API |
| MongoDB | Database |
| JWT | Authentication and authorization |
| Axios | HTTP/API communication |
| Git | Version control |
| GitHub | Source code repository |

---

# Automation Framework

The project follows the **Page Object Model (POM)** architecture using Playwright.

The framework separates:

- Test scenarios
- Page locators
- Page actions
- Test data
- Application routes
- Authentication setup
- Reusable fixtures

This approach improves readability, maintainability, reusability, and scalability.

---

# Complete Project Structure

```text
eventqa/
│
├── fixtures/
│   └── test-fixtures.js
│
├── pages/
│   ├── AdminAnnouncementsPage.js
│   ├── AdminDashboardPage.js
│   ├── AdminLoginPage.js
│   ├── AdminPostsPage.js
│   ├── AdminStudentsPage.js
│   ├── ConnectPage.js
│   ├── DiscoveryPage.js
│   ├── LoginPage.js
│   ├── PostDetailPage.js
│   └── ...
│
├── tests/
│   │
│   ├── api/
│   │   ├── admin-auth.spec.js
│   │   ├── student-auth.spec.js
│   │   └── ...
│   │
│   ├── functional/
│   │   └── admin-features.spec.js
│   │
│   ├── negative/
│   │   ├── authentication-negative.spec.js
│   │   ├── api-negative.spec.js
│   │   └── ...
│   │
│   └── e2e/
│       ├── e2e-collaboration-moderation.spec.js
│       ├── e2e-discovery.spec.js
│       └── e2e-student-provisioning.spec.js
│
├── utils/
│   ├── constants.js
│   └── testData.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md



Directory Responsibilities
fixtures/

Contains reusable Playwright fixtures used across multiple test suites.

test-fixtures.js

Provides reusable Page Object instances and common test setup so individual test files do not need to repeatedly initialize the same objects.

pages/

Contains Page Object Model classes.

Each Page Object represents a specific application page or workflow and contains:

Locators
Page actions
Navigation methods
Reusable validations
User interaction methods
Important Page Objects

AdminLoginPage.js

Administrator login
Authentication interactions

AdminDashboardPage.js

Admin dashboard
Dashboard validation
Administrative navigation

AdminAnnouncementsPage.js

Announcement creation
Priority selection
Banner highlighting

AdminPostsPage.js

Official event/post creation
Post validation

AdminStudentsPage.js

Student account creation
Student information handling
Department filtering
Student management

ConnectPage.js

Collaboration post creation
Collaboration form interactions

DiscoveryPage.js

Event/post discovery
Search and navigation workflows

PostDetailPage.js

Post/event detail validation
Detail-page interactions

LoginPage.js

Student authentication
Login workflow
tests/

Contains all automated test specifications grouped by testing type.

tests/api/

Contains backend API automation.

API tests validate backend functionality independently from the browser UI.

API coverage includes:
Authentication endpoints
Student-related endpoints
Administrator endpoints
Protected resources
Event/post operations
Announcement operations
Request validation
Authentication and authorization behavior
API response validation
tests/functional/

Contains feature-level UI tests.

Functional coverage includes:
Admin dashboard
Dashboard statistics
Official event creation
Student account provisioning
Department filtering
Announcement creation
Announcement banner highlighting
Administrative workflows
Form interactions
Role-based functionality
tests/negative/

Contains negative test scenarios designed to verify application behavior when invalid or unexpected inputs are provided.

Negative coverage includes:
Invalid credentials
Missing required fields
Invalid input values
Unauthorized requests
Authentication failures
Invalid API requests
Validation handling
Protected resource access
tests/e2e/

Contains complete end-to-end user workflows.

E2E workflows include:
Collaboration & Moderation

Validates collaboration post creation and related moderation workflow interactions.

Discovery

Validates event/post discovery and navigation through the application.

Student Provisioning

Validates the administrator workflow for creating and managing student accounts.

utils/

Contains reusable framework utilities.

constants.js

Centralizes application-level constants such as:

Application routes
URLs
Shared configuration values

Centralizing routes prevents duplicated hard-coded URLs throughout the test suite.


Authentication Strategy

Event Manager uses role-based authentication.

The framework supports:

Student Role

Used for:

Student login
Event discovery
Student workflows
Protected student functionality
Administrator Role

Used for:

Admin login
Event management
Student account management
Announcement management
Administrative dashboard workflows

Authentication is handled through reusable Page Objects and Playwright fixtures.

Test Data Strategy

The framework uses dynamically generated data wherever appropriate.

Examples include:

Unique student IDs
Unique email addresses
Event titles
Announcement titles
Student information
Collaboration post information

Dynamic data generation helps reduce test-data conflicts and supports repeatable automation.

Locator Strategy

The automation framework uses reliable Playwright locator strategies such as:

getByRole()
getByLabel()
getByPlaceholder()
CSS locators
Scoped locators
Filtered locators

Locators are maintained inside Page Object classes rather than directly inside test specifications.

This keeps test cases readable and makes UI changes easier to maintain.

Test Architecture

The overall automation architecture can be represented as:

                    Event Manager
                         │
                         ▼
                Playwright Framework
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
      API Tests     UI Functional    E2E Tests
          │              │              │
          └──────────────┼──────────────┘
                         │
                         ▼
                  Negative Testing
                         │
                         ▼
                    QA Validation
QA Testing Approach

The project follows a layered automation strategy.

API Layer

Validates backend services and API behavior independently of the UI.

Functional Layer

Validates individual application features and administrator workflows through the browser.

Negative Layer

Validates how the application handles invalid inputs, authentication failures, validation errors, and unauthorized actions.

End-to-End Layer

Validates complete user journeys across multiple application features.

This layered approach helps provide broader coverage while keeping individual tests focused.


Page Object Model

The framework follows the Page Object Model pattern.

Instead of writing locators and application interactions directly inside test cases, they are encapsulated inside dedicated Page Object classes.

For example:

Test Specification
       │
       ▼
Page Object
       │
       ├── Locators
       ├── Actions
       └── Validations
       │
       ▼
Event Manager Application
Benefits
Better code organization
Reduced duplication
Easier maintenance
Reusable page actions
Cleaner test cases
Improved scalability
Playwright Fixtures

Reusable fixtures are implemented to simplify test setup.

Fixtures provide access to Page Object instances such as:

Login pages
Admin dashboard
Admin students
Admin announcements
Admin posts
Discovery
Collaboration pages
Post details

This avoids repeatedly creating Page Object instances in individual tests.

Role-Based Testing

The application provides different functionality based on user roles.

The automation framework therefore validates workflows separately for:

Students
Administrators

This helps ensure that role-specific functionality is covered independently.

API and UI Validation

The project uses both API and browser-level automation.

API Testing

Focuses on:

Endpoint behavior
Authentication
Authorization
Request validation
Response validation
UI Testing

Focuses on:

User interactions
Forms
Navigation
Visibility
Role-based workflows
Feature behavior

Combining both approaches provides stronger coverage than relying only on UI automation.

Negative Testing

Negative testing is an important part of the framework.

The objective is not only to verify that valid workflows work, but also to verify that the application responds appropriately to invalid conditions.

Examples include:

Incorrect credentials
Missing mandatory information
Invalid input
Unauthorized access
Invalid API requests
Protected route access


Project Repository

GitHub:
https://github.com/sriram32134/eventauto

Application:
https://eventmanage-wheat.vercel.app/login/student

