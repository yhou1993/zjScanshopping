'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = auth;
var CRUD_CREATE = exports.CRUD_CREATE = 'CRUD_CREATE';
function auth(openid, session_key, userInfo) {
  return function (dispatch) {
    dispatch({
      type: CRUD_CREATE,
      payload: { 'openid': openid, 'session_key': session_key }
    });
  };
}