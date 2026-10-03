const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({testDir:'./tests',testMatch:'gallery-photos.spec.js',timeout:60000,expect:{timeout:10000},workers:2,outputDir:'./test-results/gallery-photos',use:{baseURL:'http://localhost:3000',reducedMotion:'reduce',screenshot:'only-on-failure',trace:'off'}});
