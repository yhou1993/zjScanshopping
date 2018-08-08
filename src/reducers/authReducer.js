import {CRUD_CREATE} from '../actions/authActions'

const auth = (state = {}, action) => {
  let obj = {
    type: action.type, expiredAt: new Date().getTime()
  }
  switch (action.type) {
    case CRUD_CREATE:
      return {...action.payload, ...obj};
    default:
      return state
  }
};

export default auth;