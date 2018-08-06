import {SHOW_NOTIFICATION, HIDE_NOTIFICATION} from '../actions/notificationActions';

const defaultState = {
  text: '',
  type: 'info', // one of 'info', 'confirm', 'warning'
};

const notificationAction = (state = defaultState, action) => {
  let obj = {
    type: action.type, 'expiredAt': new Date().getTime()
  }
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {text: action.payload.text, Type: action.payload.type,...obj};
    default:
      return state;
  }
};

export default notificationAction;
