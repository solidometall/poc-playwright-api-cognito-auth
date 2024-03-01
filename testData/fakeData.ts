import { currentTimestamp } from '../utils/generalFunctions';
import { customer } from '../utils/types';

export function buildFakeCustomer(): customer {
	const id: number = currentTimestamp();
	return {
		name: `Test User ${id}`,
		address: `144 Townsend, San Francisco ${id}`,
		email: `test.user.${id}@test.com`,
		phone: id.toString(),
		username: `testuser${id}`,
		password: 'testpassword',
		enabled: true,
		role: 'USER',
	};
}
