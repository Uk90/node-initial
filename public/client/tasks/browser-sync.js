/*==========================================================
 GULP: APP TASKS :: Browser sync to sync with browser
===========================================================*/
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('./config');

//browser sync
gulp.task('browser-sync', function() {
    browserSync.init([config.build.root + '*/*.*', config.build.root + '**/*.*'], {
        server: {
            baseDir: './build'
        }
    });
});
