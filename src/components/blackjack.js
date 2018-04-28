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
      computerDeck: this.props.computer,
      player1Deck: this.props.player1,
      flipped: 'card',
      status: true
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log("nexprops", nextProps, "prevstate", prevState);
  // }

  componentDidMount() {
    const { computer, player1 } = this.props
    const { computerDeck } = this.state
    let deck = Object.assign({}, this.state, { player1Deck: player1, computerDeck: computer });
    let computerCards = { ...this.state };
    let cards = () => Math.floor(Math.random() * player1.length);

    deck.computer.push(computer[cards()]);
    deck.computer.push(computer[cards()]);

    let removeFirst = deck.computerDeck.indexOf(this.state.computer[0])
    deck.computerDeck.splice(removeFirst, 1);

    let removeSecond = deck.computerDeck.indexOf(this.state.computer[1])
    deck.computerDeck.splice(removeSecond, 1);

    // console.log(removeFirst, removeSecond);

    this.setState(deck)
  }


  flipCard = () => {
    this.setState({
      flipped: 'card flipit'
    });
  }

  drawCard = () => {
    let state = Object.assign([], this.state.player1Deck)

    state.splice(3, 1)
    // console.log(state);

    }



  render() {
    console.log("blackjack state", this.state);
    const { computer } = this.state

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
              <Button>Stand</Button> <br /><br />
              <Button>Double</Button> <br /><br />
            </Col>
            <Col xs={4} xsOffset={2}>
              <h3>Player One:</h3>

              <div className="card">
                hi?
              </div>
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }

}

export default Blackjack;
