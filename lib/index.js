/***********************************************/
/*   command line utility to work with         */
/*   the project raving                        */
/***********************************************/
/*jslint browser: true, devel: true, node: true, nomen: true*/
/*global  angular, $ */
var program = require('commander'),
  fs = require("fs"),
  create = require("./create"),
  develop = require("./develop");
module.exports = function (current) {
  "use strict";
  program
    .version('0.2.0')
    .option('-C, --chdir <path>', 'change the working directory')
    .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
    .option('-T, --no-tests', 'ignore test hook');

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
};