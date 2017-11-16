(function() {
  'use strict';

  //to execute assertion library test
  describe('app module assertion', function() {
    var module;
    var deps;

    beforeEach(function() {
      module = angular.module('app');
      deps = module.value('app').requires;
    });

    //Check if main app module registered
    it('sorting the list of main module injections', function() {
      //Injected modules
      var appModules = [
        'ui.router',
        'ngMaterial',
        'ngSanitize',
        'ui.bootstrap',
        'ngStorage',
        'ncy-angular-breadcrumb',
        'ngPassword',
        'md.data.table',
        'app.landing',
        'app.logger',
        'app.user',
        'app.menu',
        'app.dashboard',
        'app.admin',
        'app.feasibility',
        'app.subscription',
        'app.settings'];
      expect(deps).toEqual(appModules);
    });

  });
})();
