import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e', timeout: 30000, workers: 1,
  use: { baseURL: 'http://127.0.0.1:3015', channel: 'chrome' },
  webServer: { command: 'npm start -- --hostname 127.0.0.1 --port 3015', url: 'http://127.0.0.1:3015', reuseExistingServer: false },
  projects: [{name:'desktop',use:{viewport:{width:1440,height:1000}}},{name:'tablet',use:{viewport:{width:820,height:1180}}},{name:'mobile',use:{viewport:{width:390,height:844}}}],
});
