import React, { Component } from 'react';
import './App.css';
import Cards from './components/cardgen';

class App extends Component {
	constructor() {
		super();
	}

	spitCards = () => {
		this.props.cards.map(( el, i ) => {
			let num = 2;
			let switcher = ( i % 4 ) === 0 ? num + 1 : null;

			return (
				<div key={i} className="card">
				{ el[switcher] }
				</div>
			)	
		})
	}

  render() {
    return (
      <div className="App">
				<div className="grid">
					{ this.spitCards() }
				</div>
      </div>
    );
  }
}

export default App;
