import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import api from '../api';

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

	// loginUser = (userInfo, redirect) => async dispatch => {
	//   try {
	//     let { data } = await api.login(userInfo);
	//     saveToken(data.token);
	//     dispatch(authUser(data.userInfo));
	//     redirect();
	//   } catch (e) {
	//     if (!e.response) {
	//       console.log(e);
	//       return;
	//     }
	//     let { data } = e.response;
	//     dispatch(loginFail(data));
	//   }
	// };

	render() {
		const { password, username } = this.state.form
		console.log(this.state);
		return (
			<div>
				<Grid>
						<Col mdOffset={3} md={6} xs={12}>
						<div className="form-wrapper">
							<form onChange={this.handleChange} onSubmit={this.loginUser}>
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
