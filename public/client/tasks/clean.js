/*===========================================================
 GULP : APP TASKS :: Remove and clean build folder
===========================================================*/

'use strict';

var gulp = require( 'gulp' );
var del = require( 'del' );

var config = require( './config' );

//Clean build path
gulp.task( 'clean', function() {
	console.log( config.notify.update( '\n--------- Clean:Build Folder ------------------------------------------\n' ) );
	del( '../../build/', function() {
		console.log( config.notify.update( 'All are files deleted from the build folder' ) );
	} );
} );


//Clean test path
gulp.task( 'clean:test', function() {
	console.log( config.notify.update( '\n--------- Clean:Test Folder ------------------------------------------\n' ) );

	del( 'app/test/unit-results/', function( err ) {
		console.log( config.notify.update( 'Unit test folder cleaned' ) );
	} );
} )
