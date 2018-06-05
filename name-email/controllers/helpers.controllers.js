/*
	Helper Functions For Controllers
*/

'use strict';


exports.isValidName = name => {
	const regex = /^[a-zA-Z]{3,26}$/;
	return regex.test( name );
};


exports.isValidEmail = email => {
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test( email );
};


exports.saveResourceErrorHandler = ( err, res, next ) => {
	/*
		Check Duplication
	*/
	if ( err.code === 11000 ) {

		const dupKey = getDuplicationKey( err );
		const error = specifyErrorMessage( dupKey );

		return res.status( 409 ).json({ param: dupKey, error });
	}
	next( err );
};

function getDuplicationKey( err ) {
	let field = err.message.split( 'index: ' )[ 1 ];
	field = field.split( ' dup key' )[ 0 ];

	const dupKey = field.substring( 0, field.lastIndexOf( '_' ) );

	return dupKey || undefined;
}


function specifyErrorMessage( dupKey ) {
	let error = '';

	switch ( dupKey ) {
		case 'email':
			error = 'email already registered';
			break;
		default:
			error = 'something went wrong, please try again!';
	}

	return error;
}
