import React, { Component } from "react";
import { connect } from "react-redux";
import { socialAuthUser } from "../actions/auth";

class SocialAuthRedirect extends Component {
  componentWillMount() {
    const searchParams = new URLSearchParams(window.location.search);
    this.props.dispatch(
      socialAuthUser(searchParams.get("token"), () => {
        this.props.history.push("/profile");
      })
    );
  }

  render() {
    return <div />;
  }
}

SocialAuthRedirect = connect()(SocialAuthRedirect);

export default SocialAuthRedirect;