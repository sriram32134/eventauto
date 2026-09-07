const { expect } = require('@playwright/test');
const { ROUTES } = require('../utils/constants');

class CalendarPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.heading = page.locator('h1, h2').filter({ hasText: /calendar/i }).first();
    this.monthHeader = page.locator('.calendar-month, h3').first();
    this.prevMonthButton = page.locator('button').filter({ hasText: /<|prev|chevronleft/i }).first();
    this.nextMonthButton = page.locator('button').filter({ hasText: />|next|chevronright/i }).first();
    this.dayCells = page.locator('.calendar-day, td, .day-cell');
    this.dayDetailsPanel = page.locator('.day-details, .event-details-panel').first();
  }

  async goto() {
    await this.page.goto(ROUTES.CALENDAR);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectCalendarPageVisible() {
    await expect(this.page).toHaveURL(/calendar|\/$/);
  }

  async selectDay(dayNumber) {
    const cell = this.dayCells.filter({ hasText: new RegExp(`^${dayNumber}$`) }).first();
    await cell.click();
  }
}

module.exports = CalendarPage;
