/******************************************/
/*  Tasks for build less files            */
/******************************************/
/*jslint browser: true, devel: true, node: true, nomen: true*/
/*global  angular, $ */
module.exports = function (config, gulp, less, path, clCss, log4js) {
  "use strict";
  // Build less from front-end template
  // build parameters:
  // build.src - source directory with style.less file
  // build.dst - destination directory
  gulp.task('build-dev-fe-less', function () {
    console.log('build-dev-fe-less');
    var paths = process.cwd() + "/" + config.build.src,
      src = process.cwd() + "/" + config.build.src + 'style.less',
      dst = process.cwd() + "/" + config.build.dst,
      lss = less({
        paths: [path.join(paths, 'less', 'includes')]
      });
    lss.on('error', function (e) {
      console.log(e);
      lss.end();
    });
    gulp.src(src)
      .pipe(lss)
      .pipe(gulp.dest(dst));
  });

  // Build less from admin panel template
  gulp.task('build-dev-adm-less', function () {
    console.log('build-dev-adm-less');
    var paths = process.cwd() + "/source/admin/",
      src = process.cwd() + "/source/admin/style.less",
      dst = process.cwd() + "/www/admin/",
      lss = less({
        paths: [path.join(paths, 'less', 'includes')]
      });
    lss.on('error', function (e) {
      console.log(e);
      lss.end();
    });
    gulp.src(src)
      .pipe(lss)
      .pipe(gulp.dest(dst));
  });

  // TODO: tasks for production build with minificatuin css files
  //cleancss = new LessPluginCleanCSS({ advanced: true })

};