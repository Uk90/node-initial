'use strict';

var baseDir = 'app';

module.exports = {

  //This is the list of file patterns to load into the browser during testing.
  files: [
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/angular-material/angular-material.min.js',
    'bower_components/angular-aria/angular-aria.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-sanitize/angular-sanitize.min.js',
    'bower_components/ngstorage/ngStorage.min.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/jquery-ui/jquery-ui.min.js',
    'bower_components/angular-breadcrumb/dist/angular-breadcrumb.min.js',
    'bower_components/angular-password/angular-password.min.js',
    'bower_components/toastr/toastr.min.js',
    'bower_components/moment/moment.js',
    'bower_components/angular-material-data-table/dist/md-data-table.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    baseDir + '/scripts/*.js',
    baseDir + '/scripts/landing/*.js',
    baseDir + '/scripts/logger/*.js',
    baseDir + '/scripts/user/*.js',
    baseDir + '/scripts/user/**/*.js',
    baseDir + '/scripts/menu/*.js',
    baseDir + '/scripts/menu/**/*.js',
    baseDir + '/scripts/dashboard/*.js',
    baseDir + '/scripts/dashboard/**/*.js',
    baseDir + '/scripts/admin/*.js',
    baseDir + '/scripts/admin/**/*.js',
    baseDir + '/scripts/feasibility/*.js',
    baseDir + '/scripts/feasibility/**/*.js',
    baseDir + '/scripts/subscription/*.js',
    baseDir + '/scripts/subscription/**/*.js',
    baseDir + '/scripts/settings/*.js',
    baseDir + '/scripts/settings/**/*.js',
    baseDir + '/test/unit/*.js',
    baseDir + '/test/unit/**/*.js'
  ],

  //used framework
  frameworks: ['jasmine'],

  plugins: [
    'karma-phantomjs-launcher',
    'karma-jasmine',
    'karma-html-reporter', // to print HTML Report
    'karma-spec-reporter' // to print console output
  ],

  preprocessors: {},

  reporters: ['html', 'spec'],

  htmlReporter: {
    outputDir: baseDir + '//test/unit-results/html'
  },

  autoWatch: true,

  colors: true,

  logLevel: 'info',

  //used browsers (overriding in some gulp task)
  browsers: ['PhantomJS']
};
