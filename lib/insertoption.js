/***********************************************/
/*   Replace stop-words for options parameters */
/*   on create project                         */
/***********************************************/
/*jslint browser: true, devel: true, node: true, nomen: true*/
/*global  angular, $ */
module.exports = {
  // insert project name
  // params:
  // file - content of file
  // project - project name
  projectname: function (file, project) {
    "use strict";
    file._data = file._data.replace('<<<ProjectName>>>', project.charAt(0).toUpperCase() + project.slice(1));
  },
  // insert of module dependencies in package.json
  // params:
  // file - content of file
  // modulelist - list of enabled standart modules
  // TODO: list the modules in a separate file
  dependencies: function (file, modulelist) {
    "use strict";
    var modules = '"raving.core": "git+ssh://git@gitlab.com:serpteam/raving.core.git"';
    if (modulelist && modulelist.indexOf('profile') > -1) {
      modules += ',\n\t\t"raving.profile": "git+ssh://git@gitlab.com:serpteam/raving.profile.git"';
    }
    file._data = file._data.replace('<<<dependencies>>>', modules);
  },
  // insert of require(module) in module.js
  // params:
  // file - content of file
  // modulelist - list of enabled standart modules
  // TODO: list the modules in a separate file
  modules: function (file, modulelist) {
    "use strict";
    var modules = "";
    if (modulelist && modulelist.indexOf('profile') > -1) {
      modules += '\n\t\trequire("raving.profile")(options);';
    }
    file._data = file._data.replace('<<<modules>>>', modules);
  },
  // insert of module standart configs in config.js
  // params:
  // file - content of file
  // modulelist - list of enabled standart modules
  // TODO: list the modules in a separate file
  modulesconfig: function (file, modulelist) {
    "use strict";
    var modules = "// default modules configuration\n";
    if (modulelist && modulelist.indexOf('profile') > -1) {
      modules += 'config.modules.profile = {} ;\n';
    }
    file._data = file._data.replace('<<<modulescongif>>>', modules);
  }
};
