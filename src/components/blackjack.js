import React, { Component } from 'react';

class Blackjack extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleCardSelect = (playerCard, computerCard) => {
    let numbers = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace" ];
    let currentState = Object.assign([], this.state.cards);
    let currentStateComputer = Object.assign([], this.state.computer);
    let playerCardKey = Object.keys(playerCard);
    let computerCardKey = Object.keys(computerCard);
    let state = { ...this.state };


  }

  render() {
    return (
      <div>

      </div>
    );
  }

}

export default Blackjack;
