/***********************************************/
/*   Replace stop-words for options parameters */
/*   on create project                         */
/***********************************************/
module.exports = {
	// insert project name
	// params:
	// file - content of file
	// project - project name
	projectname: function (file, project) {
		file._data = file._data.replace('<<<ProjectName>>>', project.charAt(0).toUpperCase() + project.slice(1));
	},
	// insert of module dependencies in package.json
	// params:
	// file - content of file
	// modulelist - list of enabled standart modules
	// TODO: list the modules in a separate file
	dependencies: function(file, modulelist) {
		var modules = '"raving.core": "git+ssh://git@gitlab.com:serpteam/raving.core.git"';
		if (modulelist && modulelist.indexOf('profile')>-1) modules += ',\n\t\t"raving.profile": "git+ssh://git@gitlab.com:serpteam/raving.profile.git"';
		file._data = file._data.replace('<<<dependencies>>>', modules);
	},
	// insert of require(module) in module.js
	// params:
	// file - content of file
	// modulelist - list of enabled standart modules
	// TODO: list the modules in a separate file
	modules: function(file, modulelist) {
		var modules = "";
		if (modulelist && modulelist.indexOf('profile')>-1) modules += '\n\t\trequire("raving.profile")(options);';
		file._data = file._data.replace('<<<modules>>>', modules);
	},
	// insert of module standart configs in config.js
	// params:
	// file - content of file
	// modulelist - list of enabled standart modules
	// TODO: list the modules in a separate file
	modulesconfig: function(file, modulelist) {
		var modules = "// default modules configuration\n";
		if (modulelist && modulelist.indexOf('profile')>-1) modules += 'config.modules.profile = {} ;\n';
		file._data = file._data.replace('<<<modulescongif>>>', modules);
	}
}
// Note
/*    "raving.core": "git+ssh://git@gitlab.com:serpteam/raving.core.git",
    "raving.kadry": "git+ssh://git@gitlab.com:serpteam/raving.kadry.git",
    "raving.market": "git+ssh://git@gitlab.com:serpteam/raving.market.git",
    "raving.profiles": "git+ssh://git@gitlab.com:serpteam/raving.profiles.git",
    "raving.feedback": "git+ssh://git@gitlab.com:serpteam/raving.feedback.git",
    "raving.bootstrapmodule": "git+ssh://git@gitlab.com:serpteam/raving.bootstrapmodule.git",
    "raving.comments": "git+ssh://git@gitlab.com:serpteam/raving.comments.git",
    "raving.rating": "git+ssh://git@gitlab.com:serpteam/raving.rating.git",
    "raving.kladr": "git+ssh://git@gitlab.com:serpteam/raving.kladr.git"*/