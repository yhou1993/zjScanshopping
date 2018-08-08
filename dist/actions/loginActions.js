'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginActions = loginActions;
var Login_Success = exports.Login_Success = 'Login_Success';
function loginActions() {
  return function (dispatch) {
    dispatch({
      type: Login_Success
    });
  };
}