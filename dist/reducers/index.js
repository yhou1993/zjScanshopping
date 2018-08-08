'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authReducer = require('./authReducer');

var _authReducer2 = _interopRequireDefault(_authReducer);

var _notificationReducer = require('./notificationReducer');

var _notificationReducer2 = _interopRequireDefault(_notificationReducer);

var _loginReducer = require('./loginReducer');

var _loginReducer2 = _interopRequireDefault(_loginReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../libs/index'),
    Redux = _require.Redux;

exports.default = Redux.combineReducers({
  auth: _authReducer2.default,
  notification: _notificationReducer2.default,
  login: _loginReducer2.default
});