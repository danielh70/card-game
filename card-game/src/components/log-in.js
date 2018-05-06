import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-bootstrap';

const APIURL = 'http://localhost:3000';

export default class Login extends Component {

	state = {
		form: {
			username: '',	
			password:  ''
		}
	}

	// componentWillMount() {
	// 	fetch(`${APIURL}/authcheck`)
	// 	.then(res => {
	// 		console.log("res", res);
	// 	})
	// }

	handleChange = (e) => {
		let state = Object.assign({}, this.state.form);
		let target = e.target;
		
		state[target.name] = target.value;

		this.setState({ form: state });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state.form);

		fetch(`${APIURL}/login`, {
			method: "POST",
			headers: { 
				"content-type": 'application/json'
			},
			body: JSON.stringify(this.state.form),
			credentials: 'same-origin'
		})
		.then(res => {
			
			// res.json()
		})
		.then(res => {
			console.log("response", res);
			
		})
		.catch(e => console.log(e));
	}

	render() {
		const { password, username } = this.state.form
		console.log(this.state);
		return (
			<div>
				<Grid>
						<Col mdOffset={3} md={6} xs={12}>
						<div className="form-wrapper">
							<form onChange={this.handleChange} onSubmit={this.handleSubmit}>
								<label>username: </label>
								<input className="input-item" name="username" type="text" value={username} />
								<br />
								<label>Password: </label>
								<input className="input-item" name="password" type="password" value={password} />
								
								<br /> <br />
								<button id="custom-button" type="submit">Submit</button>
							</form>
							</div>
						</Col>
					
				</Grid>
			</div>
		);
	}
}
