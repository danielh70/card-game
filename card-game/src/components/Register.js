import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../reducers/authReducer";
import SocialLoginLinks from "./SocialLoginLinks";
import { Col } from 'react-bootstrap';

class Register extends Component {
  state = {
    unMatchPwd: ""
  };

  handleFormSubmit = e => {
    e.preventDefault();
    if (this.password.value !== this.password2.value) {
      this.setState({ unMatchPwd: "Doesn't match!" });
      return;
    } else {
      this.setState({ unMatchPwd: "" });
    }
    const payLoad = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    };
    this.props.dispatch(
      registerUser(payLoad, () => {
        this.clearForm();
        this.props.history.push("/profile");
      })
    );
  };

  clearForm = () => {
    this.name.value = "";
    this.email.value = "";
    this.password.value = "";
    this.password2.value = "";
  };

  render() {
    const { registerErrors } = this.props;
    const { unMatchPwd } = this.state;

    return (
    	<Col lgOffset={4} lg={4} mdOffset={3} md={6} xs={12}>
      <div className="form-wrapper">

        <form onSubmit={this.handleFormSubmit}>
          
          

          <label>User Name</label>
          <input
            type="text"
            ref={node => {
              this.name = node;
            }}
            required
            maxLength="50"
            autoFocus
            className="input-item"
          />
          
          <span style={{ color: "red", marginLeft: 8 }}>
            {registerErrors.name}
          </span>
          <br />

          <label>Email Address</label>
          <input
            type="email"
            ref={node => {
              this.email = node;
            }}
            required
            maxLength="50"
            className="input-item"
            
          />
          
          <span style={{ color: "red", marginLeft: 8 }}>
            {registerErrors.email}
          </span>
          <br />

          <label>Password</label>
          <input
            type="password"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
            title="Password must be at least 8 characters and include at least 1 uppercase character, 1 lowercase character, and 1 number."
            
            ref={node => {
              this.password = node;
            }}
            required
            minLength="8"
            maxLength="50"
            className="input-item"
          />
          
          <span style={{ color: "red", marginLeft: 8 }}>
            {registerErrors.password}
          </span>
          <br />

          <label>Confirm Password</label>
          <input
            type="password"
            ref={node => {
              this.password2 = node;
            }}
            required
            maxLength="50"
            className="input-item"
          />
          
          <span style={{ color: "red", marginLeft: 8 }}>{unMatchPwd}</span>
          <br />

          <input
            type="submit"
            value="Submit!"
            id="custom-button"
          />
        </form>
        <SocialLoginLinks />
      </div>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

Register = connect(mapStateToProps, null)(Register);

export default Register;