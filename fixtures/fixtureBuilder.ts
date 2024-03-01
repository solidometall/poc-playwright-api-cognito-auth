import { APIRequestContext, APIResponse, request, expect, test as base } from '@playwright/test';
import { CONFIG } from '../variables.config';
import customerRequests from '../requests/customer/customerRequests';
import { parseCustomerIdFromResponse } from '../utils/generalFunctions';
import { buildFakeCustomer } from '../testData/fakeData';
import { customer } from '../utils/types';
import { Session } from '../helpers/session';

// declare the types of your fixtures
interface MyFixtures {
	apiContext: APIRequestContext;
	createCustomer: APIResponse;
	userSession: Session;
}

// extend base test to be used in multiple test files. Each of them will get the fixtures
export const test = base.extend<MyFixtures>({
	// eslint-disable-next-line no-empty-pattern
	async apiContext({}, use) {
		// Set up the fixture
		const apiContext: APIRequestContext = await request.newContext({
			baseURL: CONFIG.baseHost,
			extraHTTPHeaders: {
				Accept: 'application/json',
				'Content-type': 'application/json',
			},
			// clean storage state for each session
			storageState: undefined,
		});

		// Use the fixture value in the test
		await use(apiContext);

		// Clean up the fixture
		await apiContext.dispose();
	},

	// create customer returning its ID, then delete it (teardown)
	createCustomer: async ({ apiContext }, use) => {
		// Set up the fixture
		const customerData: customer = buildFakeCustomer();
		const response: APIResponse = await customerRequests.createCustomer(apiContext, customerData);
		expect(response.ok()).toBeTruthy();
		const customerId: number = await parseCustomerIdFromResponse(response);

		// Use the fixture value in the test
		await use(response);

		// Clean up the fixture
		const deleteResponse: APIResponse = await customerRequests.deleteCustomer(apiContext, customerId);
		expect(deleteResponse.ok()).toBeTruthy();
	},

	// eslint-disable-next-line no-empty-pattern
	// create user session
	userSession: async ({apiContext}, use) => {
		// Set up the fixture
		const session: Session = await Session.create(apiContext);

		// Use the fixture value in the test
		await use(session);

		// clean up the fixture
		await apiContext.dispose();
	},
});

export { expect } from '@playwright/test';
