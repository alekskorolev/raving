/******************************************/
/*  Tasks for build js files              */
/*jslint browser: true, devel: true, node: true, nomen: true*/
/*global  angular, $ */
module.exports = function (config, gulp, browserify, ngAnnotate, log4js, uglify, through) {
  "use strict";
  // uglify configuration for production build
  var ugconfig = {
    sequences: true, // join consecutive statemets with the “comma operator”
    properties: true, // optimize property access: a["foo"] → a.foo
    dead_code: true, // discard unreachable code
    drop_debugger: true, // discard “debugger” statements
    unsafe: false, // some unsafe optimizations (see below)
    conditionals: true, // optimize if-s and conditional expressions
    comparisons: true, // optimize comparisons
    evaluate: true, // evaluate constant expressions
    booleans: true, // optimize boolean expressions
    loops: true, // optimize loops
    unused: true, // drop unused variables/functions
    if_return: true, // optimize if-s followed by return/continue
    join_vars: true, // join var declarations
    cascade: true, // try to cascade `right` into `left` in sequences
    side_effects: true, // drop side-effect-free statements
    warnings: true, // warn about potentially dangerous optimizations/code
    global_defs: {}
  };


  // Task for build front-end js files in development mode
  // build parameters:
  // build.src - source directory with index.js file
  // build.dst - destination directory
  gulp.task('build-dev-fe-js', function () {
    console.log('build-dev-fe-js');
    var src = process.cwd() + "/" + config.build.src + 'index.js',
      dst = process.cwd() + "/" + config.build.dst,
    // Single entry point to browserify
      brsf = browserify({
        insertGlobals: true,
        debug: true
      });
    brsf.on('error', function (e) {
      console.log(e);
      brsf.end();
    });

    gulp.src(src)
      .pipe(brsf)
      .pipe(gulp.dest(dst));
  });

  // Task for build front-end js files in production mode
  // with minification
  // build parameters:
  // build.src - source directory with index.js file
  // build.dst - destination directory
  gulp.task('build-prod-fe-js', function () {
    var src = process.cwd() + "/" + config.build.src + 'index.js',
      dst = process.cwd() + "/" + config.build.dst,
    // Single entry point to browserify
      brsf = browserify({
        insertGlobals: true,
        debug: false
      });
    brsf.on('error', function (e) {
      console.log(e);
      brsf.end();
    });

    gulp.src(src.js + 'index.js')
      .pipe(brsf)
      .pipe(ngAnnotate())
      .pipe(uglify(ugconfig))
      .pipe(gulp.dest(dst.js));
  });

  // Task for build admin js files in development mode
  gulp.task('build-dev-adm-js', function () {
    console.log('build-dev-adm-js');
    var src = process.cwd() + "/source/admin/index.js",
      dst = process.cwd() + "/www/admin",
    // Single entry point to browserify
      brsf = browserify({
        insertGlobals: true,
        debug: true
      });
    brsf.on('error', function (e) {
      console.log(e);
      brsf.end();
    });

    gulp.src(src)
      .pipe(brsf)
      .pipe(gulp.dest(dst));
  });

  // Task for build admin js files in production mode
  gulp.task('build-prod-adm-js', function () {
    var src = process.cwd() + "/source/admin/index.js",
      dst = process.cwd() + "/www/admin",
    // Single entry point to browserify
      brsf = browserify({
        insertGlobals: true,
        debug: false
      });
    brsf.on('error', function (e) {
      console.log(e);
      brsf.end();
    });

    gulp.src(src.js + 'index.js')
      .pipe(brsf)
      .pipe(ngAnnotate())
      .pipe(uglify(ugconfig))
      .pipe(gulp.dest(dst.js));
  });

};
