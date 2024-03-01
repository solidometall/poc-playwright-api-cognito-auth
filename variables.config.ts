// Read from default ".env" file.
import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
	// -----URL information
	// Don't include http or https here
	baseHost: process.env.BASE_API_URL,
};
