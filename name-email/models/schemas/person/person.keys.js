/*
	Person Keys
*/

'use strict';


module.exports = {
	name: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		lowercase: true
	}
};
