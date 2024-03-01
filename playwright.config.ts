import { defineConfig } from '@playwright/test';
import { CONFIG } from './variables.config';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests',

	/* Run tests in files in parallel */
	fullyParallel: false,

	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,

	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,

	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,

	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
		ignoreHTTPSErrors: true,
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'testProj',
			use: {
				baseURL: CONFIG.baseHost,
			},
		},
	],
});
