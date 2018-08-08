export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';

export const showNotification = (text = '', Type = '') => {
  return (dispatch) => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {text: text, Type: Type},
    })
  }
};

export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export const hideNotification = () => {
  return (dispatch) => {
    dispatch({
      type: HIDE_NOTIFICATION,
      payload: {text: '', Type: ''},
    })
  }
};
