import React, { Component} from 'react';
import { Route } from 'react-router-dom';
import Blackjack from './components/blackjack.js';
import NavTop from './components/navbar-top';


class App extends Component {
	
	state = {
		blackjack: true,
		active: false,
	};
	
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
  			<NavTop>	

  				<Route exact path="/" render={props => 
  					return <Blackjack buildDeck={this.buildDeck} />
  				}
  				/>
  				
  			</NavTop>
  		</div>
  	);
  }
}

export default App;
