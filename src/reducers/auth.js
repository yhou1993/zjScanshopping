import {CRUD_CREATE} from '../actions/auth'

const auth = (state = {authenticated: false}, action) => {
  let obj = {
    type: action.type, 'expiredAt': new Date().getTime()
  }
  switch (action.type) {
    case CRUD_CREATE:
      return {authenticated: true, ...action.payload, ...obj};
    default:
      return state
  }
};

export default auth;