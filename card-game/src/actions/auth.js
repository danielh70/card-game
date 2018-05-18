import api from "../api";
import {
  saveToken,
  removeToken,
  getUserInfo,
  parseToken,
  formatErrors
} from "../helper";

export const AUTH_USER         = "AUTH_USER";
export const UNAUTH_USER       = "UNAUTH_USER";
export const REGISTER_FAIL     = "REGISTER_FAIL";
export const LOGIN_FAIL        = "LOGIN_FAIL";
export const RESPONSIVE_NAV    = "RESPONSIVE_NAV";
export const UPDATE_USER_CHIPS = "UPDATE_USER_CHIPS";
export const BUILD_DECK        = "BUILD_DECK";

export const authUser = userInfo => {
  return {
    type: AUTH_USER,
    userInfo
  };
};

export const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

export const registerFail = errors => {
  return {
    type: REGISTER_FAIL,
    errors
  };
};

export const loginFail = errors => {
  return {
    type: LOGIN_FAIL,
    errors
  };
};

export const updateChips = chips => {
  return {
    type: UPDATE_USER_CHIPS,
    payload: chips
  }
};

export const responsiveNav = () => {
  return { type: RESPONSIVE_NAV };
};

export const buildDeck = (deck = []) => {
  let suits = [ 'suithearts', 'suitspades', 'suitdiamonds', 'suitclubs' ];
  let numbers = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A' ];

  for (var i = 0; i < numbers.length; i++) {
    for (var j = 0; j < 4; j++) {
      deck.push({
        [numbers[i]]: suits[j]
      });
    }
  }
  return deck;
};

export const getChips = userInfo => async dispatch => {
  try {
    let { data } = await api.getChips(userInfo)

    dispatch(updateChips(data.user.chips))
    
  } catch (e) {
    console.log(e);
  }
};

export const adjustChips = userInfo => async dispatch => {
  try {
    // console.log("userinfo", userInfo);
    let { data } = await api.adjustChips(userInfo)
    dispatch(updateChips(data.user.chips))

  } catch (e) {
    console.log(e);
  }
};

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