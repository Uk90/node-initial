( function() {
	'use strict';

	var app = angular.module( 'app' );

	app.config( toastrConfig )
		.config( themeConfig )
		.config( httpConfig );

	/* @ngInject */
	function toastrConfig() {
		toastr.options.newestOnTop = true;
		toastr.options.progressBar = true;
		toastr.options.showMethod = 'show';
		toastr.options.hideMethod = 'hide';
		toastr.options.preventDuplicates = true;
		toastr.options.positionClass = 'toast-top-center';
	}


	themeConfig.$inject = [
		'$mdThemingProvider', '$mdDateLocaleProvider', '$mdAriaProvider'
	];

	/* @ngInject */
	function themeConfig( $mdThemingProvider, $mdDateLocaleProvider, $mdAriaProvider ) {

		/**
		 * Theme configuration
		 */
		$mdThemingProvider.theme( 'default' )
			.primaryPalette( 'grey', {
				'default': '500'
			} )
			.accentPalette( 'blue', {
				'default': '500'
			} )
			.warnPalette( 'red', {
				'default': '400'
			} );

		//Date picker configuration
		$mdDateLocaleProvider.formatDate = function( date ) {
			return moment( date ).format( 'MM-DD-YYYY' );
		};
		//Disable area label warnings
		$mdAriaProvider.disableWarnings();
	}



	httpConfig.$inject = [
		'$httpProvider', '$sceDelegateProvider', '$locationProvider', '$qProvider', 'config'
	];

	function httpConfig( $httpProvider, $sceDelegateProvider, $locationProvider, $qProvider, config ) {

		$httpProvider.defaults.useXDomain = true;
		//$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
		delete $httpProvider.defaults.headers.common[ 'X-Requested-With' ];
		$sceDelegateProvider.resourceUrlWhitelist( [ '**' ] );

		var interceptor = [ '$q', '$rootScope', '$localStorage', '$location', function( $q, $rootScope, $localStorage, $location ) {

			return {
				//On Request
				'request': function( request ) {
					if ( request.url.indexOf( config.APP_API_URL_INDEX ) >= 0 ) {
						request.url = config.APP_API_DOMAIN + request.url;
						//Set API token and user id
						if ( $localStorage.user ) {
							request.headers = {
								'apitoken': $localStorage.user.userToken,
								'userid': $localStorage.user.user_id,
								'Content-Type': 'application/json; charset=UTF-8'
							};
							if ( request.isFile ) {
								request.headers = {
									'apitoken': $localStorage.user.userToken,
									'userid': $localStorage.user.user_id,
									'Content-Type': undefined
								};
							}
						}
					}
					$rootScope.isLoading = true;
					return request || $q.when( request );
				},
				//On Request Error
				requestError: function( rejection ) {
					$rootScope.isLoading = false;
					return $q.reject( rejection );
				},
				//On Response
				response: function( response ) {
					$rootScope.isLoading = false;
					return response;
				},
				//On Response Error
				responseError: function( rejection ) {
					if (rejection.status === 440) {
						delete $localStorage.user;
						$location.path('logout');
					}
					$rootScope.isLoading = false;
					return $q.reject( rejection );
				}
			};
		} ];

		$httpProvider.interceptors.push( interceptor );
		$qProvider.errorOnUnhandledRejections( false );
		$locationProvider.hashPrefix( '' );
	}
} )();
