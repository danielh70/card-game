import React, { Component } from 'react';
import { Row, Grid, Col, Button } from 'react-bootstrap';
import Loader from './loader';
import '../css/main.css';
const deepFreeze = require('deep-freeze');

const initialState = deepFreeze({
    computer: [],
    player1: [],
    player1Score: 0,
    computerScore: 0,
    computerDeck: [],
    player1Deck: [],
    flipped: 'card',
    gameOver: false,
    message: ''
  });

class Blackjack extends Component {
  state = {
    computer: [],
    player1: [],
    player1Score: 0,
    computerScore: 0,
    computerDeck: [],
    player1Deck: [],
    flipped: 'card',
    gameOver: false,
    message: '',
    hasError: false
  }

  componentDidMount() {
    this.gameSetup()
  }

  componentDidCatch(error, info) {
    console.log("error", error, "info", info);
    this.forceUpdate();
   this.setState({ hasError: true });
 }

  flipCard = () => {
    this.setState({
      flipped: 'card flipit'
    });
  }

  gameSetup = () => {
    let p1Hand = [];
    let compHand = [];
    let deck = { ...this.state, player1: p1Hand, computer: compHand };
    let cards = () => Math.floor(Math.random() * deck.player1Deck.length);
    let x;
    let p1Deck;
    let compDeck;
    p1Deck = this.props.buildDeck(p1Deck)
    compDeck = this.props.buildDeck(compDeck)
    deck.player1Deck = p1Deck
    deck.computerDeck = compDeck

    // add the first 2 drawn cards to variable deck
    p1Hand.push(deck.player1Deck[cards()]);
    p1Hand.push(deck.player1Deck[cards()]);

    // match the index of the first 2 drawn cards and splice them out of the deck
    let removeFirstP = deck.player1Deck.indexOf(this.state.player1[0])
      deck.player1Deck.splice(removeFirstP, 1);
    let removeSecondP = deck.player1Deck.indexOf(this.state.player1[1])
      deck.player1Deck.splice(removeSecondP, 1);

    let nu = 0

    // computer will keep drawing until their hand value is at least 17
    while (deck.computerScore < 17 || nu < 1) {
      nu++
      deck.computer.push(deck.computerDeck[cards()]);
      let removeFirstC = deck.computerDeck.indexOf(this.state.computer[this.state.computer.length -1])
      deck.computerDeck.splice(removeFirstC, 1);

      let val = Object.keys(deck.computer[deck.computer.length -1 ]);

       switch(val[0]) {
         case "J":
         case "Q":
         case "K":
           val = 10;
           break;
         case "A":
           val = deck.computerScore <= 10 ? 11 : 1
           break;
         default:
         val = parseInt(val);
       }
       deck.computerScore += val


     }

     // find the key (value in this case) for every object in the array, and add them up
    for (x in deck.player1) {
      let val = Object.keys(deck.player1[x]);

        switch(val[0]) {
          case "J":
          case "Q":
          case "K":
            val = 10;
            break;
          case "A":
            val = deck.player1Score <= 10 ? 11 : 1;
            break;
          default:
          val = parseInt(val);
        }
        deck.player1Score += val
      }

    this.setState(deck)
  }

  drawCard = () => {
    const { player1Deck, player1 } = this.state;
    let state = Object.assign({}, this.state)
    let getCard = Math.floor(Math.random() * player1Deck.length)
    state.player1.push(player1Deck[getCard])
    let val = Object.keys(player1[player1.length - 1 ]);

    switch(val[0]) {
      case "J":
      case "Q":
      case "K":
        val = 10;
        break;
      case "A":
        val = state.player1Score <= 10 ? 11 : 1
        break;
      default:
      val = parseInt(val);
    }

    state.player1Score += val

    if (state.player1Score > 21) {
      state.flipped = 'card flipit'
      state.gameOver = true
      state.message = 'YOU BUSTED'
    }

    state.player1Deck.splice(getCard, 1)
    // console.log("init state", initialState);
    this.setState(state)
  }

  newGame = () => {
    // clone our fresh initialState to start over
    let freshStart = Object.assign({}, initialState);

    // callback in setState, to make sure the state is refreshed before making decks
    this.setState(initialState, () => {
      this.gameSetup()
    });
  }

  handleStand = () => {
    const { player1Score, computerScore } = this.state

    if (player1Score > computerScore) {
      this.setState({ message: 'YOU WIN!', flipped: 'card flipit', gameOver: true })
    } else if (computerScore > player1Score && computerScore > 21) {
      this.setState({ message: 'YOU WIN!', flipped: 'card flipit', gameOver: true })
    } else if (computerScore > player1Score && computerScore <= 21){
      this.setState({ message: 'GAME OVER', flipped: 'card flipit', gameOver: true })
    } else {
      this.setState({ message: 'TIE', flipped: 'card flipit', gameOver: true })
    }
  }

  render() {
    console.log("blackjack state", this.state);
    const { computer, player1, gameOver } = this.state

    if (this.state.hasError) {
      alert("Please refresh the page");
    }

    return (
      <div className="App">
        <Grid>
          <Row>
            <Col md={2} xs={2}>

            </Col>
            {this.state.computer.length &&
            <Col xs={6} xsOffset={2}>
              <h3 style={{margin: 0, padding: 2, height: 30}}>Computer:</h3>
              <div style={{margin: 0, height: 20, padding: 2}}>{ this.state.gameOver && <h4><span className="score-text">Score: { this.state.computerScore }</span> </h4>}</div>
              <br />




              <div className="card-container">
                { gameOver &&
                   computer.map((el, i) => {
                    let val = Object.keys(el)
                    let suit = Object.values(el)
                    return (
                      <div key={i} className={`card ${suit}`} id="show">

                          <p>{ val }</p> <br />


                      </div>
                    )
                  })
                }

                { !gameOver &&

                <a onClick={this.flipCard}>
                <div className={`${this.state.flipped} ${Object.values(computer[0])}`}>
                  <div className="front">
                    <p>{ Object.keys(computer[0]) } </p>

                  </div>
                  <div className="back">
                    <div className="photo"></div>
                  </div>
                </div>
                </a>
              }
              { !this.state.gameOver &&
                <div className="front">
                  <div className={`card ${Object.values(computer[1])}`} id="show">

                    <p>{ Object.keys(computer[1]) }</p>

                  </div>
                  <div className="back">
                    <div className="photo"></div>
                  </div>

                </div>
              }
              </div>
            </Col>
          }

          </Row>
          <div id="button-group">
            <Col md={2} xs={4} smOffset={6}>
              <input id="custom-button" type="button" disabled={gameOver} value="Hit" onClick={this.drawCard} /> <br /><br />
              <input id="custom-button" type="button" disabled={gameOver} value="Stand" onClick={this.handleStand} /> <br /><br />
              <input id="custom-button" type="button" value="double" disabled /> <br /><br />
              <input id="custom-button" type="button" value="New Game" onClick={this.newGame} /> <br /><br />
            </Col>
          </div>

          <Row>

            {this.state.computer.length &&
            <Col xs={6} xsOffset={4}>
              <br />
              <h1 style={{margin: 0, padding: 2, height: 30}}>{ this.state.message }</h1>
              <br />
              <h3>Player One:</h3>
              <h4> <span className="score-text">Score: { this.state.player1Score }</span></h4>

              <div className="hand spread" >

                { this.state.player1.map((el, i) => {
                  let val = Object.keys(el)
                  let suit = Object.values(el)
                  return (

                    <div key={i} className={`card ${suit}`} >
                        <p>{ val }</p>
                      </div>

                  )
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

export default Blackjack;
