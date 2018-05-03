import React, { Component } from 'react';


class Navbar extends Component {
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
							Other games: <br />

							War (coming soon)<br />
							Solitare (coming soon)<br />
							Multiplayer (coming soon)<br />
						</div>
					</div>
				</div>


		    { this.props.children }
		  </div>
		);
	}
}


export default Navbar;
