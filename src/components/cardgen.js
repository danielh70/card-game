import React, { Component } from 'react';
import { Row, Grid, Col } from 'react-bootstrap';
import Loader from './loader';
import '../css/App.css';


class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: [],
      computer: {},
      loading: false
    }
  }

  handleClick = (e) => {
    this.props.handleCardSelect(e)
  }

	handlePick = (e) => {
		// let cardId = parseInt(e.target.id);
    let currentCard = Math.floor(Math.random() * this.props.cards.length)

    this.setState({ player1: this.props.cards[currentCard] })
    console.log(currentCard);
	}

	componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     loading: false
    //   })
    // }, 2000)
	}

  render() {
		console.log(this.state.player1);


    return (
      <div className="App">
        { this.state.loading && <Loader /> }
        <button onClick={this.handlePick}>Pick Card</button>
				<Grid>
					<Row>
            <div className="card">
              { Object.values(this.state.player1) }
            </div>
					</Row>
				</Grid>
      </div>
    );
  }
}

export default Cards;

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
