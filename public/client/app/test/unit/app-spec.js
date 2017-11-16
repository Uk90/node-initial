(function() {
  'use strict';

  //app module unit test
  describe('Main app module', function() {
    var module;
    var deps;

    var hasModule = function(m) {
      return deps.indexOf(m) >= 0;
    };

    beforeEach(function() {
      module = angular.module('app');
      deps = module.value('app').requires;
    });

    //Check if main app module registered
    it('app module should be registered', function() {
      expect(module).not.toEqual(null);
    });

    //Check if ui.router is injected as dependency
    // it('should have ui.router as a dependency', function() {
    //   expect(hasModule('ui.router')).toEqual(true);
    // });

  });
})();
