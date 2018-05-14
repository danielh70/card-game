import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { reAuthUser } from "../reducers/authReducer";
import NavTop from "./navbar-top";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import SocialAuthRedirect from "./SocialAuthRedirect";
import Profile from "./Profile";
import NavBar from './NavBar';
import PrivateRoute from "./PrivateRoute";
import Blackjack from './blackjack';
import Loader from './loader';
import '../index.css';

class AppContainer extends Component {
  componentWillMount() {
    this.props.dispatch(reAuthUser(() => this.props.history.push("/login")));
  }

    buildDeck = (deck = []) => {
  	let suits = [ 'suithearts', 'suitspades', 'suitdiamonds', 'suitclubs' ];
  	let numbers = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A' ];

  	for (var i = 0; i < numbers.length; i++) {
  		for (var j = 0; j < 4; j++) {
  			deck.push({
  				[numbers[i]]: suits[j]
  			});
  		}
  	}
  	return deck;
  };


  render() {
    return (
    	
      <Router>
      	<div>
	      	<NavBar>
		        	<NavTop />          
		          <Route exact path="/" render={props => {
		          		return <Blackjack buildDeck={this.buildDeck} />
		          }} />
		          <Route exact path="/blackjack" render={props => {
		          		return <Blackjack buildDeck={this.buildDeck} />
		          }} />
		          <Route path="/register" component={Register} />
		          <Route path="/login" component={Login} />
		          <Route path="/socialauthredirect/" component={SocialAuthRedirect} />
		          <PrivateRoute path="/profile/:uid?" component={Profile} />
	          </NavBar>
      	</div>
      </Router>
      
    );
  }
}

AppContainer = connect()(AppContainer);

export default AppContainer;