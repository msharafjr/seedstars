(function() {

	'use strict';


	/* Helpers */
	const isValidName = name => {
		const regex = /^[a-zA-Z]{3,26}$/;
		return regex.test( name );
	};

	const isValidEmail = email => {
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test( email );
	};
	/* End Helpers */

	const form = document.forms.namedItem( 'addForm' );
	const errorMessage = document.querySelector( '.error__message' );

	// Add Event Listener To Each Input
	[ 'name', 'email' ].forEach( input => {
		form[ input ].addEventListener( 'keyup', handleChange );
	});

	// Handle Input Change
	function handleChange({ target }) {
		const { name, value } = target;

		if ( name === 'name' && ( !value.length || !isValidName( value ) ) ) {
			return errorInput( name );
		}

		if ( name === 'email' && ( !value.length || !isValidEmail( value ) ) ) {
			return errorInput( name );
		}

		form[ name ].classList.add( 'valid-input' );
		form[ name ].classList.remove( 'has-error' );
	}

	function errorInput( input ) {
		form[ input ].classList.remove( 'valid-input' );
		form[ input ].classList.add( 'has-error' );
	}

	// Form Submit Handler
	form.submit.addEventListener( 'click', handleSubmit );

	function handleSubmit( e ) {
		e.preventDefault();

		form.name.classList.remove( 'has-error' );
		form.email.classList.remove( 'has-error' );

		errorMessage.innerHTML = '';
		errorMessage.style.visibility = 'hidden';

		if ( isValidForm() ) {
			addNewPerson();
		}
	}

	function isValidForm() {
		const { name, email } = form;

		if ( !name.value.length ) {
			displayError( 'name', 'Name required' );
			return false;
		}

		if ( !email.value.length ) {
			displayError( 'email', 'Email required' );
			return false;
		}

		if ( !isValidName( name.value ) ) {
			displayError( 'name' , 'Name must be at least 3 characters long' );
			return false;
		}

		if ( !isValidEmail( email.value ) ) {
			displayError( 'email', 'Invalid email - e.g( name@example.com )' );
			return false;
		}
		return true;
	}

	function displayError( field, msg ) {
		if ( field ) {
			const input = field.toString();

			errorInput( input );

			form[ input ].focus();
		}

		errorMessage.innerHTML = msg || 'Something went wrong, please try again later';
		errorMessage.style.visibility = 'visible';
	}

	function addNewPerson() {

		const data = {
			name: form.name.value,
			email: form.email.value
		};

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( data )
		};

		// Send A POST Request To The API
		fetch( '/add', options )
			.then( handleResponse )
			.catch( err => displayError( '', err.msg ) );
	}

	function handleResponse( res ) {
		// On Fail, Display Error
		if ( res.status !== 201 ) {
			res.json().then( err =>  displayError( err.param, err.error ));
		} else {
			// On Success, Redirect To Persons List Page
			res.json().then( res => window.location = '/list#' + res._id );
		}
	}
}());
