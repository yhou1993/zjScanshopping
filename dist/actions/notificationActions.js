'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SHOW_NOTIFICATION = exports.SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';

var showNotification = exports.showNotification = function showNotification(text) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';

  return function (dispatch) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { text: text, type: type }
    });
  };
};

var HIDE_NOTIFICATION = exports.HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

var hideNotification = exports.hideNotification = function hideNotification() {
  return function (dispatch) {
    dispatch({
      type: HIDE_NOTIFICATION
    });
  };
};