/*================================================================
App Fezable Core
==================================================================*/
( function() {
	'use strict';

	angular.element( document ).ready( function() {
		angular.bootstrap( document, [ 'app' ] );
	} );

	/**
	 * @ngapp
	 * @name app
	 * @description
	 * Fezable app module starts here
	 * @author Ideas2it Technologies
	 */
	angular.module( 'app', [
		'ui.router',
		'ngMaterial',
		'ngSanitize',
		'ui.bootstrap',
		'ngStorage',
		'ngPassword',
		'mdDataTable',
		'satellizer',
		'ngCsv',
		'angAccordion',
		'ngSanitize',
		'app.landing',
		'app.logger',
		'app.user',
	] );

} )();
