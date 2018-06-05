module.exports = {
	// database URL
	dbUrl: process.env.DB_LINK || 'mongodb://localhost:5000',

	// for job schema
	jobKeys: {
		name: String,
		url: String,
		color: String
	},
	timestamps: {
		createdAt: 'createdDate',
		updatedAt: 'updatedDate'
	}
};
