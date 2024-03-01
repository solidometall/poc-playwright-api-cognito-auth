export default {
	customer: {
		create: {
			alreadyExists: /^A customer with username (\w+) already exists.$/,
		},
		delete: {
			notFound: /^Unable to delete. Customer with id (\w+) not found.$/,
		},
	},
};
