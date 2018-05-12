import api from "../api";
import {
  saveToken,
  removeToken,
  getUserInfo,
  parseToken,
  formatErrors
} from "../helper";

const AUTH_USER = "AUTH_USER";
const UNAUTH_USER = "UNAUTH_USER";
const REGISTER_FAIL = "REGISTER_FAIL";
const LOGIN_FAIL = "LOGIN_FAIL";
const RESPONSIVE_NAV = "RESPONSIVE_NAV";
const UPDATE_USER_CHIPS = "UPDATE_USER_CHIPS";

const authUser = userInfo => {
  return {
    type: AUTH_USER,
    userInfo
  };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

const registerFail = errors => {
  return {
    type: REGISTER_FAIL,
    errors
  };
};

const loginFail = errors => {
  return {
    type: LOGIN_FAIL,
    errors
  };
};

const updateChips = chips => {
  return {
    type: UPDATE_USER_CHIPS,
    payload: chips
  }
}

export const responsiveNav = () => {
	return { type: RESPONSIVE_NAV };
};


 // api.getChips(this.props.userInfo)
 //      .then(res => {
 //        deck.chips = res.data.user.chips
 //        // this.setState({ chips: res.data.user.chips });
 //      })


export const getChips = userInfo => async dispatch => {
  try {
    // console.log("userinfo", userInfo);

    let { data } = await api.getChips(userInfo)

    dispatch(updateChips(data.user.chips))

  } catch (e) {
    console.log(e);
  }
}

export const adjustChips = userInfo => async dispatch => {
  try {
    console.log("userinfo", userInfo);

    let { data } = await api.adjustChips(userInfo)

    
    console.log("data user chips", data.user.chips);
    dispatch(updateChips(data.user.chips))

  } catch (e) {
    console.log(e);
  }
}

export const registerUser = (userInfo, redirect) => async dispatch => {
  try {
    let { data } = await api.register(userInfo);
    saveToken(data.token);
    dispatch(authUser(data.userInfo));
    redirect();
  } catch (e) {
    if (!e.response) {
      console.log(e);
      return;
    }
    let { data } = e.response;
    const formattedErrors = formatErrors(data);
    dispatch(registerFail(formattedErrors));
  }
};

export const loginUser = (userInfo, redirect) => async dispatch => {
  try {
    let { data } = await api.login(userInfo);
    saveToken(data.token);
    dispatch(authUser(data.userInfo));
    redirect();
  } catch (e) {
    if (!e.response) {
      console.log(e);
      return;
    }
    let { data } = e.response;
    dispatch(loginFail(data));
  }
};

export const socialAuthUser = (token, redirect) => async dispatch => {
  saveToken(token);
  dispatch(authUser(parseToken(token)));
  redirect();
};

export const reAuthUser = redirect => async dispatch => {
  const userInfo = getUserInfo();
  if (userInfo && userInfo.exp >= Date.now() / 1000) {
    dispatch(authUser(userInfo));
  } else if (userInfo && userInfo.exp < Date.now() / 1000) {
    redirect();
  }
};

export const logoutUser = redirect => async dispatch => {
  removeToken();
  dispatch(unAuthUser());
  redirect();
};

const initialState = {
  isAuthed: false,
  registerErrors: {},
  loginErrors: {},
  userInfo: {},
  classes: '',
  chips: 0
};

const authReducer = (state = initialState, action) => {
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
      return {
        ...state,
        registerErrors: action.errors
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginErrors: action.errors
      };
      case RESPONSIVE_NAV:
      if (state.classes === '' || state.classes === undefined) {
      	return {
      		...state,
      		classes: 'responsive'
      	};
      }
      else {
      	return {
      		...state,
      		classes: ''
      	}
      }
      case UPDATE_USER_CHIPS:
        return {
          ...state,
          chips: action.payload
        }
    default:
      return state;
  }
};

export default authReducer;