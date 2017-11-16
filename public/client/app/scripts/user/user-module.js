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
