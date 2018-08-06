'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _notification = require('./notification');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../libs/index'),
    Redux = _require.Redux;

exports.default = Redux.combineReducers({
  auth: _auth2.default,
  notification: _notification2.default
});