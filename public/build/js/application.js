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

( function() {
	'use strict';
	/**
	 * @ngapp
	 * @name landing
	 * @description
	 * landing module app injection
	 * @author Ideas2it Technologies
	 */
	angular.module( 'app.landing', [] );
} )();

(function() {
    'use strict';
    /**
	 * @ngapp
	 * @name logger
	 * @description
	 * logger module 
	 * @author Ideas2it Technologies
	 */
    angular.module('app.logger', []);
})();

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

(function() {
  'use strict';

  /**
   * @ngapp
   * @name user-module
   * @description
   * user module app injection
   * @requires
   * @author Ideas2it Technologies
   */
  angular.module('app.user', ['satellizer'])
    .config(function($authProvider) {

      $authProvider.httpInterceptor = function() {
        return true;
      };
      $authProvider.withCredentials = false;
      $authProvider.tokenRoot = null;
      $authProvider.baseUrl = '/';
      $authProvider.loginUrl = '/auth/login';
      $authProvider.signupUrl = '/auth/signup';
      $authProvider.unlinkUrl = '/auth/unlink/';
      $authProvider.tokenName = 'token';
      $authProvider.tokenPrefix = 'satellizer';
      $authProvider.tokenHeader = 'Authorization';
      $authProvider.tokenType = 'Bearer';
      $authProvider.storageType = 'localStorage';

      //facebook
      $authProvider.facebook({
        clientId: '1910269402587019',
        name: 'facebook',
        url: 'api/v1/users/auth/facebook',
        authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
        redirectUri: window.location.origin + '/',
        requiredUrlParams: ['display', 'scope'],
        scope: ['email'],
        scopeDelimiter: ',',
        display: 'popup',
        oauthType: '2.0',
        popupOptions: {
          width: 580,
          height: 400
        }

      });

      //Google
      $authProvider.google({
        clientId: '653184489054-2bcusfajmqaq9le3hklk03im44e8p6m0.apps.googleusercontent.com',
        name: 'google',
        url: 'api/v1/users/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: window.location.origin + '/',
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        scope: ['profile', 'email'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        display: 'popup',
        oauthType: '2.0',
        popupOptions: {
          width: 452,
          height: 633
        }
      });

      // Generic OAuth 1.0
      $authProvider.oauth1({
        name: null,
        url: null,
        authorizationEndpoint: null,
        redirectUri: null,
        oauthType: null,
        popupOptions: null
      });

    });

})();

( function() {
	'use strict';

	/**
	 * @ngdoc UserController
	 * @name UserController
	 * @module app.user
	 * @description
	 * User controller contains all the models related to main module
	 * @author Ideas2IT Technologies
	 */
	function UserController( $rootScope, $state, UserService, logger, $location, $scope, $auth ) {

		var vm = this;
		vm.selected = [];
		vm.aUser = [];
		vm.project = {};
		//Password pattern
		vm.passwordPattern = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z@#%&]{8,}$/;
		vm.passwordPatternText = '8 characters alphanumeric with an upper case!';

		/**
		 * @ngdoc Function
		 * @name vm.redirectToRegister
		 * @desc Redirect to register
		 */
		vm.redirectToRegister = function() {
			$state.go( 'register' );
		};

		/**
		 * @ngdoc Function
		 * @name vm.login
		 * @desc User login
		 * @param loginForm
		 */
		vm.login = function( loginForm ) {
			console.log( 'project');
			console.log( vm.project);
			vm.promise = UserService.login( vm.project );
			vm.promise.then( function( res ) {
				if ( res.data.status !== 'Failure' ) {
					logger.showMessage( res.data.status, res.data.message );
				} else {
					logger.showMessage( res.data.status, res.data.message );
				}
			} );
		};

		/**
		 * @ngdoc Injector
		 * @name listProject
		 * @desc List All project
		 * @param form
		 */
		vm.projects = {};
		vm.searchProject = function() {
			$rootScope.$broadcast( 'searchProject', vm.searchKey );
		};

		/**
		 * @ngdoc Function
		 * @name vm.register
		 * @desc User register
		 * @param form
		 */
		vm.register = function( registerForm ) {
			vm.promise = UserService.register( vm.user );
			vm.promise.then( function( res ) {
				if ( res.data.status !== 'Failure' ) {
					$state.go( 'success' );
					UserService.resetForm( registerForm );
				} else {
					logger.showMessage( res.data.status, res.data.message );
					UserService.resetForm( registerForm );
				}
			} );
		};

		/**
		 * @ngdoc Function
		 * @name vm.forgetPassword
		 * @desc User Forget Password
		 * @param form
		 */
		vm.getEmpList = function() {
			console.log(1);
			vm.promise = UserService.getEmpList();
			vm.promise.then( function( res ) {
				console.log(12);
				console.log(res.data.status);
				if ( res.data.status !== 'Failure' ) {
					console.log('res');
					console.log(res.data.user);
					vm.userList = res.data.user;
				} else {
				logger.showMessage( 'error', res.data.message );
				}
			} );
		};


		vm.updateEmp = function(data) {
			console.log(121);
			var empData = data;
			var id = empData._id;
			vm.promise = UserService.updateEmp(id, empData);
			vm.promise.then( function( res ) {
				if ( res.data.status !== 'Failure' ) {
					logger.showMessage( 'success', res.data.message );
				} else {
				logger.showMessage( 'error', res.data.message );
				}
			} );
		};

		vm.deleteEmp = function(index, data) {
			var id = data._id;
			vm.promise = UserService.deleteEmp(id);
			vm.promise.then( function( res ) {
				if ( res.data.status !== 'Failure' ) {
					logger.showMessage( 'success', res.data.message );
					vm.userList.splice(index, 1);
				} else {
				logger.showMessage( 'error', res.data.message );
				}
			} );
		};

		vm.getProjectList = function() {
			vm.promise = UserService.getProjectList();
			vm.promise.then( function( res ) {
				if ( res.data.status !== 'Failure' ) {
					vm.projectList = res.data.projects;
				} else {
				logger.showMessage( 'error', res.data.message );
				}
			} );
		};


		$scope.authenticate = function(provider) {
      		var userData = $auth.authenticate(provider);
			userData.then( function( res ) {
				if ( res.data.status !== 'error' ) {
					UserService.setUser( res.data );
					if (res.data.userrole.urol_role_id === 1) {
						$state.go( 'adminDashboard' );
					} else {
					  if (res.data.subscription.tmf === 1 || res.data.subscription.fsf === 1) {
						  $state.go( 'home' );
					  } else {
					    $state.go( 'subscription' );
				    }
				  }
				} else {
					logger.showMessage( res.data.status, res.data.message );
					UserService.resetForm( loginForm );
				}
			} );
    	};
	}

	angular
		.module( 'app.user' )
		.controller( 'UserController', UserController );

	/**
	 * @ngdoc Injector
	 * @name UserController
	 * @module app.user
	 * @description
	 * All the dependency injections for main module
	 * @author Ideas2IT Technologies
	 */
	UserController.$inject = [ '$rootScope', '$state', 'UserService', 'logger', '$location', '$scope', '$auth' ];

} )();


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

( function() {
	'use strict';

	/**
	 * @ngdoc Service
	 * @name UserDataService
	 * @description  service http request and response handler
	 * @module app.user
	 * @author Ideas2IT Technologies
	 */
	function UserDataService( $http ) {
		return {
			login: function( data ) {
				console.log('data');
				console.log(data);
				return $http( {
					method: 'POST',
					url: '/api/v1/users/project',
					data: data
				} );
			},
			fbLogin: function() {
				return $http( {
					method: 'GET',
					url: '/api/v1/users/login/facebook',
				} );
			},
			fbLoginCallback: function() {
				return $http( {
					method: 'GET',
					url: '/api/v1/users/login/facebook/callback',
				} );
			},
			register: function( data ) {
				return $http( {
					method: 'POST',
					url: '/api/v1/users',
					data: data
				} );
			},

			verifyEmail: function( userId ) {
				return $http( {
					method: 'GET',
					url: '/api/v1/users/' + userId + '/verifyuseremail'
				} );
			},

			getEmpList: function( data ) {
				return $http( {
					method: 'GET',
					url: '/api/v1/getEmpList',
				} );
			},

			updateEmp: function( id, empData ) {
				return $http( {
					method: 'POST',
					url: '/api/v1/employee/edit/'+id,
					data: empData
				} );
			},

			deleteEmp: function( id ) {
				return $http( {
					method: 'GET',
					url: '/api/v1/employee/delete/'+id,
				} );
			},

			getProjectList: function() {
				return $http( {
					method: 'GET',
					url: '/api/v1/getProjectList',
				} );
			},

			// updateProject: function( id, data ) {
			// 	return $http( {
			// 		method: 'POST',
			// 		url: '/api/v1/project/edit/'+id,
			// 		data: empData
			// 	} );
			// },
			//
			// deleteProject: function( id ) {
			// 	return $http( {
			// 		method: 'GET',
			// 		url: '/api/v1/project/delete/'+id,
			// 	} );
			// },

			saveProfile: function( data ) {
				return $http( {
					method: 'PUT',
					url: '/api/v1/users/'+data.userId,
					data: data
				} );
			},

			getUser: function( userId ) {
				return $http( {
					method: 'GET',
					url: '/api/v1/users/' + userId,
				} );
			},
		};
	}

	angular
		.module( 'app.user' )
		.service( 'UserDataService', UserDataService );

	/**
	 * @ngdoc Injector
	 * @name UserDataService
	 * @description
	 * User module service injection
	 * @module app.user
	 * @author Ideas2IT Technologies
	 */
	UserDataService.$inject = [ '$http' ];

} )();

( function() {
	'use strict';

	/**
	 * @ngdoc Service
	 * @name UserService
	 * @description main service http request and response handler
	 * @module app.user
	 * @author Ideas2IT Technologies
	 */
	function UserService( UserDataService, $localStorage ) {
		var _self = this;
		var user = {};

		/**
		 * @ngdoc Function
		 * @name _self.setUser
		 * @desc Set user data
		 * @param {object} user
		 */
		_self.setUser = function( usr ) {
			$localStorage.user = usr;
			user = usr;
		};

		/**
		 * @ngdoc Function
		 * @name _self.getSessionUser
		 * @desc Get user
		 * @return {object} user
		 */
		_self.getSessionUser = function() {
			return user;
		};

		/**
		 * @ngdoc Function
		 * @name _self.getUser
		 * @desc Get user object
		 * @return {object} user
		 */
		_self.getUser = function( userId ) {
			return UserDataService.getUser( userId );
		};

		/**
		 * @ngdoc Function
		 * @name _self.login
		 * @desc User login
		 * @param {object} user
		 */
		_self.login = function( user ) {
			return UserDataService.login( user );
		};


		/**
		 * @ngdoc Function
		 * @name _self.fblogin
		 * @desc User fblogin
		 */
		_self.fbLogin = function() {
			return UserDataService.fbLogin();
		};

		/**
		 * @ngdoc Function
		 * @name _self.fblogin
		 * @desc User fblogin
		 */
		_self.fbLoginCallback = function() {
			return UserDataService.fbLoginCallback();
		};

		/**
		 * @ngdoc Function
		 * @name _self.register
		 * @desc User register
		 * @param {object} user
		 */
		_self.register = function( user ) {
			return UserDataService.register( user );
		};

		/**
		 * @ngdoc Function
		 * @name _self.saveProfile
		 * @desc Save User Profile
		 * @param {object} user
		 */
		_self.saveProfile = function( user ) {
			return UserDataService.saveProfile( user );
		};

		/**
		 * @ngdoc Function
		 * @name _self.verifyEmail
		 * @desc User Email Verification
		 * @param {string} userId
		 */
		_self.verifyEmail = function( userId ) {
			return UserDataService.verifyEmail( userId );
		};

		/**
		 * @ngdoc Function
		 * @name _self.forgetPassword
		 * @desc User Forget Password
		 * @param {object} user
		 */
		_self.getEmpList = function() {
			return UserDataService.getEmpList();
		};
		_self.getProjectList = function() {
			return UserDataService.getProjectList();
		};

		/**
		 * @ngdoc Function
		 * @name _self.resetpassword
		 * @desc User Reset Password
		 * @param {object} user
		 */
		_self.updateEmp = function( id, empData  ) {
			return UserDataService.updateEmp(  id, empData  );
		};

		_self.deleteEmp = function( id ) {
			return UserDataService.deleteEmp(  id );
		};
		/**
		 * @ngdoc Function
		 * @name _self.isLoggedIn
		 * @desc Check if user logged in or not
		 */
		_self.isLoggedIn = function() {
			return $localStorage.user ? true : false;
		};

		/**
		 * @ngdoc Function
		 * @name _self.resetForm
		 * @desc To reset form
		 * @param form
		 */
		_self.resetForm = function( form ) {
			form.setPristine();
			form.setUntouched();
		};
	}

	angular
		.module( 'app.user' )
		.service( 'UserService', UserService );

	/**
	 * @ngdoc Injector
	 * @name UserService
	 * @description
	 * User module service injection
	 * @module app.user
	 * @author Ideas2IT Technologies
	 */
	UserService.$inject = [ 'UserDataService', '$localStorage' ];

} )();
