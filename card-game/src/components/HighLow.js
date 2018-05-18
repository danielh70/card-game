import React, { Component } from 'react';
import { buildDeck } from '../actions/auth';
import Loader from './loader';
import { connect } from 'react-redux';
import styled from 'styled-components';

const HigherButton = styled.button`
  
`;

const LowerButton = styled.button`

`;

class HighLow extends Component {

  state = {
    deck: buildDeck(),
    inPlay: [],
  }


  flipCard = choice => {
    // if choice is higher && next card is higher, continue
    // if choice is higher && next card lower, lose
  }

  // setupGame = () => {
  //   let deck = this.props.buildDeck();

  //   this.setState({ deck: deck });
  // }

  render() {
    console.log("high/low state", this.state);
    return (
      <div>
        Welcome to High/Low!


        {/*<Loader />*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps, null)(HighLow);