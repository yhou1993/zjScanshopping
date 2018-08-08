'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authActions = authActions;
var CRUD_CREATE = exports.CRUD_CREATE = 'CRUD_CREATE';
function authActions(openid, session_key) {
  return function (dispatch) {
    dispatch({
      type: CRUD_CREATE,
      payload: { 'openid': openid, 'session_key': session_key }
    });
  };
}