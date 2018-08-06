'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _auth = require('../actions/auth');

var auth = function auth() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { authenticated: false };
  var action = arguments[1];

  var obj = {
    type: action.type, 'expiredAt': new Date().getTime()
  };
  switch (action.type) {
    case _auth.CRUD_CREATE:
      return _extends({ authenticated: true }, action.payload, obj);
    default:
      return state;
  }
};

exports.default = auth;