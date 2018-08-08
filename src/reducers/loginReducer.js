import {Login_Success} from '../actions/loginActions'

const login = (state = {}, action) => {
  let obj = {
    type: action.type, expiredAt: new Date().getTime()
  }
  switch (action.type) {
    case Login_Success:
      return {...state, ...obj};
    default:
      return state
  }
};

export default login;