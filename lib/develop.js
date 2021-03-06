/***********************************************/
/*   Start raving project in develop mode      */
/*   options(JSON) - parameters of create      */
/***********************************************/
/*jslint browser: true, devel: true, node: true*/
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var ngAnnotate = require('gulp-ng-annotate');
var log4js = require('log4js');
var uglify = require('gulp-uglify');
var through = require('through2');
var concat = require('gulp-concat');
var angularTemplates = require('gulp-angular-templates');
var minhtml = require('gulp-minify-html');
var less = require('gulp-less');
var path = require('path');
var clCss = require('less-plugin-clean-css');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jslint = require('gulp-jslint');

module.exports = function (options) {
  "use strict";
  var pwd = process.cwd(),
    // get project config
    config = require(pwd + '/config'),
    // calculate watch files lists;
    watch = {
      html: [
        process.cwd() + "/" + config.build.src + '**/*.html'
      ],
      admhtml: [
        process.cwd() + "/source/admin/**/*.html"
      ],
      less: [
        process.cwd() + "/" + config.build.src + '**/*.less'
      ],
      admless: [
        process.cwd() + "/source/admin/**/*.less"
      ],
      js: [
        process.cwd() + "/" + config.build.src + '**/*.js',
        process.cwd() + "/node_modules/raving.*/**/*.js",
        process.cwd() + "/custom_modules/**/**/*.js"
      ],
      admjs: [
        process.cwd() + "/admin/**/*.js",
        process.cwd() + "/node_modules/raving.*/**/*.js",
        process.cwd() + "/custom_modules/**/**/*.js"
      ],
      srv: [
        process.cwd() + "/" + config.build.dst + '**/*.js'
      ],
      test: [
        process.cwd() + "/test/**/*.js"
      ]
    };

  // include child scripts
  require('../tasks/buildjs')(config, gulp, browserify, ngAnnotate, log4js, uglify, through);
  require('../tasks/buildhtml')(config, gulp, concat, angularTemplates, log4js, minhtml);
  require('../tasks/buildless')(config, gulp, less, path, clCss, log4js);
  require('../tasks/serve')(config, gulp, nodemon, log4js, watch);
  require('../tasks/servetest')(config, gulp, mocha, jslint, watch);


  // start raving sserver
  gulp.start('serve-dev');

  // build fe files
  gulp.start('build-dev-fe-html');
  gulp.start('build-dev-adm-html');
  gulp.start('build-dev-fe-less');
  gulp.start('build-dev-adm-less');
  gulp.start('build-dev-fe-js');
  gulp.start('build-dev-adm-js');
  gulp.start('serve-test');

  // run watchers
  gulp.watch([watch.srv, watch.test], ['serve-test']);


  gulp.watch(watch.js, ['build-dev-fe-js']);
  gulp.watch(watch.admjs, ['build-dev-adm-js']);
  gulp.watch(watch.html, ['build-dev-fe-html']);
  gulp.watch(watch.admhtml, ['build-dev-adm-html']);
  gulp.watch(watch.less, ['build-dev-fe-less']);
  gulp.watch(watch.admless, ['build-dev-adm-less']);


  console.log("Start on develop");
};