/******************************************/
/*  Tasks for build html files            */
/******************************************/
/*jslint browser: true, devel: true, node: true, nomen: true*/
/*global  angular, $ */
module.exports = function (config, gulp, concat, angularTemplates, log4js, minhtml) {
  "use strict";
  // Task for build front-end html files in development mode
  // build parameters:
  // build.src - source directory with html files
  // build.dst - destination directory
  gulp.task('build-dev-fe-html', function () {
    console.log('build-dev-fe-html');
    var src = process.cwd() + "/" + config.build.src + '**/*.html',
      dst = process.cwd() + "/" + config.build.src,
      atml = angularTemplates({
        module: config.core.appid
      });
    atml.on('error', function (e) {
      console.log(e);
      atml.end();
    });
    gulp.src(src)
      .pipe(atml)
      .pipe(concat('templates.js'))
      .pipe(gulp.dest(dst));
  });

  // Task for build front-end html files in production mode with minification
  // build parameters:
  // build.src - source directory with html files
  // build.dst - destination directory
  gulp.task('build-prod-fe-html', function () {
    var src = process.cwd() + "/" + config.build.src + '**/*.html',
      dst = process.cwd() + "/" + config.build.src,
      atml = angularTemplates({
        module: config.core.appid
      });
    atml.on('error', function (e) {
      console.log(e);
      atml.end();
    });
    gulp.src(src)
      .pipe(minhtml())
      .pipe(atml)
      .pipe(concat('templates.js'))
      .pipe(gulp.dest(dst));
  });

  // Task for build admin html files in development mode
  gulp.task('build-dev-adm-html', function () {
    console.log('build-dev-adm-html');
    var src = process.cwd() + "/source/admin/**/*.html",
      dst = process.cwd() + "/source/admin",
      atml = angularTemplates({
        module: config.core.appid
      });
    atml.on('error', function (e) {
      console.log(e);
      atml.end();
    });
    gulp.src(src)
      .pipe(atml)
      .pipe(concat('templates.js'))
      .pipe(gulp.dest(dst));
  });

  // Task for build admin html files in production mode with minification
  gulp.task('build-prod-adm-html', function () {
    var src = process.cwd() + "/" + config.build.src + '**/*.html',
      dst = process.cwd() + "/" + config.build.src,
      atml = angularTemplates({
        module: config.core.appid
      });
    atml.on('error', function (e) {
      console.log(e);
      atml.end();
    });
    gulp.src(src)
      .pipe(minhtml())
      .pipe(atml)
      .pipe(concat('templates.js'))
      .pipe(gulp.dest(dst));
  });
};