

// var path = require('path');
// var a = path.basename('./config.json', '.json');
// console.log(a);
// return;

var load = require('../index');

process.env.NODE_ENV = "develop";
console.log(process.env.NODE_ENV);

var option = {
	name: 'test config reload'
};

var o = load(option);

o.name == option.name ? console.log('ok') : console.error('fail');
load.loadEnvSupport = false;
o = load('../config.json');
o.name == "json" ? console.log('ok') : console.error('fail');

process.env.TEST_NAME = "./config.json";

load.setEnvName("TEST_NAME");
o = load();
o.name == "json" ? console.log('ok') : console.error('fail');

delete process.env.TEST_NAME;

o = load();
(o && o.name == "json") ? console.log('ok') : console.error('fail');