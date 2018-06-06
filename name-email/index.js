/*

	Description:	Example app to store/display names and emails - Seedstars
	@author:		Mohamed Sharaf Jr.<mohamedsharafjr@gmail.com>

*/

'use strict';


const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cookieParser = require( 'cookie-parser' );
const mongoose = require( 'mongoose' );
const helmet = require( 'helmet' );
const xssFilter = require( 'x-xss-protection' );
const path = require( 'path' );

const app = express();

const routes = require( './routes' );
const config = require( './config' );
const errorHandlers = require( './controllers/errorHandler' );

app.set( 'port', parseInt( config.port, 10 ) );
app.set( 'env', config.env );

/*
	Database Connection
*/
mongoose.connect( config.dbUrl )
	.catch( err => console.error( 'Database Connection Failed', err.message ));

/*
	Set Pug As A View Engine
*/
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'pug' );

app.use( helmet() );
app.use( xssFilter() );
app.use( bodyParser.json() );
app.use( cookieParser() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( express.static( path.join( __dirname, 'static' ) ) );

/*
	Routes
*/
app.use( '/', routes );

const port = app.get( 'port' );
const env = app.get( 'env' );

/*
	Error Handlers
*/
app.use( errorHandlers.catch404 );
app.use( errorHandlers.errorHandler );


const server = app.listen( port );
console.log( `App listening on port ${ server.address().port } in ${ env } mode` );
