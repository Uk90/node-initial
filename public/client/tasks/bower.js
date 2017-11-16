/*==========================================================
 GULP: APP TASKS :: Bower file include
===========================================================*/

'use strict';

var gulp = require( 'gulp' ),
	bower = require( 'bower' ),
	concat = require( 'gulp-concat' ),
	config = require( './config' );

// TASKS
gulp.task( 'bower', function( cb ) {
	console.log( config.notify.update( '\n--------- Installing Bower Components --------------------------------------------\n' ) );
	bower.commands.install( [], {
			save: true
		}, {} )
		.on( 'end', function() {
			cb();
		} );
} );

//gulp scripts task which compress and hint all application js files
gulp.task( 'bundle-libraries', [ 'bower' ], function() {
	console.log( config.notify.update( '\n--------- Running Bower tasks -----------------------------------------\n' ) );
	return gulp.src( config.source.libs )
		.pipe( concat( 'bower.js' ) )
		.pipe( gulp.dest( config.build.js ) );
} );
