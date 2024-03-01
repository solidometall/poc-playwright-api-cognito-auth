import apiEndpoints from '../../utils/apiEndpoints';
import methods from '../../utils/apiMethods';
import { executeRequest } from '../../utils/apiRequests';
import { APIRequestContext, APIResponse } from '@playwright/test';
import { CONFIG } from '../../variables.config';
import { customer } from '../../utils/types';

async function createCustomer(apiContext: APIRequestContext, customerData: customer): Promise<APIResponse> {
	const requestUrl = `${CONFIG.baseHost}${apiEndpoints.customer.create}`;
	const method: string = methods.post;
	return await executeRequest(apiContext, requestUrl, method, customerData);
}

async function deleteCustomer(apiContext: APIRequestContext, customerId: number): Promise<APIResponse> {
	const requestUrl = `${CONFIG.baseHost}${apiEndpoints.customer.delete}${customerId}`;
	const method: string = methods.delete;
	return await executeRequest(apiContext, requestUrl, method);
}

async function searchCustomerById(apiContext: APIRequestContext, customerId: number): Promise<APIResponse> {
	const requestUrl = `${CONFIG.baseHost}${apiEndpoints.customer.get}${customerId}`;
	const method: string = methods.get;
	return await executeRequest(apiContext, requestUrl, method);
}

export default { createCustomer, deleteCustomer, searchCustomerById };
