/*
	Configuration
*/

module.exports = {
	port: process.env.PORT || 3000,
	env: process.env.NODE_ENV || 'development',
	dbUrl: process.env.DB_LINK || 'mongodb://localhost:5000'
};
