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
