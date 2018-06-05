/*
	Person Schema
*/

'use strict';


const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const personKeys = require( './person.keys' );
const timestamps = require( '../timestamps' );

/*
	Constructing Person Document
*/
const personSchema = new Schema( personKeys , { timestamps } );

/*
	Compiling Person Model
*/
const Person = mongoose.model( 'Person', personSchema );

module.exports = Person;
