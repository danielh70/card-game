import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../reducers/authReducer";
import SocialLoginLinks from "./SocialLoginLinks";
import { Col, Row, Grid } from 'react-bootstrap';

class Login extends Component {
	handleFormSubmit = async e => {
		e.preventDefault();
		const payload = {
			email: this.email.value,
			password: this.password.value
		};
		this.props.dispatch(
			loginUser(payload, () => {
				this.clearForm();
				const { from } = this.props.location.state || {
					from: { pathname: "/profile" }
				};
				this.props.history.push(from.pathname);
			})
		);
	};

	clearForm = () => {
		this.email.value = "";
		this.password.value = "";
	};

	render() {
		const { loginErrors } = this.props;

		return (
			<Col lgOffset={4} lg={4} mdOffset={3} md={6} xs={12}>
			<div className="form-wrapper">
				<form onSubmit={this.handleFormSubmit}>	
					<label>Email Address</label>
					<input
						type="email"
						ref={node => {
							this.email = node;
						}}
						required
						maxLength="50"
						autoFocus
						className="input-item"
					/>
					
					<span style={{ color: "red", marginLeft: 8 }}>
						{loginErrors.email}
					</span>
					<br />

					<label>Password</label>
					<input
						type="password"
						ref={node => {
							this.password = node;
						}}
						required
						maxLength="50"
						
						className="input-item"
					/>
					
					<span style={{ color: "red", marginLeft: 8 }}>
						{loginErrors.password}
					</span>
					<br />

					<input id="custom-button" type="submit" value="Submit!" />
				</form>
				
			</div>
			</Col>
		);
	}
}

const mapStateToProps = state => {
	return state;
};

Login = connect(mapStateToProps, null)(Login);

export default Login;