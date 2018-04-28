import React, { Component } from 'react';
import { Row, Grid, Col, Button } from 'react-bootstrap';
import Loader from './loader';
import '../css/main.css';
// import '../css/App.css';


class Blackjack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      computer: [],
      player1: [],
      player1Score: 0,
      computerScore: 0,
      computerDeck: this.props.computer,
      player1Deck: this.props.player1,
      flipped: 'card',
      gameOver: false,
      message: ''
    }
  }

  componentWillMount() {
    const { computer, player1 } = this.props
    const { computerDeck } = this.state
    let deck = Object.assign({}, this.state, { player1Deck: player1, computerDeck: computer });
    let computerCards = { ...this.state };
    let cards = () => Math.floor(Math.random() * player1.length);
    let x;

    deck.computer.push(computer[cards()]);
    deck.computer.push(computer[cards()]);
    deck.player1.push(player1[cards()]);
    deck.player1.push(player1[cards()]);




    let removeFirstC = deck.computerDeck.indexOf(this.state.computer[0])
    let removeFirstP = deck.player1Deck.indexOf(this.state.player1[0])
    deck.computerDeck.splice(removeFirstC, 1);
    deck.player1Deck.splice(removeFirstP, 1);

    let removeSecondC = deck.computerDeck.indexOf(this.state.computer[1])
    let removeSecondP = deck.player1Deck.indexOf(this.state.player1[1])
    deck.computerDeck.splice(removeSecondC, 1);
    deck.player1Deck.splice(removeSecondP, 1);

    for (x in deck.player1) {
      let val = Object.keys(deck.player1[x]);

        switch(val[0]) {
          case "jack":
            val = 10;
            break;
          case "queen":
            val = 10;
            break;
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

      for (x in deck.computer) {
        let val = Object.keys(deck.computer[x]);

          switch(val[0]) {
            case "jack":
              val = 10;
              break;
            case "queen":
              val = 10;
              break;
            case "king":
              val = 10;
              break;
            case "ace":
              val = 1;
              break;
            default:
            val = parseInt(val);
          }
          deck.computerScore += val
        }

    this.setState(deck)
  }


  flipCard = () => {
    this.setState({
      flipped: 'card flipit'
    });
  }

  drawCard = () => {
    let state = Object.assign({}, this.state)
    let getCard = Math.floor(Math.random() * state.player1Deck.length)
    state.player1.push(state.player1Deck[getCard])
    let val = Object.keys(state.player1[state.player1.length - 1 ]);

    switch(val[0]) {
      case "jack":
        val = 10;
        break;
      case "queen":
        val = 10;
        break;
      case "king":
        val = 10;
        break;
      case "ace":
        val = 1;
        break;
      default:
      val = parseInt(val);
    }

    state.player1Score += val

    if (state.player1Score > 21) {
      state.flipped = 'card flipit'
      state.gameOver = true
      state.message = 'GAME OVER'
    }

    state.player1Deck.splice(getCard, 1)

    this.setState(state)
  }


  newGame = () => {
    window.location.reload()
  }

  handleStand = () => {
    const { player1Score, computerScore } = this.state

    player1Score > computerScore
      ? this.setState({ message: 'YOU WIN!', flipped: 'card flipit' })
      : this.setState({ message: 'GAME OVER', flipped: 'card flipit' })


  }


  render() {
    console.log("blackjack state", this.state);

    const { computer, player1 } = this.state

    // { this.state.gameOver ? this.flipCard() : null }


    return (
      <div className="App">
        <Grid>

          <Row>
            {this.state.computer.length &&
            <Col xs={4} xsOffset={4}>
              <h3>Computer:</h3>

              <div className="card-container">
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
                <div className="card" id="show">
                  <div className="front">

                    { Object.keys(computer[1]) } <br />
                    { Object.values(computer[1]) }

                  </div>
                  <div className="back">
                    <div className="photo"></div>
                  </div>

                </div>
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
              <h3>Player One:</h3> <br />
              Score: { this.state.player1Score }

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
