import { APIRequestContext, APIResponse } from '@playwright/test';

export async function executeRequest(
	apiContext: APIRequestContext,
	requestUrl: string,
	method: string,
	requestOptions?: object
): Promise<APIResponse> {
	try {
		// @ts-expect-error
		const response: APIResponse = await apiContext[method](requestUrl, {
			data: requestOptions,
		});
		const responseCode: number = response.status();
		const responseOk: boolean = response.ok();

		if (!responseOk && responseCode >= 500) {
			const errorStatus = `Code: ${responseCode} \r\n`;
			const responseStatus = `Status: ${responseOk} \r\n`;
			const errorResponse = `Response: ${await response.text()} \r\n`;
			throw `${errorStatus} ${errorResponse} ${responseStatus} `;
		}

		return response;
	} catch (error) {
		const errorRequestUrl = `Request url: ${requestUrl} \r\n`;
		const errorRequestMethod = `Method: ${method} \r\n`;
		const errorRequestOptions = `Request options: ${JSON.stringify(requestOptions)} \r\n`;

		throw new Error(
			`Invalid request! Failed on 'executeRequest' method. \r\n
            ${errorRequestUrl} ${errorRequestMethod} ${errorRequestOptions} ${error}`
		);
	}
}
