import { cognitoParams } from '../testData/userData';
import {
	AuthFlowType,
	CognitoIdentityProviderClient,
	InitiateAuthCommand,
	InitiateAuthCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';

export class CognitoAuth {
	private readonly client: CognitoIdentityProviderClient;

	constructor() {
		this.client = new CognitoIdentityProviderClient(cognitoParams);
	}

	async signIn(username: string, password: string): Promise<InitiateAuthCommandOutput> {
		const authObj = {
			AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
			ClientId: cognitoParams.cognito_client_id,
			AuthParameters: { USERNAME: username, PASSWORD: password },
		};

		const authCommand: InitiateAuthCommand = new InitiateAuthCommand(authObj);
		return await this.client.send(authCommand);
	}
}
