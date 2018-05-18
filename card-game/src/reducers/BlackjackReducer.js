// import {
//   AUTH_USER, UNAUTH_USER, REGISTER_FAIL,
//   LOGIN_FAIL, RESPONSIVE_NAV, UPDATE_USER_CHIPS
// } from '../actions/auth';

const initialState = {
  computer: [],
  player1: [],
  player1Score: 0,
  computerScore: 0,
  computerDeck: [],
  player1Deck: [],
  highAces: 0,
  compHighAces: 0,
  flipped: 'card',
  gameOver: false,
  message: '',
  statusText: '',
  hasError: false,
  wager: 0,
  inProgress: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    
    default:
      return state;
  }
};
