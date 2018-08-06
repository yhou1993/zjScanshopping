const {Redux} = require('../libs/index');

import auth from './auth'
import notification from './notification'

export default Redux.combineReducers({
  auth,
  notification
});
