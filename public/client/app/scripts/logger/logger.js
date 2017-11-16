( function() {
	'use strict';

	angular
		.module( 'app.logger' )
		.factory( 'logger', logger );

	logger.$inject = [ '$log' ];

	/* @ngInject */
	function logger( $log ) {

		var customOptions = {
			successDuration: 6000,
			errorDuration: 8000,
			warningDuration: 5000,
			successCloseButton: false,
			errorCloseButton: true,
			warningCloseButton: true,
		};

		var service = {
			showToasts: true,
			info: $log.info,
			log: $log.log,
			debug: $log.debug,
			success: success,
			error: error,
			showMessage: showMessage
		};

		return service;
		//Success toaster message
		function success( message ) {
			successConfig();
			toastr.success( message );
		}
		//Error toaster message
		function error( message ) {
			errorConfig();
			toastr.error( message );
		}
		//Show toaster message based on condition
		function showMessage( msgType, message ) {
			if ( msgType !== 'undefined' ) {
				msgType = msgType.toLowerCase();
				if ( msgType === 'success' ) {
					successConfig();
					toastr.success( message );
				} else if ( msgType === 'error' ) {
					errorConfig();
					toastr.error( message );
				} else {
					warningConfig();
					toastr.warning( message );
				}
			}
		}
		//Success message configurations
		function successConfig() {
			toastr.options.closeButton = customOptions.successCloseButton;
			toastr.options.timeOut = customOptions.successDuration;
		}
		//Error message configurations
		function errorConfig() {
			toastr.options.closeButton = customOptions.errorCloseButton;
			toastr.options.timeOut = customOptions.errorDuration;
		}
		//Warning message configurations
		function warningConfig() {
			toastr.options.closeButton = customOptions.warningCloseButton;
			toastr.options.timeOut = customOptions.warningDuration;
		}
	}
}() );
