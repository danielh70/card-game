import React, { Fragment } from 'react';

function assert(condition, message) {
  if (!condition) {
    message = message || 'Assertion Failed';
    if (typeof Error !== 'undefined') {
      throw new Error(message);
    }
    throw message; // Fallback
  }
  return true; 
}

const checkBet = (chips, wager) => {
  return assert(chips - wager >= 0)
}

const PlaceBet = ({ chips, wager }) => (
  <>
    <h1>Hello world</h1>
    <input onChange={this.handleChange} value={this.state.wager} name="wager" type="number" /> <br />
    <button onClick={this.gameSetup}>Start Game</button>
  </>
);

export default PlaceBet;
