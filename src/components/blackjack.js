import React, { Component } from 'react';
import { Row, Grid, Col, Button } from 'react-bootstrap';
import Loader from './loader';
import '../css/main.css';
const deepFreeze = require('deep-freeze');
// import '../css/App.css';

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
    message: ''
  }

  componentDidMount() {
    this.gameSetup()

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

    p1Hand.push(deck.player1Deck[cards()]);
    p1Hand.push(deck.player1Deck[cards()]);

    let removeFirstP = deck.player1Deck.indexOf(this.state.player1[0])
      deck.player1Deck.splice(removeFirstP, 1);
    let removeSecondP = deck.player1Deck.indexOf(this.state.player1[1])
      deck.player1Deck.splice(removeSecondP, 1);

    let nu = 0

    while (deck.computerScore < 17 || nu < 1) {
      nu++
      deck.computer.push(deck.computerDeck[cards()]);

      let val = Object.keys(deck.computer[deck.computer.length -1 ]);

       switch(val[0]) {
         case "jack":
         case "queen":
         case "king":
           val = 10;
           break;
         case "ace":
           val = deck.computerScore <= 10 ? 11 : 1
           break;
         default:
         val = parseInt(val);
       }
       deck.computerScore += val

       let removeFirstC = deck.computerDeck.indexOf(this.state.computer[this.state.computer.length -1])
       deck.computerDeck.splice(removeFirstC, 1);
     }

    for (x in deck.player1) {
      let val = Object.keys(deck.player1[x]);

        switch(val[0]) {
          case "jack":
          case "queen":
          case "king":
            val = 10;
            break;
          case "ace":
            val = 1;
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
      case "jack":
      case "queen":
      case "king":
        val = 10;
        break;
      case "ace":
        val = 11 || 1
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
    console.log("init state", initialState);
    this.setState(state)
  }


// console.log("pprops", prevProps, "pstate", prevState);

  newGame = () => {
    let freshStart = Object.assign({}, initialState);

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
    const { computer, player1 } = this.state

    return (
      <div className="App">
        <Grid>
          <Row>
            {this.state.computer.length &&
            <Col xs={4} xsOffset={4}>
              <h3>Computer:</h3>
              { this.state.gameOver && <h4 style={{color: 'red'}}>Score: { this.state.computerScore } </h4>}

              <div className="card-container">
                { this.state.gameOver &&
                   computer.map((el, i) => {
                    let val = Object.keys(el)
                    let suit = Object.values(el)
                    return (
                      <div key={i} className="card" id="show">
                        <div className="front">
                          { val } <br />
                          { suit }
                        </div>
                      </div>
                    )
                  })
                }

                { !this.state.gameOver &&
                <a onClick={this.flipCard}>
                <div className={this.state.flipped}>
                  <div className="front">
                    { Object.keys(computer[0]) } <br />
                    { Object.values(computer[0]) }
                  </div>
                  <div className="back">
                    <div className="photo"></div>
                  </div>
                </div>
                </a>
              }
              { !this.state.gameOver &&
                <div className="card" id="show">
                  <div className="front">

                    { Object.keys(computer[1]) } <br />
                    { Object.values(computer[1]) }

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

          <Row>
            <Col xs={2}>
              <Button onClick={this.drawCard}>Hit</Button> <br /><br />
              <Button onClick={this.handleStand}>Stand</Button> <br /><br />
              <Button disabled>Double</Button> <br /><br />
              <Button onClick={this.newGame}>New Game</Button> <br /><br />
            </Col>
            {this.state.computer.length &&
            <Col xs={4} xsOffset={2}>
              <h1>{ this.state.message } </h1>
              <h3>Player One:</h3>
              <h4 style={{color: 'red'}}> Score: { this.state.player1Score }</h4>

              <div className="card-container">
                { this.state.player1.map((el, i) => {
                  let val = Object.keys(el)
                  let suit = Object.values(el)
                  return (
                    <div key={i} className="card" id="show">
                      <div className="front">
                        { val } <br />
                        { suit }
                      </div>
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
