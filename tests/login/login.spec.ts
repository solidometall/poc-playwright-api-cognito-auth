import { expect, test } from '../../fixtures/fixtureBuilder';
import { APIResponse } from '@playwright/test';
import { existingUser } from '../../testData/userData';
import apiEndpoints from '../../utils/apiEndpoints';

test.describe.serial('API Login suite', () => {

	test('existing user can login with a valid email and password combination @regression @login', async ({ userSession }) => {
		const response: APIResponse = await userSession.doLogin();
		const responseData = await response.json();

		expect(response.status()).toBe(200);
		// validate a logged-in user response attribute
		expect(responseData.current.username, 'Session does not include logged in user data').toBeDefined();
	});

	test('logged-in user performs request @regression @login', async ({ userSession }) => {
		await userSession.doLogin();
		const endpoint: string = apiEndpoints.customer.get.concat(existingUser.USERNAME);
		const response: APIResponse = await userSession.context.get(endpoint, { headers: userSession.headers });
		const responseData = await response.json();

		expect(response.status()).toBe(200);
		await expect(responseData.phone, 'Response data does not include "phone"').not.toBeEmpty();
		await expect(responseData.address, 'Response data does not include "address"').not.toBeEmpty();
	});
});
