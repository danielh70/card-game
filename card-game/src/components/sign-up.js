import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-bootstrap';

const APIURL = 'http://localhost:3000/register'

export default class Signup extends Component {

	state = {
		form: {
			username: '',
			password:  '',
			email: ''	
		}
	}

	handleChange = (e) => {
		let state = Object.assign({}, this.state.form);
		let target = e.target;
		
		state[target.name] = target.value;

		this.setState({ form: state });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state.form);

		fetch(APIURL, {
			method: "POST",
			headers: { "content-type": 'application/json' },
			body: JSON.stringify(this.state.form)
		})
		.then(res => res.json())
		.then(res => {
			console.log("response", res);
		})
		.catch(e => console.log(e));
	}

	render() {
		const { username, password, email } = this.state.form
		console.log(this.state);
		return (
			<div>
				<Grid>
					

						<Col mdOffset={3} md={6} xs={12}>
						<div className="form-wrapper">
							<form onChange={this.handleChange} onSubmit={this.handleSubmit}>
								<label>Username: </label>
									<input className="input-item" name="username" type="text" value={username} />
									<br />
									<label>Password: </label>
									<input className="input-item" name="password" type="password" value={password} />
									<br />
									<label>Email: </label>
									<input className="input-item" name="email" type="text" value={email} />
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
