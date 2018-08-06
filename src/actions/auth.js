export const CRUD_CREATE = 'CRUD_CREATE';

export function login(openid, session_key, userInfo) {
  return (dispatch) => {
    dispatch({
      type: CRUD_CREATE,
      payload: {'openid': openid, 'session_key': session_key}
    })
  }
}