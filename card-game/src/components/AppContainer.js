import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { reAuthUser, getChips } from "../actions/auth";
import NavTop from "./navbar-top";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import SocialAuthRedirect from "./SocialAuthRedirect";
import Profile from "./Profile";
import NavBar from './NavBar';
import HighLow from './HighLow';
import PrivateRoute from "./PrivateRoute";
import Blackjack from './blackjack';
import Loader from './loader';
import '../index.css';

class AppContainer extends Component {
  componentWillMount() {
    this.props.dispatch(reAuthUser(() => this.props.history.push("/login")));
  }

  render() {
    return (    	
      <Router>
      	<div>
	      	<NavBar>
		        <NavTop>          
		          <Route exact path="/"               component={Blackjack} />
		          <Route exact path="/blackjack"      component={Blackjack} />
              <Route exact path="/highlow"        component={HighLow} />
		          <Route path="/register"             component={Register} />
		          <Route path="/login"                component={Login} />
		          <Route path="/socialauthredirect/"  component={SocialAuthRedirect} />
		          <PrivateRoute path="/profile/:uid?" component={Profile} />
            </NavTop>
	        </NavBar>
      	</div>
      </Router>
    );
  }
}

AppContainer = connect()(AppContainer);

export default AppContainer;