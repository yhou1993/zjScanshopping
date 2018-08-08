export const CRUD_CREATE = 'CRUD_CREATE';
export function authActions(openid, session_key) {
  return (dispatch) => {
    dispatch({
      type: CRUD_CREATE,
      payload: {'openid': openid, 'session_key': session_key}
    })
  }
}