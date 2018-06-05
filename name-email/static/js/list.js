(function( self ) {

	'use strict';


	try {

		// get the id from URL
		const newPersonId = self.location.href.split( '#' )[ 1 ];

		// get the list item element that matches the id from URL
		const person__item = document.getElementById( newPersonId );

		// add a transition class to the list item that holds new person's id
		person__item.classList.add( 'new--person' );

		// remove the transition class from person__item after 2s
		self.setTimeout( () => person__item.classList.remove( 'new--person' ) , 2000 );

	} catch ( e ) {
		// do nothing
	}
}( window ));
