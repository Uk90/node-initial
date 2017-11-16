/*===========================================================
 GULP : APP TASKS :: CSS & SASS -- minify, concat
===========================================================*/
'use strict';

var gulp = require( 'gulp' );
var gulploadPlugins = require( 'gulp-load-plugins' );
var autoprefixer = require( 'gulp-autoprefixer' );
var sassLint = require( 'gulp-sass-lint' );
var cleanCSS = require( 'gulp-clean-css' );
var plugins = gulploadPlugins();

var config = require( './config' );
var sassLintConfig = require( '../.sass-lint.config' );

//comvert sass to to css
gulp.task( 'sass', [ 'sass-lint' ], function() {
	console.log( config.notify.update( '\n--------- Running SASS Compress -------------------------------------------' ) );
	return gulp.src( config.source.scssPath + '/importer.scss' )
		.pipe( plugins.sass( {
			includePaths: require( 'flexed' ).includePaths
		} ) )
		.pipe( plugins.concat( 'style.css' ) )
		.pipe( plugins.size() )
		.pipe( gulp.dest( config.source.cssPath ) );
} );

//sass lint which shows linting of sass
gulp.task( 'sass-lint', function() {
	console.log( config.notify.update( '\n--------- Running SASS Lint -------------------------------------------' ) );
	return gulp.src( [ config.source.scss + '/*.scss' ] )
		.pipe( sassLint( {
			rules: sassLintConfig,
			files: {
				ignore: config.source.scss + '/importer.scss'
			},
		} ) )
		.pipe( sassLint.format() )
		.pipe( sassLint.failOnError() );
} );

// gulp styles task which compress all css into single css
gulp.task( 'styles', [ 'sass' ], function() {
	console.log( config.notify.update( '\n--------- Running CSS tasks --------------------------------------------\n' ) );
	return gulp.src( config.source.css )
		.pipe( autoprefixer( {
			browsers: config.browserVersion,
			cascade: false
		} ) )
		.pipe( plugins.concat( 'master.css' ) )
		.pipe( plugins.size() )
		.pipe( gulp.dest( config.build.css ) );
} );

gulp.task( 'minify-css', function() {
	console.log( config.notify.update( '\n--------- Running Minify-CSS tasks --------------------------------------------\n' ) );
	return gulp.src( [ config.build.css + '/*.css' ] )
		.pipe( cleanCSS( {
			debug: true
		} ) )
		.pipe( plugins.concat( 'master.min.css' ) )
		.pipe( gulp.dest( config.build.css ) );
} );
