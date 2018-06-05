/*

	MIDDLEWARES

*/

'use strict';


const env = require( '../config' ).env;

/*
	Catch 404 And Forward To The Error Handler
*/
exports.catch404 = ( req, res , next ) => {
	const err = new Error( 'Not Found' );

	err.status =  404;
	next( err );
};

/*
	Error Handler Function
*/
exports.errorHandler = ( err, req, res , next ) => {
	if ( env !== 'production' ) {
		console.log( err.message );
	}

	const status = err.status || 500;

	let error;

	if ( status >= 400 && status < 500 && err.message ) {
		error = err.message;
	} else {
		error = 'Internal server error';
	}

	// Render Error Page If Request Method Is GET
	if ( req.method === 'GET' ) {
		return res.status( status ).render( 'error', { error } );
	}

	res.status( status ).json({ error });
};
