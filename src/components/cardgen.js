import React, { Component } from 'react';
import { Row, Grid, Col } from 'react-bootstrap';
import Loader from './loader';
import '../css/App.css';


class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: [],
      computer: [],
      loading: false,
			player1Wins: 0,
			computerWins: 0
    }
  }

  handleClick = (e) => {
    this.props.handleCardSelect(e)
  }

	handlePick = (e) => {
		let currentCard = () => Math.floor(Math.random() * this.props.cards.length)

    this.setState({
      player1: this.props.cards[currentCard()],
      computer: this.props.computer[currentCard()]
    })
	}


  render() {
		console.log(this.state);

    return (
      <div className="App">
        { this.state.loading && <Loader /> }
        <button onClick={this.handlePick}>Pick Card</button>
				<Grid>
					Player:
					<Row>
            <Col xs={4}>
              Player Deck:
              <div id="player-deck">{ this.props.cardsWins }</div>
            </Col>
            <Col xs={4}>
              <div className="card">
                { Object.keys(this.state.computer) } { Object.values(this.state.computer) }
              </div>
               <div className="card">
                 { Object.keys(this.state.computer) } { Object.values(this.state.computer) }
               </div>
             </Col>
            <Col xs={4}>
							Computer Deck:
              <div id="computer-deck">{ this.props.computerWins }</div>
            </Col>
					</Row>
					Computer:
				</Grid>
      </div>
    );
  }
}

export default Cards;





  // { Object.keys(this.state.player1) } { Object.values(this.state.player1) }



// { this.props.cards.map(( el, i ) => {
//   let vals = Object.values(el)
//   let card = Object.keys(el)
//
//   return (
//     <Col key={i} lg={4} md={6} xs={12} className="card">
//       <a id={i} onClick={this.handleClick}> { card } { vals } </a>
//     </Col>
//   )
// })}

// var switcher = ( i % 4 ) === 0 ? this.num++ : null;
