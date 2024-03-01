import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import apiEndpoints from '../utils/apiEndpoints';
import { CognitoAuth } from './cognitoAuth';
import { existingUser } from '../testData/userData';
import { InitiateAuthCommandOutput } from '@aws-sdk/client-cognito-identity-provider';

export class Session {
	readonly context: APIRequestContext;
	sessionId: string = '';
	csrf: string = '';
	cookies: any | undefined;
	headers: any;
	private readonly tokenType: string = 'Bearer';
	private readonly storagePath: string = '.auth/auth.json';

	private constructor(apiContext: APIRequestContext) {
		this.context = apiContext;
		this.headers = {
			Accept: 'application/json, text/plain, */*',
			Authorization: '',
			'Accept-Encoding': 'gzip, deflate, br',
			'Content-Type': 'application/json',
		};
	}

	public static async create(apiContext: APIRequestContext): Promise<Session> {
		const session: Session = new Session(apiContext);
		const response: APIResponse = await session.current();
		await session.rewriteSession(response);
		return session;
	}

	private async current(): Promise<APIResponse> {
		const response: APIResponse = await this.context.get(apiEndpoints.session.get, { headers: this.headers });
		// save storage state into shared file
		await this.context.storageState({ path: this.storagePath });
		return response;
	}

	private async rewriteSession(newSession: APIResponse): Promise<void> {
		const newSessionData = await newSession.json();
		this.sessionId = newSessionData.current.session_id;
		this.csrf = newSessionData.current.csrf;
		this.cookies = (await this.context.storageState()).cookies;
	}

	private async cognitoLogin(): Promise<void> {
		const cognitoAuth: CognitoAuth = new CognitoAuth();
		const response: InitiateAuthCommandOutput = await cognitoAuth.signIn(existingUser.USERNAME, existingUser.PASSWORD);
		expect(response.$metadata.httpStatusCode).toBe(200);
		expect(response.AuthenticationResult?.IdToken, 'Error logging in user.').not.toBeNull();
		expect(response.AuthenticationResult?.TokenType).toMatch(this.tokenType);

		if (response.AuthenticationResult?.TokenType != null && response.AuthenticationResult?.IdToken != null) {
			this.headers.Authorization = `${response.AuthenticationResult.TokenType} ${response.AuthenticationResult.IdToken}`;
		}
	}

	async doLogin(): Promise<APIResponse> {
		await this.cognitoLogin();
		const response: APIResponse = await this.current();
		await this.rewriteSession(response);
		return response;
	}
}
