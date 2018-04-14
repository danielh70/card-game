import React, { Component } from 'react';
import { Row, Grid, Col } from 'react-bootstrap';
import '../App.css';


class Cards extends Component {

	//
	// handleCardFlip = () => {
	//
	// }

  render() {
		console.log(this.props);
    return (
      <div className="App">
				<Grid>
						<Row>
							{ this.props.cards.map(( el, i ) => {
								let vals = Object.values(el)
								let card = Object.keys(el)

								return (
									<Col key={i} lg={4} md={6} xs={12} className="card">
										{ card } { vals }
									</Col>
								)
							})}
						</Row>
					</Grid>
      </div>
    );
  }
}

export default Cards;

// var switcher = ( i % 4 ) === 0 ? this.num++ : null;
