import React, { Component} from 'react';
import Cards from './components/cardgen';
import { PageHeader } from 'react-bootstrap';
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

	buildDeck = (deck = []) => {
		let suits = [ "hearts", "spades", "diamonds", "clubs" ];
		let numbers = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace" ];

		for (var i = 0; i < numbers.length; i++) {
			for (var j = 0; j < 4; j++) {
				deck.push({
					[numbers[i]]: suits[j]
				})
			}
		}
		return deck;
	}

	componentWillMount() {
		let player1Deck;
		let computerDeck;
		player1Deck = this.buildDeck(player1Deck);
		computerDeck = this.buildDeck(computerDeck);

		this.setState({ player1: player1Deck, computer: computerDeck });
	}

	render() {
		const { blackjack } = this.state

		// console.log(this.state);
		return (
			<div>
				<PageHeader style={{textAlign: 'center'}}>
					Powered by React
				</PageHeader>


				{ blackjack &&
					<Blackjack
						buildDeck={this.buildDeck}
					 />
				}

			</div>
		);
	}
}


export default App;
