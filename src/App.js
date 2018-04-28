import React, { Component} from 'react';
import Cards from './components/cardgen';
import Blackjack from './components/blackjack.js';


class App extends Component {
		constructor(props) {
			super(props);
			this.state = {
				blackjack: true,
				player1:  [],
				computer: []
		}
	}



	componentWillMount() {
		let currentStatePlayer1 = Object.assign([], this.state.player1);
		let currentStateComputer = Object.assign([], this.state.computer);
		let suits = [ "hearts", "spades", "diamonds", "clubs" ];
		let numbers = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace" ];

		for (var i = 0; i < numbers.length; i++) {
			for (var j = 0; j < 4; j++) {
				currentStatePlayer1.push({
					[numbers[i]]: suits[j]
				})
				currentStateComputer.push({
					[numbers[i]]: suits[j]
				})
			}
		}

		this.setState({ player1: currentStatePlayer1, computer: currentStateComputer });
	}
	//
	// componentDidMount() {
	// 	let test = this.state.cards.reduce((collector, card) => {
	// 		let deck = Object.assign({}, card);
	// 		if (!collector.hasOwnProperty(card)) {
	// 			collector[card] = [deck]
	// 		}
	// 		else {
	// 			deck[card].push(card)
	// 		}
	// 		return collector
	// 	}, {})
	//
	// 	console.log(test);
	// }

	// componentDidMount() {
	// 	let deck = Object.assign({}, ...this.state.cards);
	// 	let keys = Object.keys(deck)
	// 	let newDeck = [];
	//
	// 	keys.map((i, el) => {
	// 		el:
	// 	})
	//
	// }



	render() {

		const { blackjack, player1, computer } = this.state

		console.log(this.state);
		return (
			<div>
				{ blackjack &&
					<Blackjack
						player1={player1}
						computer={computer}
					 />
				}


			</div>
		);
	}
}

{/* <Cards
	cards={this.state.cards}
	computer={this.state.computer}
	handleCardSelect={this.handleCardSelect}
	deleteCard={this.handleCardSelect}
/> */}

export default App;
