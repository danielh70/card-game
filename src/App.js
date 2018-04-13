import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			cards: []
		}
	}

	componentWillMount() {
		let currentState = Object.assign([], this.state.cards); 
		let suits = [ "hearts", "spades", "diamonds", "clubs" ];
		let numbers = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace" ];

		for (var i = 0; i < numbers.length; i++) {
			for (var j = 0; j < 4; j++) {
				currentState.push({
					[numbers[i]]: suits[j]
				})
			}
		}
		this.setState({ cards: currentState });
	}

  render() {
		console.log("this state", this.state);
    return (
      <div className="App">
				<div className="grid">

				
				</div>
      </div>
    );
  }
}

export default App;
