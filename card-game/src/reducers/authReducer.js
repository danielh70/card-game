import {
  AUTH_USER, UNAUTH_USER, REGISTER_FAIL,
  LOGIN_FAIL, RESPONSIVE_NAV, UPDATE_USER_CHIPS
} from '../actions/auth';

const initialState = {
  isAuthed: false,
  registerErrors: {},
  loginErrors: {},
  userInfo: {},
  classes: '',
  chips: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        isAuthed: true,
        registerErrors: {},
        loginErrors: {},
        userInfo: action.userInfo
      };
    case UNAUTH_USER:
      return initialState;
    case REGISTER_FAIL:
      return { ...state, registerErrors: action.errors };
    case LOGIN_FAIL:
      return { ...state, loginErrors: action.errors };
      case RESPONSIVE_NAV:
        if (state.classes === '' || state.classes === undefined) {
        	return { ...state, classes: 'responsive' };
        }
        else {
        	return { ...state, classes: '' }
        }
      case UPDATE_USER_CHIPS:
        return { ...state, chips: action.payload }
    default:
      return state;
  }
};
