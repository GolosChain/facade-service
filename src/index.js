const core = require('gls-core-service');

core.utils.serviceMeta.set('name', require('../package.json').name);
core.utils.defaultStarter(require('./Main'));
