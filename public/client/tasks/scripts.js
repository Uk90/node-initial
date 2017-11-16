/*===========================================================
 GULP: APP TASKS :: Script -- js hint, uglify & concat
===========================================================*/

'use strict';

var gulp = require( 'gulp' );
var jshint = require( 'gulp-jshint' );
var uglify = require( 'gulp-uglify' );
var concat = require( 'gulp-concat' );

var config = require( './config' );

//gulp scripts task which compress all application js files
gulp.task( 'jshint', function() {
	console.log( config.notify.update( '\n--------- Running JSHINT tasks -----------------------------------------\n' ) );
	return gulp.src( [ config.source.js + '/*.js', config.source.js + '/**/*.js' ] )
		// .pipe( jshint( '.jshintrc' ) )
		.pipe( jshint.reporter() )
		.pipe( jshint.reporter( 'fail' ) );
} );

//gulp scripts task which compress all application js files
gulp.task( 'scripts', [ 'jshint' ], function() {
	console.log( config.notify.update( '\n--------- Running SCRIPT tasks -----------------------------------------\n' ) );
	return gulp.src( [ config.source.js + '/*.js', config.source.js + '/**/*.js' ] )
		.pipe( concat( 'application.js' ) )
		.pipe( gulp.dest( config.build.js ) );
} );

//gulp task which compress all js files
gulp.task( 'uglify-scripts', function() {
	console.log( config.notify.update( '\n--------- Running minify all scripts tasks -----------------------------\n' ) );
	return gulp.src( config.build.filePath.js )
		.pipe( uglify() )
		.pipe( concat( 'application.min.js' ) )
		.pipe( gulp.dest( config.build.js ) );
} );
