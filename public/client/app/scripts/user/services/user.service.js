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
