/*===========================================================
 GULP : APP TASKS :: Injector task
===========================================================*/

'use strict';

var gulp = require( 'gulp' );
var inject = require( 'gulp-inject' );

var config = require( './config' );
var injectOpt = {
	ignorePath: '../build/'
};

// Inject task for development
gulp.task( 'dev-inject', function() {
	console.log( config.notify.update( '\n--------- Running Injector tasks ------------------------------------------\n' ) );
	gulp.src( 'app/index.html' )
		.pipe( inject( gulp.src( config.build.filePath.js, {
			read: false
		} ), injectOpt ) )
		.pipe( inject( gulp.src( config.build.filePath.css, {
			read: false
		} ), injectOpt ) )
		.pipe( gulp.dest( config.build.root + '/' ) );
} );

// Inject task for production
gulp.task( 'prod-inject', function() {
	console.log( config.notify.update( '\n--------- Running Injector tasks ------------------------------------------\n' ) );
	gulp.src( 'app/index.html' )
		.pipe( inject( gulp.src( config.build.filePath.minJs, {
			read: false
		} ), injectOpt ) )
		.pipe( inject( gulp.src( [ config.build.css + '/*.min.css' ], {
			read: false
		} ), injectOpt ) )
		.pipe( gulp.dest( config.build.root + '/' ) );
} );
