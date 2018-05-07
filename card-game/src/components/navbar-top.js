import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { logoutUser } from "../reducer";


const APIURL = 'http://localhost:3000'

let NavTop = ({ isAuthed, dispatch, history, userInfo }) => {
  if (isAuthed) {
    return (
      <div style={{ display: "flex" }}>
        <NavLink
          exact
          to="/"
          style={{ flexGrow: 10 }}
          activeStyle={{ color: "red" }}
        >
          Home
        </NavLink>
        <NavLink
          to={`/profile/${userInfo._id}`}
          style={{ flexGrow: 1 }}
          activeStyle={{ color: "red" }}
        >
          Profile
        </NavLink>
        <div
          onClick={() => dispatch(logoutUser(() => history.push("/")))}
          style={{ flexGrow: 1 }}
        >
          Logout
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex" }}>
      <NavLink
        exact
        to="/"
        style={{ flexGrow: 10 }}
        activeStyle={{ color: "red" }}
      >
        Home
      </NavLink>
      <NavLink
        to="/register"
        style={{ flexGrow: 1 }}
        activeStyle={{ color: "red" }}
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        style={{ flexGrow: 1 }}
        activeStyle={{ color: "red" }}
      >
        Login
      </NavLink>
    </div>
  );
};





















// class NavTop extends Component {

// 	static propTypes = {
// 		children: PropTypes.oneOfType([
// 			PropTypes.arrayOf(PropTypes.node),
// 			PropTypes.node
// 		]).isRequired
// 	};

// 	state = {
// 		names: 'nav-wrapper-top'
// 	};

// 	handleClick = () => {
// 		if (this.state.names === 'nav-wrapper-top') {
// 			this.setState({ names: 'nav-wrapper-top responsive'});	
// 		}
// 		else {
// 			this.setState({ names: 'nav-wrapper-top' });
// 		}
// 	};

// 	logOut = () => {
// 		fetch(`${APIURL}/users/logout`, { mode: 'cors' })
// 			.then(res => res.json())
// 			.then(res => console.log(res))
// 	}
	


// }

const mapStateToProps = state => {
  return state;
};

NavTop = connect(mapStateToProps, null)(NavTop);

export default withRouter(NavTop);



	// render() {
		
	// 	return (
	// 		<div>
	// 			<div className={this.state.names}>
						
	// 				<button  disabled>High/Low</button>
	// 				<button  disabled>Solitaire</button>
	// 				<button ><a href="/">Home</a></button>
	// 				<button  disabled>Blackjack</button>
	// 				<button><a href="/register">Sign Up</a></button>
	// 				<button><a href="/login">Log In</a></button>
	// 				<button onClick={this.logOut}>Log Out</button>
				

	// 				<button className= "icon" onClick={this.handleClick}>
	// 					<i id="dropdown-btn" className="fas fa-bars fa-1x"></i>
	// 				</button>
						
	// 			</div>
							
	// 			<div id="footer">
	// 				<Grid>
	// 					<Col xs={3}>
	// 						<a rel="noopener noreferrer" target="_blank" href="https://github.com/danielh70"> <i className="fab fa-github fa-3x"></i></a>
	// 					</Col>
	// 					<Col md={6} xs={6}>
	// 							© Copyright - Daniel Hook <br />
	// 						<a rel="noopener noreferrer" target="_blank" href="https://www.djhookdesigns.com/">My Portfolio</a> 
	// 					</Col>
	// 					<Col xs={3}>
	// 						<a rel="noopener noreferrer" style={{margin: 5, padding: 5}} target="_blank" href="https://www.linkedin.com/in/daniel-hook-010101/"> <i className="fab fa-linkedin fa-3x"></i></a>
	// 					</Col>
	// 				</Grid>
	// 			</div>
	// 			{ this.props.children }
	// 		</div>
	// 	);
	// }