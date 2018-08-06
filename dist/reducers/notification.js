'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _notificationActions = require('../actions/notificationActions');

var defaultState = {
  text: '',
  type: 'info' // one of 'info', 'confirm', 'warning'
};

var notificationAction = function notificationAction() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  var obj = {
    type: action.type, 'expiredAt': new Date().getTime()
  };
  switch (action.type) {
    case _notificationActions.SHOW_NOTIFICATION:
      return _extends({ text: action.payload.text, Type: action.payload.type }, obj);
    default:
      return state;
  }
};

exports.default = notificationAction;