/*===========================================================
 GULP : APP TASKS :: FONTS
===========================================================*/
'use strict';

var gulp = require( 'gulp' );
var gulploadPlugins = require( 'gulp-load-plugins' );
var ttf2woff = require( 'gulp-ttf2woff' );

var plugins = gulploadPlugins();
var config = require( './config' );

//gulp fonts task
gulp.task( 'fonts', [ 'ttf2woff' ], function() {
	return gulp.src( [ config.source.fonts + '/*.*', config.source.fonts + '/**/*.*' ] )
		.pipe( plugins.size() )
		.pipe( gulp.dest( config.build.fonts ) );
} );

//gulp ttf2woff task
gulp.task( 'ttf2woff', function() {
	console.log( config.notify.update( '\n--------- Running Fonts tasks --------------------------------------------\n' ) );
	gulp.src( [ config.source.fonts + '/*.ttf', config.source.fonts + '/*.otf' ] )
		.pipe( ttf2woff() )
		.pipe( gulp.dest( config.build.fonts + '/ttf2woff/' ) );
} );
