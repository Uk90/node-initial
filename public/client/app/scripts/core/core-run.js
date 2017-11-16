( function() {
	'use strict';
	angular
		.module( 'app' )
		.run( [ '$rootScope', '$location', 'UserService', '$localStorage', '$window', function( $rootScope, $location, UserService, $localStorage, $window ) {
			$rootScope.$on( '$stateChangeStart', function() {
				//Check if user is logged in or not
				if ( !UserService.isLoggedIn() && $location.$$path.indexOf( 'change-password' ) === -1 &&
					$location.$$path.indexOf( 'register' ) === -1 ) {
					//Redirect to login
                    $location.path( '/login' );
				} else {
					//If user logged in and goes to login
					if ( $location.$$path === '/login' ) {
						if($localStorage.user.userrole.urol_role_id === 1 ) {
							$location.path( '/adminDashboard' );
						}
						if($localStorage.user.userrole.urol_role_id === 2 ) {
							$location.path( '/home' );
						}
					}
				}
				$rootScope.screenSize = $window.innerWidth;
				UserService.setUser( $localStorage.user );
			} );
		} ] );
} )();
