/*

	Description: use Jenkins API to get a list of jobs and store it into a database
	@author: Mohamed Sharaf Jr.<mohamedsharafjr@gmail.com>

*/

'use strict';


// Jenkins options
const options = {
	baseUrl: 'http://<username>:<password>@jenkins_url', // connect to jenkins url( authenticated )
	crumbIssuer: true, // enable CSRF Protection support
	promisify: true // convert callback methods to promises
};

// initialize a new Jenkins client
const jenkins = require( 'jenkins' )( options );

const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const { dbUrl, jobKeys, timestamps } = require( './config' );

// connect to mongo database
mongoose.connect( dbUrl )
	.catch( err => console.error( 'err', err.message ) );

// constructing job document
const jobSchema = new Schema( jobKeys, { timestamps } );

// compiling job document
const Job = mongoose.model( 'Job', jobSchema );

// get a list of jobs and save it into the database
const getJobsListAndSaveToDB = callback => {
	return jenkins.job.list()
		.then( callback )
		.catch( err => console.error( err ) );
};

const saveJob = job => {
	const newJob = new Job( job );
	newJob.save()
		.then( savedJob => console.log( 'A job saved successfully with the name: "%s"', savedJob.name ) )
		.catch( err => console.error( 'err', err ) );
};

getJobsListAndSaveToDB( list => {
	list.forEach( async job => {
		// check if the current job exists in the database to avoid saving it twice
		const isJobExists = await Job.findOne({ name: job.name });

		// return if the current job exists
		if ( isJobExists ) {
			console.log( 'A job already exists with the name "%s"', job.name );
			return;
		}
		// otherwise, save it into the database
		saveJob( job );
	});
});
