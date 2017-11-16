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
