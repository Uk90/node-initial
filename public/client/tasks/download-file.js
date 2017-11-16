/*===========================================================
 GULP : APP TASKS :: Download external file paths
===========================================================*/

'use strict';
var gulp = require( 'gulp' );
var download = require( 'gulp-download-stream' );
var config = require( './config' );
gulp.task( 'download-files', function() {
	download( [ {
			file: 'google-place-api.js',
			url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBVd61oDRmrbcz67mRdmBDX7Nc4dXmsxQA&sensor=false&libraries=places'
		} ] )
		.pipe( gulp.dest( config.source.bower + '/libs/' ) );
} );
