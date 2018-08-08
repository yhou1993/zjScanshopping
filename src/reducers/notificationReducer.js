import {SHOW_NOTIFICATION, HIDE_NOTIFICATION} from '../actions/notificationActions';

const notification = (state = {}, action) => {
  let obj = {
    type: action.type, expiredAt: new Date().getTime()
  }
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {...action.payload, ...obj};
    case HIDE_NOTIFICATION:
      return {...action.payload, ...obj};
    default:
      return state;
  }
};

export default notification;
