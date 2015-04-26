/***********************************************/
/*   start node server in development mode     */
/***********************************************/
module.exports = function (config, gulp, nodemon, log4js, watch) {
	gulp.task('serve-dev', function (cb) {
		var srv = process.cwd()+"/server/app.js";
    nodemon({
			script  : srv,
			watch   : watch.srv
			//...add nodeArgs: ['--debug=5858'] to debug
			//..or nodeArgs: ['--debug-brk=5858'] to debug at server start
		});
	});
}
