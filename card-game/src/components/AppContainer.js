import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { reAuthUser } from "../reducer";
import NavTop from "./navbar-top";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import SocialAuthRedirect from "./SocialAuthRedirect";
import Profile from "./Profile";
import NavBar from './NavBar';
import PrivateRoute from "./PrivateRoute";

class AppContainer extends Component {
  componentWillMount() {
    this.props.dispatch(reAuthUser(() => this.props.history.push("/login")));
  }

  render() {
    return (
    	
      <Router>
      	<div>
      	<NavBar>
        	<NavTop />          
          <Route exact path="/" component={Home} />
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