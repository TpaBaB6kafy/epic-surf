const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  testMatch: ['home-v2.spec.js', 'home-v2-promotion.spec.js', 'home-v2-mobile-lessons.spec.js', 'home-v2-lessons-included-v23.spec.js'],
  timeout: 60000,
  expect: { timeout: 10000 },
  workers: 1,
  outputDir: './test-results/home-v2-promotion',
  use: { baseURL: process.env.HOME_V2_BASE_URL || 'http://127.0.0.1:3300', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
});
