import React, { Component } from 'react';
import './App.css';
import Cards from './components/cardgen';


class App extends Component {
	constructor(props) {
		super(props);
	}

	// spitCards = () => {
	// 	this.props.cards.map(( el, i ) => {
	// 		let num = this.state.currentCard;
	// 		let switcher = ( i % 4 ) === 0 ? num + 1 : null;
	//
	// 		return (
	// 			<div key={i} className="card">
	// 				{ el[i] }
	// 			</div>
	// 		)
	// 	})
	// }


  render() {
		console.log(this.props);
    return (
      <div className="App">
				<div className="grid">
						{ this.props.cards.map(( el, i ) => {
							let vals = Object.values(el)
							let card = Object.keys(el)
							return (
								<div key={i} className="card">
									{ card } { vals }
								</div>
							)
						})}
				</div>
      </div>
    );
  }
}

export default App;

// var switcher = ( i % 4 ) === 0 ? this.num++ : null;
