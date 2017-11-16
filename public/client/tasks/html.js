/*===========================================================
 GULP : APP TASKS :: HTML -- Minify html
===========================================================*/
'use strict';

var gulp = require( 'gulp' );
var htmlmin = require( 'gulp-htmlmin' );
var htmllint = require( 'gulp-htmllint' );
var html2js = require( 'gulp-html2js' );
var config = require( './config' );

//gulp html task minify and convert into js
gulp.task( 'templates', function() {
	console.log( config.notify.update( '\n--------- Running HTML to JS tasks ------------------------------------------\n' ) );
	gulp.src( [ config.source.root + '/*.html', config.source.root + '/**/*.html' ] )
		.pipe( htmlmin( {
			collapseWhitespace: true
		} ) )
		.pipe( html2js( 'templates.js', {
			adapter: 'angular',
			base: 'templates',
			name: 'app'
		} ) )
		.pipe( gulp.dest( config.build.js ) );
} );

//gulp html lint task to test html code standards
gulp.task( 'htmllint', function() {
	console.log( config.notify.update( '\n--------- Running Html-Lint tasks ------------------------------------------\n' ) );
	return gulp.src( [ config.source.root + '/*.html', config.source.root + '/scripts/**/*.html' ] )
		.pipe( htmllint( {
			rules: {
				'attr-name-style': false,
				'attr-req-value': '',
				'id-class-style': false
			}
		} ) );
} );
