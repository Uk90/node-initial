'use strict';

var chalk = require('chalk');

/*-----------------------------------------------------------
 GULP: APP CONFIGURATION
 Source, Build folder and other application configuration
-----------------------------------------------------------*/
var config = function() {

    // Source Path
    var src = {
        root: 'app',
        cssPath: 'app/assets/css',
        scssPath: 'app/assets/scss',
        css: [
            'app/assets/css/style.css',
            //'app/assets/css/full_version.css',
            // 'app/assets/css/material.indigo-pink.min.css',
            // 'app/assets/css/font-awesome.min.css',
            'bower_components/toastr/toastr.min.css',
            'bower_components/mdDataTable/dist/md-data-table-style.css'
        ],
        scss: [
            'app/assets/scss/*.scss',
            'bower_components/angular-material/angular-material.scss'
        ],
        js: 'app/scripts',
        images: 'app/assets/images',
        fonts: 'app/assets/fonts',
        bower: './bower_components',
        libs: [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-material/angular-material.min.js',
            'bower_components/angular-aria/angular-aria.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/ngstorage/ngStorage.min.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery-ui/jquery-ui.min.js',
            'bower_components/toastr/toastr.min.js',
            'bower_components/angular-material-icons/angular-material-icons.min.js',
            'bower_components/libs/google-place-api.js',
            'bower_components/angular-password/angular-password.min.js',
            'bower_components/moment/min/moment.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/lodash/lodash.min.js',
            'bower_components/mdDataTable/dist/md-data-table-templates.js',
            'bower_components/mdDataTable/dist/md-data-table.js',
            'bower_components/satellizer/dist/satellizer.min.js',
            'bower_components/highcharts/highcharts.js',
            'bower_components/ng-csv/build/ng-csv.min.js',
            'bower_components/ang-accordion/js/ang-accordion.js'
        ],
        zip: './zip'
    };

    // Build Path
    var build = {
        root: '../build',
        css: '../build/assets/css',
        js: '../build/js',
        images: '../build/assets/images',
        fonts: '../build/assets/fonts',
        filePath: {
            js: [
                '../build/js/bower.js',
                '../build/js/application.js',
                '../build/js/templates.js'
            ],
            minJs: [
                '../build/js/application.min.js',
            ],
            css: [
                '../build/assets/css/master.css'
            ]
        }
    };

    //Server Configuration
    var serverConfiguration = {
        host: 'localhost',
        port: 3002,
        open: true,
        livereload: {
            enable: true,
            port: 35729
        }
    };

    //Default production mode set to false
    var production = false;

    //Bower Configuration
    var bowerConfiguration = {
        paths: {
            bowerDirectory: src.bower,
            bowerrc: '.bowerrc',
            bowerJson: 'bower.json'
        }
    };

    // Minification options for HTML
    var opts = {
        comments: false,
        quotes: true,
        spare: true,
        empty: true,
        cdata: true
    };

    // Chalk config
    var notify = {
        error: chalk.red.bold,
        warning: chalk.black.bold.bgYellow,
        update: chalk.yellow.underline,
        success: chalk.green
    };

    // CSS autoprefix config
    var browserVersion = ['last 2 versions'];

    return {
        source: src,
        build: build,
        serverConfiguration: serverConfiguration,
        production: production,
        bowerConfiguration: bowerConfiguration,
        opts: opts,
        notify: notify,
        browserVersion: browserVersion,
        serverIP: '127.0.0.1'
    };
};

module.exports = config();
