const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({testDir:'./tests',testMatch:'home-v5-responsive.spec.js',timeout:60000,expect:{timeout:10000},workers:2,outputDir:'./test-results/home-v5-responsive',use:{baseURL:process.env.HOME_V5_BASE_URL||'http://localhost:3000',reducedMotion:'reduce',screenshot:'only-on-failure',trace:'retain-on-failure'}});
