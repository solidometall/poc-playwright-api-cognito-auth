import { APIResponse } from '@playwright/test';

export const delay = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));

export const currentTimestamp = () => Date.now();

export async function parseCustomerIdFromResponse(data: APIResponse): Promise<number> {
	const customerData = await data.json();
	return customerData.customerId;
}

export async function parseCustomerUsernameFromResponse(data: APIResponse): Promise<string> {
	const customerData = await data.json();
	return customerData.username;
}
