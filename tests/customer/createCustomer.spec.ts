import { expect, test } from '../../fixtures/fixtureBuilder';
import customerRequests from '../../requests/customer/customerRequests';
import errorMessages from '../../utils/messages';
import { parseCustomerIdFromResponse, parseCustomerUsernameFromResponse } from '../../utils/generalFunctions';
import { APIResponse } from '@playwright/test';
import { buildFakeCustomer } from '../../testData/fakeData';
import { customer } from '../../utils/types';

test.describe.serial('Create customer', () => {
	test('it should create a new customer successfully', async ({ apiContext }) => {
		const customerData: customer = buildFakeCustomer();
		const createCustomerResponse: APIResponse = await customerRequests.createCustomer(apiContext, customerData);
		const createCustomerResponseData = await createCustomerResponse.json();

		expect(createCustomerResponse.ok()).toBeTruthy();
		expect(createCustomerResponseData).toEqual(expect.objectContaining({ customerId: expect.any(Number) }));
	});

	test('it should return an error when username is already in use', async ({ apiContext, createCustomer }) => {
		const customerId: number = await parseCustomerIdFromResponse(createCustomer);
		const existingCustomerUsername: string = await parseCustomerUsernameFromResponse(
			await customerRequests.searchCustomerById(apiContext, customerId)
		);

		const newCustomerData: customer = buildFakeCustomer();
		newCustomerData.username = existingCustomerUsername;
		const newCustomerResponse: APIResponse = await customerRequests.createCustomer(apiContext, newCustomerData);
		const newCustomerResponseData = await newCustomerResponse.json();

		expect(newCustomerResponseData.errorMessage).toMatch(errorMessages.customer.create.alreadyExists);
		expect(newCustomerResponse.ok()).toBeFalsy();
	});
});
