import React, { Component } from 'react';
import { Row, Grid, Col } from 'react-bootstrap';
import '../css/main.css';
import PropTypes from 'prop-types';
import api from '../api';
import { connect } from 'react-redux';
const deepFreeze = require('deep-freeze');

const initialState = deepFreeze({
	computer: [],
	player1: [],
	player1Score: 0,
	computerScore: 0,
	computerDeck: [],
	player1Deck: [],
	highAces: 0,
	compHighAces: 0,
	flipped: 'card',
	gameOver: false,
	message: '',
	statusText: '',
	hasError: false,
  chips: 0,
  wager: 0
});

class Blackjack extends Component {
	
	static propTypes = {
		buildDeck: PropTypes.func.isRequired
	};

	state = {
		computer: [],
		player1: [],
		player1Score: 0,
		computerScore: 0,
		computerDeck: [],
		player1Deck: [],
		highAces: 0,
		compHighAces: 0,
		flipped: 'card',
		gameOver: false,
		message: '',
		statusText: '',
		hasError: false,
    chips: 0,
    wager: 0
	};


	componentDidMount() {
		this.gameSetup();

	}

	componentDidCatch(error, info) {
		this.forceUpdate();
		this.setState({ hasError: true });
	}

	flipCard = () => {
		this.setState({
			flipped: 'card flipit'
		});
	};

	gameSetup = () => {
		let p1Hand = [];
		let compHand = [];
		let deck = { ...this.state, player1: p1Hand, computer: compHand };
		let cards = () => Math.floor(Math.random() * deck.player1Deck.length);
		let x;
		let p1Deck;
		let compDeck;
		p1Deck = this.props.buildDeck(p1Deck);
		compDeck = this.props.buildDeck(compDeck);
		deck.player1Deck = p1Deck;
		deck.computerDeck = compDeck;

		// add the first 2 drawn cards to variable deck
		p1Hand.push(deck.player1Deck[cards()]);
		p1Hand.push(deck.player1Deck[cards()]);

		// match the index of the first 2 drawn cards and splice them out of the deck
		let removeFirstP = p1Deck.indexOf(deck.player1[0]);
		deck.player1Deck.splice(removeFirstP, 1);
		let removeSecondP = p1Deck.indexOf(deck.player1[1]);
		deck.player1Deck.splice(removeSecondP, 1);

		let nu = 0;
		// computer will keep drawing until their hand value is at least 17
		while (deck.computerScore < 17 || nu < 1) {
			nu++;
			compHand.push(deck.computerDeck[cards()]);
			let removeFirstC = deck.computerDeck.indexOf(deck.computer[deck.computer.length -1]);
			
			deck.computerDeck.splice(removeFirstC, 1);

			let val = Object.keys(deck.computer[deck.computer.length -1 ]);

			switch (val[0]) {
			case 'J':
			case 'Q':
			case 'K':
				val = 10;
				break;
			case 'A':
				// val = deck.computerScore <= 10 ? 11 : 1;
				if (deck.computerScore <= 10) {
					val = 11;
					deck.compHighAces++;
				}
				else {
					val = 1;
				}
				break;
			default:
				val = parseInt(val, 10);
			}
			deck.computerScore += val;

			if (deck.computerScore > 21 && deck.highAces > 0){
				deck.highAces--;
				deck.computerScore = deck.computerScore - 10;
			}
		}

		// find the key (value in this case) for every object in the array, and add them up
		for (x in deck.player1) {
			let val = Object.keys(deck.player1[x]);

			switch (val[0]) {
			case 'J':
			case 'Q':
			case 'K':
				val = 10;
				break;
			case 'A':
				if (deck.player1Score <= 10) {
					val = 11;
					deck.highAces++;
				}
				else {
					val = 1;
				}
				break;
			default:
				val = parseInt(val, 10);
			}
			deck.player1Score += val;
		}

      api.getChips(this.props.userInfo)
      .then(res => {
        deck.chips = res.data.user.chips
        // this.setState({ chips: res.data.user.chips });
      })
      .then(res => {
        this.setState(deck);    
      })

		
	};

	drawCard = async () => {
		const { player1Deck, player1 } = this.state;
		let state = Object.assign({}, this.state);
		let getCard = Math.floor(Math.random() * player1Deck.length);
		state.player1.push(player1Deck[getCard]);
		let val = Object.keys(player1[player1.length - 1 ]);

		switch (val[0]) {
		case 'J':
		case 'Q':
		case 'K':
			val = 10;
			break;
		case 'A':
			if (state.player1Score <= 10) {
				val = 11;
				state.highAces++;
			}
			else {
				val = 1;
			}
			break;
		default:
			val = parseInt(val, 10);
		}

		// checkAce();
		state.player1Score += val;

		if (state.player1Score > 21 && state.highAces === 0) {
			state.flipped = 'card flipit';
			state.statusText = 'loser';
			state.gameOver = true;
			state.message = 'YOU BUSTED';
      await this.adjustChips(this.state.wager, false)
		}
		else if (state.player1Score > 21 && state.highAces > 0){
			state.highAces--;
			state.player1Score = state.player1Score - 10;
		}

		state.player1Deck.splice(getCard, 1);
		// console.log("init state", initialState);
		this.setState(state);
	};

	newGame = () => {
    let currentChips = api.getChips(this.props.userInfo);
		// callback in setState, to make sure the state is refreshed before making decks
		this.setState(initialState, () => {
			this.gameSetup();
      
		});
	};

	handleStand = async () => {
		const { player1Score, computerScore } = this.state;

		if (player1Score > computerScore) {

      await this.adjustChips(this.state.wager, true)
			this.setState({ message: 'YOU WIN!', flipped: 'card flipit', gameOver: true, statusText: 'winner' });

		} else if (computerScore > player1Score && computerScore > 21) {

      await this.adjustChips(this.state.wager, true)
			this.setState({ message: 'YOU WIN!', flipped: 'card flipit', gameOver: true, statusText: 'winner' });

		} else if (computerScore > player1Score && computerScore <= 21){

      await this.adjustChips(this.state.wager, false)
			this.setState({ message: 'GAME OVER', flipped: 'card flipit', gameOver: true, statusText: 'loser' });

		} else {

      await this.adjustChips(this.state.wager, false)
			this.setState({ message: 'TIE', flipped: 'card flipit', gameOver: true, statusText: 'loser' });
		}
	};

  adjustChips = (wager, outcome) => {
    let curState = Object.assign({}, this.state);

    if (outcome) {
      curState.chips += wager;
    }
    else {
      curState.chips -= wager;
    }

    this.props.userInfo.chips = curState.chips;

    api.adjustChips(this.props.userInfo)
    .then(res => {
      this.setState({ chips: res.data.user.chips })
    })
  }

  handleChange = e => {
    let _state = Object.assign({}, this.state)

    _state[e.target.name] = parseInt(e.target.value);

    this.setState(_state);
  }

	render() {
		console.log('blackjack state', this.state);
		const { computer, player1, gameOver } = this.state;
		const duringGame = gameOver ? computer : computer.slice(0, 2);


		if (this.state.hasError) {
			alert('Please refresh the page');
		}

		return (
			<div className="App">
				<Grid>
					<Row>
						<Col md={2} xs={2}>

						</Col>
						{ computer.length &&
						<Col xs={6} xsOffset={2}>
							<h3 style={{marginTop: 30, padding: 2, height: 30}}>Computer:</h3>
							<div style={{margin: 0, height: 20, padding: 2}}>{ gameOver && <h4><span className="score-text">Score: { this.state.computerScore }</span> </h4>}</div>
							<br />

							<div className="card-container">
								{ duringGame.map((el, i) => {
									let val = Object.keys(el);
									let suit = Object.values(el);
		
									return (
										<div key={i} className={`${this.state.flipped} ${suit} ${i === 1 ? 'flipit' : ''}`} >
											<div className="front">
												<p>{ val }</p> 
											</div>
											<div className="back">
												<div className="photo"></div>
											</div>
										</div>
									);
								})
								}
							</div>
						</Col>
						}

					</Row>
					<div id="button-group">
						<Col md={2} xs={4} smOffset={6}>
							<button id="custom-button"  disabled={gameOver} value="Hit" onClick={this.drawCard}>Hit</button> <br /><br />
							<button id="custom-button"  disabled={gameOver} value="Stand" onClick={this.handleStand}>Stand</button> <br /><br />
							<button id="custom-button"  value="double" disabled>Double</button> <br /><br />
							<button id="custom-button"  value="New Game" onClick={this.newGame}>New Game</button> <br /><br />
              <button id="custom-button"  value="Add200" onClick={this.adjustChips}>Add 200</button> <br /><br />
              <input onChange={this.handleChange} value={this.state.wager} name="wager" type="number" />
						</Col>
					</div>

					<Row>

						{ computer.length &&
						<Col xs={6} xsOffset={4}>
							<br />
							<h1 style={{margin: 10, padding: 1, height: 20}} className={this.state.statusText}>{ this.state.message }</h1>
							<br />
              <h4>Chips: {this.state.chips}</h4>
							<h3 className="player-one">Player One:</h3>
							<h4> <span className="score-text">Score: { this.state.player1Score }</span></h4>

							<div className="card-container">

								{ player1.map((el, i) => {
									let val = Object.keys(el);
									let suit = Object.values(el);
									return (
										<div key={i} className={`card ${suit} flipit`} >
											<div className="front">
												<p>{ val }</p>
											</div>
											<div className="back">
												<div className="photo"></div>
											</div>
										</div>
									);
								})}
							</div>
						</Col>
						}
					</Row>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps, null)(Blackjack);


