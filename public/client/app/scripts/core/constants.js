( function() {
	'use strict';

	angular
		.module( 'app' )
		.constant( 'config', {
			appName: 'Fezable',
			appVersion: '1.0',
			APP_API_URL_INDEX: '/api/',
			APP_API_DOMAIN: 'http://localhost:3009'
		} );

} )();
