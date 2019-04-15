var util = require('util');
var fs = require('fs');
var path = require('path');

var envName = "DEFAULT_CONFIG_RELOAD_NEVER_FOUND";
var configState = {};
var callback = null;

function configReload (param, options, cb) {
	if(!param || typeof param == "string"){

		callback = cb;
		return loadConfig(param, options);
	}else{
		return param;
	}
}

configReload.setEnvName = function(name){
	envName = name;
}

configReload.loadEnvSupport = false;

function loadConfig(param, options){

	var config = param;
  config = config || process.env[envName];
	options = options || {};

	if (typeof(config) === 'string') {
		
    var filename = getConfigFileName(config);
		if (options.reloadSecs) {

      // TODO
			initReloadConfiguration(filename, options);
		}

		config = loadConfigFromFile(filename);
	}

	return config;
}

function initReloadConfiguration(filename, options){
  if (configState.timerId) {
    clearInterval(configState.timerId);
    delete configState.timerId;
  }

  configState.filename = filename;
  configState.lastMTime = getMTime(filename);
  configState.timerId = setInterval(reloadConfiguration, options.reloadSecs*1000, options);
}

function loadConfigFromFile(filename){

  console.log(filename);

  if (filename) {
    return JSON.parse(fs.readFileSync(filename, "utf8"));
  }

  return null;
}

function reloadConfiguration(options) {
  var mtime = getMTime(configState.filename);
  if (!mtime) return;
  
  if (configState.lastMTime && (mtime.getTime() > configState.lastMTime.getTime())) {
    callback && callback(loadConfigFromFile(configState.filename));
  }
  configState.lastMTime = mtime;
}

function getConfigFileName(filename){

  var nodeEnv = process.env.NODE_ENV || '';
  if(configReload.loadEnvSupport && nodeEnv){

    var dirname = path.dirname(filename);
    var basename = path.basename(filename);

    return path.join(dirname, nodeEnv, basename);
  }

  return filename;
}

function getMTime(filename) {
  var mtime;
  try {
    mtime = fs.statSync(configState.filename).mtime;
  } catch (e) {
    console.error(e);
  }
  return mtime;
}

module.exports = configReload;
