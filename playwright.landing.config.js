const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({ testDir: './tests', testMatch: 'landing-v5.spec.js', timeout: 60000, expect: { timeout: 10000 }, workers: 2, outputDir: './test-results/landing-v5', use: { baseURL: process.env.LANDING_BASE_URL || 'http://localhost:3000', reducedMotion: 'reduce', screenshot: 'only-on-failure', trace: 'retain-on-failure' } });
