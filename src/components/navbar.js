import React, { Component } from 'react';




class Navbar extends Component {
	state = {
		active: false,
		classes: []
	}

	toggleNav = () => {
		let currentState = this.state.classes.slice();
		if (this.state.classes[0] === 'nav-menu') {
			currentState[0] = 'nav-menu-closed';
		} else {
			currentState[0] = 'nav-menu';
		}

		this.setState({ classes: currentState })
	}


	render() {
		console.log(this.state)
		return (
			<div>
		    <input type="button" className="sidenav-button-a" onClick={this.toggleNav} />

				<div className="nav-wrapper">
					<div className={this.state.classes.join(' ')}>
						<div className="menu-items">
							Some info
							More info
							Hello world
						</div>
					</div>
				</div>


		    { this.props.children }
		  </div>
		)
	}
}


export default Navbar;
