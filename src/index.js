require('babel-polyfill')

var page = require('page');
var moment = require('moment');

require('moment/locale/es');

moment.locale('es');

require('./home');
require('./signup');
require('./signin');
require('./user-page');
require('./footer');

page();
