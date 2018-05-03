import React, { Component } from 'react';
import { Grid, Col, Row, PageHeader } from 'react-bootstrap';

export default class NavTop extends Component {
	state = {
		names: 'nav-wrapper-top'
	}

	handleClick = () => {
		if (this.state.names === 'nav-wrapper-top') {
			this.setState({ names: 'nav-wrapper-top responsive'});	
		}
		else {
			this.setState({ names: 'nav-wrapper-top' });
		}
	}
	

	render() {
		console.log("navstate", this.state);
		return (
			<div>
				<div className={this.state.names}>
						
							<button  disabled>High/Low</button>
							<button  disabled>Solitaire</button>
							<button  disabled>War</button>
							<button  disabled>Blackjack</button>
				
							<button className= "icon" onClick={this.handleClick}>
								<i id="dropdown-btn" className="fas fa-bars fa-1x"></i>
							</button>
						
				</div>
							
					<div id="footer">
						<Grid>
							<Col xs={4}>
								<a target="_blank" href="https://github.com/danielh70"> <i className="fab fa-github fa-3x"></i></a>
							</Col>
							<Col xs={4}>
								© Copyright - Daniel Hook <br />
								<a target="_blank" href="https://www.djhookdesigns.com/">My Portfolio</a> 
							</Col>
								<a style={{margin: 5, padding: 5}} target="_blank" href="https://www.linkedin.com/in/daniel-hook-010101/"> <i className="fab fa-linkedin fa-3x"></i></a>
						</Grid>
					</div>
			</div>
		);
	}
}
