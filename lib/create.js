/***********************************************/
/*   Create new raving progect                 */
/*   progect(String) - name of new project     */
/*   options(JSON) - parameters of create      */
/***********************************************/
/*jslint browser: true, devel: true, node: true, nomen: true*/
/*global  angular, $ */
var Zip = require('node-zip'),
  fs = require("fs"),
  insert = require('./insertoption');
module.exports = function (project, options) {
  "use strict";
  //console.log(process.cwd());
  // Read archive of ditrib
  if (options.appname) {
    console.log(options);
  }
  var zip, err, arc, filename, dirs;
  // get archive with base project structure
  arc = fs.readFileSync(__dirname + '/../distr/raving.zip');
  zip = new Zip(arc, {
    base64: false,
    checkCRC32: true
  });

  // Archive of the distribution can not be read, please reinstall the raving
  if (!zip.files) {
    err = new Error('Archive of the distribution can not be read, please reinstall the raving');
    throw err;
  }

  // create project directory in current directory
  fs.mkdirSync(process.cwd() + '/' + project);

  // foreach archive files
  for (filename in zip.files) {
    if (zip.files.hasOwnProperty(filename)) {
      dirs = filename.split('/');
      // check if file is directory, create it
      if (dirs[dirs.length - 1] === '') {
        fs.mkdirSync(process.cwd() + '/' + project + '/' + filename);
      } else {
        /* modify files with creation options*/
        switch (filename) {
        case 'README.md':
          insert.projectname(zip.files[filename], project);
          break;
        case 'package.json':
          insert.projectname(zip.files[filename], project);
          insert.dependencies(zip.files[filename], options.modules);
          break;
        case 'modules.js':
          insert.modules(zip.files[filename], options.modules);
          break;
        case 'config.js':
          insert.modulesconfig(zip.files[filename], options.modules);
          break;
        }
        // write file in project directory
        fs.writeFileSync(process.cwd() + '/' + project + '/' + filename, zip.files[filename]._data, {
          encoding: 'binary'
        });
      }
    }
  }

  console.log('Project %s created successfuly', project);
  console.log('Now you can go to the project directory and run it.');
  console.log();
  console.log('Type it:');
  console.log('# cd %s', project);
  console.log('# raving start');

};