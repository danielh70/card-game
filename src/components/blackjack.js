import React, { Component } from 'react';
import { Row, Grid, Col } from 'react-bootstrap';
import Loader from './loader';
import '../css/main.css';
// import '../css/App.css';


class Blackjack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      computer: []
    }
  }

  componentWillMount() {
    const { computer, player1 } = this.props
    let cards = () => Math.floor(Math.random() * player1.length);
    let compCard1 = computer[cards()];
    let compCard2 = player1[cards()];

    this.setState({ computer: [compCard1, compCard2]})
  }

  render() {
    console.log("blackjack state", this.state);
    const { computer } = this.state

    return (
      <div className="App">
        <Grid>

          <Row>
            <Col xs={4} xsOffset={4}>
              <h3>Computer:</h3>

              <div className="card-container">
                <div className="card">
                  <div className="front">

                    { Object.keys(computer[0]) } <br />
                    { Object.values(computer[0]) }

                  </div>
                  <div className="back">
                    <div className="photo"></div>
                  </div>

                </div>
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
          </Row>

          <Row>
            <Col xs={4} xsOffset={4}>
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
