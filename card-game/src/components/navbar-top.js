import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { logoutUser, responsiveNav } from "../reducers/authReducer";
import "../css/main.css";




let NavTop = ({ isAuthed, dispatch, classes, history, userInfo,  children }) => {
	// console.log("classes....", classes)
	if (isAuthed) {
		return (
			<div>
			<div className={`nav-wrapper-top ${classes}`}>
				<NavLink to="/blackjack" className="nav-item" activeStyle={{ color: "red" }}>
					Blackjack
				</NavLink>
				<NavLink
					to={`/profile/${userInfo._id}`}
					activeStyle={{ color: "red" }}
					className="nav-item"
				>
					Profile
				</NavLink>
				<a className="log-out-button" onClick={() => dispatch(logoutUser(() => history.push("/")))}>
				Log Out
				</a>
				<button onClick={() => dispatch(responsiveNav())} className= "icon">
					<i id="dropdown-btn" className="fas fa-bars fa-1x"></i>
				</button>
			</div>

			
				<div id="footer">
					<Grid>
						<Col xs={3}>
							<a rel="noopener noreferrer" target="_blank" href="https://github.com/danielh70"> <i className="fab fa-github fa-3x"></i></a>
						</Col>
						<Col md={6} xs={6}>
								© Copyright - Daniel Hook <br />
							<a rel="noopener noreferrer" target="_blank" href="https://www.djhookdesigns.com/">My Portfolio</a> 
						</Col>
						<Col xs={3}>
							<a rel="noopener noreferrer" style={{margin: 5, padding: 5}} target="_blank" href="https://www.linkedin.com/in/daniel-hook-010101/"> <i className="fab fa-linkedin fa-3x"></i></a>
						</Col>
					</Grid>
				</div>
				{ children }
			</div>
		);
	}
	return (
		<div>
		<div className={`nav-wrapper-top ${classes}`}>
			<NavLink
				to="/blackjack"
				activeStyle={{ color: "red" }}
				className="nav-item"
			>
				Blackjack
			</NavLink>
			<NavLink
				to="/register"
				activeStyle={{ color: "red" }}
				className="nav-item"
			>
				Sign Up
			</NavLink>
			<NavLink
				to="/login"
				activeStyle={{ color: "red" }}
				className="log-out-button"
			>
				Login
			</NavLink>
			<button onClick={() => dispatch(responsiveNav())} className= "icon">
				<i id="dropdown-btn" className="fas fa-bars fa-1x"></i>
			</button>
		</div>

		<div>
		<div id="footer">
					<Grid>
						<Col xs={3}>
							<a rel="noopener noreferrer" target="_blank" href="https://github.com/danielh70"> <i className="fab fa-github fa-3x"></i></a>
						</Col>
						<Col md={6} xs={6}>
								© Copyright - Daniel Hook <br />
							<a rel="noopener noreferrer" target="_blank" href="https://www.djhookdesigns.com/">My Portfolio</a> 
						</Col>
						<Col xs={3}>
							<a rel="noopener noreferrer" style={{margin: 5, padding: 5}} target="_blank" href="https://www.linkedin.com/in/daniel-hook-010101/"> <i className="fab fa-linkedin fa-3x"></i></a>
						</Col>
					</Grid>
				</div>
				{ children }
			</div>
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
							
				
	