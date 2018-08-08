const {Redux} = require('../libs/index');

import auth from './authReducer'
import notification from './notificationReducer'
import login from './loginReducer'

export default Redux.combineReducers({
  auth,
  notification,
  login
});
