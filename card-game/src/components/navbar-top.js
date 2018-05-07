import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class NavTop extends Component {

	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.node),
			PropTypes.node
		]).isRequired
	};

	state = {
		names: 'nav-wrapper-top'
	};

	handleClick = () => {
		if (this.state.names === 'nav-wrapper-top') {
			this.setState({ names: 'nav-wrapper-top responsive'});	
		}
		else {
			this.setState({ names: 'nav-wrapper-top' });
		}
	};
	

	render() {
		
		return (
			<div>
				<div className={this.state.names}>
						
					<button  disabled>High/Low</button>
					<button  disabled>Solitaire</button>
					<button ><a href="/">Home</a></button>
					<button  disabled>Blackjack</button>
					<button><a href="/signup">Sign Up</a></button>
				

					<button className= "icon" onClick={this.handleClick}>
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
				{ this.props.children }
			</div>
		);
	}
}