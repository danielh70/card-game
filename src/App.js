import React, { Component} from 'react';
import Cards from './components/cardgen';
import { PageHeader } from 'react-bootstrap';
import Blackjack from './components/blackjack.js';
import react from './images/react.svg';
import reactFire from './images/react-fire.svg';
import Navbar from './components/navbar';




class App extends Component {
		constructor(props) {
			super(props);
			this.state = {
				blackjack: true,
				player1:  [],
				computer: [],
				active: false,

		}
	}

	buildDeck = (deck = []) => {
		let suits = [ "suithearts", "suitspades", "suitdiamonds", "suitclubs" ];
		let numbers = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A" ];

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
		let arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ];

		// console.log(this.state);
		return (
			<div>
				<PageHeader style={{textAlign: 'center'}}>
					<img className="react-logo" src={react} alt="logo" />
					Powered by React
					<img className="react-logo touch" src={reactFire} alt="logo" />
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
//
// <div className="card-wrapper">
// 	<div className={`card-${i} h`}>
//
// 	</div>
// </div>

export default App;
