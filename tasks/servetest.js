/*jslint browser: true, devel: true, node: true, nomen: true*/
/*global  angular, $ */
module.exports = function (config, gulp, mocha, jshint, stylish, watch) {
  "use strict";
  gulp.task('lint', function () {
    return gulp.src(watch.js)
      /**
       * First, we pipe our files through `jshint`
       */
      .pipe(jshint())
      /**
       * Then we'll pipe the results through the
       * `jshint-stylish` module which will output
       * the results of `jshint` to the console in
       * a human friendly format.
       */
      .pipe(jshint.reporter(stylish));
      /**
       * Finally, we want `jshint` to terminate the
       * gulp task when it finds an error. This way
       * our tests won't run unless `jshint` passes.
       * To do this we'll pipe the results into the
       * `fail` reporter.
       */
      //.pipe(jshint.reporter('fail'));
  });
  
  gulp.task('serve-test', ['lint'], function () {
    /**
     * Set `read` to false so gulp passes the file
     * references straight to mocha without reading 
     * them. This will help speed things up.
     */
    return gulp.src(watch.js, { read: false })
      /**
       * Let's pipe all of the JavaScript files
       * in our test folder into Mocha. Mocha
       * also has various reporters available.
       * I prefer `spec`, but feel free to choose
       * the one you like best.
       */
      .pipe(
        mocha({
          reporter: 'spec'
        })
      );
  });
};