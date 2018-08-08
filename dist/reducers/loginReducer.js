'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _loginActions = require('../actions/loginActions');

var login = function login() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var obj = {
    type: action.type, expiredAt: new Date().getTime()
  };
  switch (action.type) {
    case _loginActions.Login_Success:
      return _extends({}, state, obj);
    default:
      return state;
  }
};

exports.default = login;