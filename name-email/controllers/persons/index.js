/*
	Controllers - Persons
*/

'use strict';


const Person = require( '../../models/schemas/person' );
const { isValidName, isValidEmail, saveResourceErrorHandler } = require( '../helpers.controllers' );

exports.add = ( req, res, next ) => {

	/*
		Check Empty Params
	*/
	const requiredParams = [ 'name', 'email' ];

	let missingParam = false;

	requiredParams.forEach( param => {
		if ( missingParam ) return;

		if ( !req.body[ param ] || typeof req.body[ param ] !== 'string' || !req.body[ param ].length ) {
			missingParam = param;
		}
	});

	if ( missingParam ) {
		return res.status( 400 ).json({ param: missingParam, error: `missing ${ missingParam }` });
	}

	/*
		Validate Name
	*/
	if ( !isValidName( req.body[ 'name' ] ) ) {
		return res.status( 400 ).json({ param: 'name', error: 'invalid name' });
	}

	/*
		Validate Email
	*/
	if ( !isValidEmail( req.body[ 'email' ] ) ) {
		return res.status( 400 ).json({ param: 'email', error: 'invalid email' });
	}

	/*
		Create New Person
	*/
	const newPerson = new Person();

	newPerson.name = req.body[ 'name' ];
	newPerson.email = req.body[ 'email' ];

	newPerson.save()
		.then( user => res.status( 201 ).json( user ) )
		.catch( err => saveResourceErrorHandler( err, res, next ) );
};


exports.list = ( req, res, next ) => {
	Person.find( {} )
		.then( persons => res.render( 'list', { persons }) )
		.catch( next );
};
