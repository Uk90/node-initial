/*===========================================================
 GULP : APP TASKS :: Start server and live reload
===========================================================*/
'use strict';

var gulp = require( 'gulp' );
var gulploadPlugins = require( 'gulp-load-plugins' );

var plugins = gulploadPlugins();
var config = require( './config' );
var portScanner = require( 'portscanner' );

//gulp server
gulp.task( 'server', function() {
	console.log( config.notify.update( '\n--------- Server started at http://192.168.1.11:' + config.serverConfiguration.port + ' ------------------------\n' ) );
	var serverPort = config.serverConfiguration.port;
	portScanner.findAPortNotInUse( serverPort, serverPort + 10, config.serverIP, function( error, port ) {
		config.serverConfiguration.port = port;
		var lrPort = config.serverConfiguration.livereload.port;
		portScanner.findAPortNotInUse( lrPort, lrPort + 10, config.serverIP, function( error, port ) {
			config.serverConfiguration.livereload.port = port;
			return gulp.src( '../build' )
				.pipe( plugins.webserver( config.serverConfiguration ) );
		} );
	} );
} );
