/*===========================================================
 GULP: APP TASKS :: Images minification
===========================================================*/
'use strict';

var gulp = require( 'gulp' );
var imagemin = require( 'gulp-imagemin' );
var svgSprite = require( 'gulp-svg-sprites' );
var config = require( './config' );

//Image minification
gulp.task( 'image', [ 'sprites' ], function() {
	gulp.src( config.source.images + '/*' )
		.pipe( imagemin() )
		.pipe( gulp.dest( config.build.images ) );
} );

//SVG image sprites
gulp.task( 'sprites', function() {
	return gulp.src( [ config.source.images + '/*.svg', config.source.images + '/**/*.svg' ] )
		.pipe( svgSprite() )
		.pipe( gulp.dest( config.build.images + '/svg/' ) );
} );
