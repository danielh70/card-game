import React, { Component } from 'react';

class NavBar extends Component {
	state = {
		active: false,
		classes: []
	};

	toggleNav = () => {
		let currentState = this.state.classes.slice();
		if (this.state.classes[0] === 'nav-menu') {
			currentState[0] = 'nav-menu-closed';
		} else {
			currentState[0] = 'nav-menu';
		}

		this.setState({ classes: currentState });
	};


	render() {
		console.log(this.state);
		return (
			<div>
		   <button className="sidenav-button-a" onClick={this.toggleNav}><i style={{color: 'white'}} className="fas fa-caret-right"></i></button>
				<div className="nav-wrapper">
					<div className={this.state.classes.join(' ')}>
						<div className="menu-items">
							<h3>Highscores</h3>
							<ol>
								<li>
										Daniel Hook
								</li>
								<li>
										Daniel Hook
								</li>
								<li>
										Daniel Hook
								</li>
							</ol>
							<br />
							Rules: <br />     

							Aces count as 1 or 11<br />
							Player and computer operate off their own deck<br />
							The computer hits until at least a score of 17<br />
							
						</div>
					</div>
				</div>


		    { this.props.children }
		  </div>
		);
	}
}


export default NavBar;
