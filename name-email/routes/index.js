/*
	Router
*/

'use strict';


const csrf = require( 'csurf' );
const csrfProtection = csrf({ cookie: true });
const router = require( 'express' ).Router();
const persons = require( '../controllers/persons' );

router.get( '/', ( req, res ) => res.status( 200 ).render( 'index' ) );

// Pass The csrfToken To The View
router.get( '/add', csrfProtection, ( req, res ) => res.status( 200 ).render( 'add', { csrfToken: req.csrfToken() } ) );

router.post( '/add', csrfProtection, persons.add );

router.get( '/list', persons.list );

module.exports = router;
