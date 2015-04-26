/***********************************************/
/*   command line utility to work with         */
/*   the project raving                        */
/***********************************************/
var program = require('commander');
var Zip = new require('node-zip');
var fs = require("fs");
var create = require("./create");
var develop = require("./develop");
module.exports = function (current) {
	program
		.version('0.2.0')
		.option('-C, --chdir <path>', 'change the working directory')
		.option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
		.option('-T, --no-tests', 'ignore test hook')
	
	/**********  Create empty project  **********/
	program
	.command('create [project]')
	.option("-a, --appname [appname]", "Customize you application name")
	.option("-m, --modules [modules]", "List of installed modules")
	.action(create);
	
	/**********  Start project on develop mode  **********/
	program
	.command('start')
	.action(develop);
	
	// TODO: command of build project in development mode
	
	program.parse(process.argv);
}


// Note

/*	program
		.command('setup [env]')
		.description('run setup commands for all envs')
		.option("-s, --setup_mode [mode]", "Which setup mode to use")
		.action(function(env, options){
			var mode = options.setup_mode || "normal";
			env = env || 'all';
			console.log('setup for %s env(s) with %s mode', env, mode);
		});

	program
		.command('exec <cmd>')
		.alias('ex')
		.description('execute the given remote cmd')
		.option("-e, --exec_mode <mode>", "Which exec mode to use")
		.action(function(cmd, options){
			console.log('exec "%s" using %s mode', cmd, options.exec_mode);
		}).on('--help', function() {
			console.log('  Examples:');
			console.log();
			console.log('    $ deploy exec sequential');
			console.log('    $ deploy exec async');
			console.log();
		});

	program
		.command('*')
		.action(function(env){
			console.log('deploying "%s"', env);
		});*/