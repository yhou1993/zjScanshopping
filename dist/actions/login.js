'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginSuccess = LoginSuccess;
var Login_Success = exports.Login_Success = 'Login_Success';
function LoginSuccess() {
  return function (dispatch) {
    dispatch({
      type: Login_Success
    });
  };
}