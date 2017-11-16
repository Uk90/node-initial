/*===========================================================
 GULP : APP TASKS :: test:Unit
===========================================================*/
'use strict';

var gulp = require('gulp');
var karmaConfig = require('./karma.config.js');
var karma = require('karma').server;
var lodesh = require('lodash');
var config = require('./config');

//run unit tests and exit
gulp.task('test:unit', ['clean:test'], function(cb) {

  console.log(config.notify.update('\n--------- Running Unit test------------------------------------------\n'));

  karma.start(lodesh.assign({}, karmaConfig, {
    singleRun: false
  }), function() {
    cb();
  });
});
