import React, { Component} from 'react';
import PropTypes from 'prop-types';
import App from '../App';

class Cards extends Component {
	static propTypes = {
		children: PropTypes.node,
		className: PropTypes.string,
	};

		constructor(props) {
			super(props);
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

	spitCards = () => {
		this.state.cards.map(( el, i ) => {
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
			<div> 
				<App cards={this.state.cards}/>
			</div>
		);
	}
}

export default Cards;
