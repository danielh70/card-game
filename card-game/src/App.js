import React, { Component} from 'react';
import { Route } from 'react-router-dom';
import Blackjack from './components/blackjack.js';
import NavTop from './components/navbar-top';
import Signup from './components/sign-up';
import Login from './components/log-in';

const APIURL = 'http://localhost:3000/'

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

  // componentWillMount() {
  // 	fetch(APIURL)
  // 		.then(res => res.json())
  // 		.then(res => console.log(res))
  // }


  render() {
  	const { blackjack } = this.state;
  	// console.log(this.state);

  	return (
  		<div>
  			<NavTop>	

  				<Route exact path="/" render={props => 
  					<Blackjack buildDeck={this.buildDeck} />
  				}
  				/>
	  			
	  			<Route exact path="/register" render={props => 
  					<Signup />
  				}
  				/>

  				<Route exact path="/login" render={props => 
  					<Login />
  				}
  				/>          	
	  		
  			</NavTop>
  		</div>
  	);
  }
}

export default App;
