( function() {
	'use strict';

	var app = angular.module( 'app.user' );

	//App run time configurations
	app.run(
		[ '$rootScope', '$state', '$stateParams',
			function( $rootScope, $state, $stateParams ) {
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;
			}
		]
	)

	//App configurations for state and url proividers
	.config(
		[ '$stateProvider', '$urlRouterProvider',
			function( $stateProvider, $urlRouterProvider ) {
				$urlRouterProvider
					.when( '/', 'login' )
					.otherwise( '/login' );

				$stateProvider
					.state( 'feazo', {
						url: '',
						abstract: true,
						templateUrl: '../app/scripts/user/views/main.html',
						controller: 'UserController',
						controllerAs: 'userCtrl'
					} )
					.state( 'login', {
						url: '/login',
						templateUrl: '../app/scripts/user/views/login.html',
						controller: 'UserController',
						controllerAs: 'userCtrl'
					} )
					.state( 'employeeList', {
						url: '/employee-list',
						templateUrl: '../app/scripts/user/views/employee-list.html',
						controller: 'UserController',
						controllerAs: 'userCtrl'
					} )
					.state( 'projectList', {
						url: '/project-list',
						templateUrl: '../app/scripts/user/views/project-list.html',
						controller: 'UserController',
						controllerAs: 'userCtrl'
					} )
					.state( 'change-password', {
						url: '/change-password/:token',
						params: {
							token: null
						},
						templateUrl: '../app/scripts/user/views/change-password.html',
						controller: 'UserController',
						controllerAs: 'userCtrl'
					} )
					.state( 'register', {
						url: '/register',
						templateUrl: '../app/scripts/user/views/register.html',
						controller: 'UserController',
						controllerAs: 'userCtrl'
					} )
					.state( 'success', {
						url: '/success',
						templateUrl: '../app/scripts/user/views/success.html',
						controller: 'UserController',
						controllerAs: 'userCtrl'
					} )
					.state( 'verify-user-email', {
						url: '/verify-user-email/:userId',
						templateUrl: '../app/scripts/user/views/login.html',
						controller: 'UserController',
						controllerAs: 'userCtrl',
						resolve: {
							verifyEmail: function( $stateParams, UserService, logger ) {
								var verifyUserEmail = UserService.verifyEmail( $stateParams.userId );
								verifyUserEmail.then( function( res ) {
										if ( !res.data.error ) {
											logger.showMessage( 'success', 'Your mail ID has been successfully verified' );
										} else {
											logger.showMessage( 'error', res.data.error );
										}
									} )
									.catch( function() {
										logger.showMessage( 'error', 'Service unavailable.' );
									} );
							},
						}
					} );
			}
		]
	);
} )();
