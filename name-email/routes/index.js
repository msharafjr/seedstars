/*
	Router
*/

'use strict';


const router = require( 'express' ).Router();
const persons = require( '../controllers/persons' );

router.get( '/', ( req, res ) => res.status( 200 ).render( 'index' ) );

router.get( '/add', ( req, res ) => res.status( 200 ).render( 'add' ) );

router.post( '/add' , persons.add );

router.get( '/list', persons.list );

module.exports = router;
