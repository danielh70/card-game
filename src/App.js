import React, { Component} from 'react';
import { PageHeader } from 'react-bootstrap';
import Blackjack from './components/blackjack.js';
import react from './images/react.svg';
import reactFire from './images/react-fire.svg';
import NavTop from './components/navbar-top';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blackjack: true,
			active: false,
		};
	}

  buildDeck = (deck = []) => {
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


  render() {
  	const { blackjack } = this.state;
  	// console.log(this.state);

  	return (
  		<div>
  			<NavTop />

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

{/*<PageHeader style={{textAlign: 'center'}}>
  				<img className="react-logo" src={react} alt="logo" />
          Powered by React
  				<img className="react-logo touch" src={reactFire} alt="logo" />
  			</PageHeader>*/}