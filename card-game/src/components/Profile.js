import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Grid, Row } from 'react-bootstrap';
import { getChips } from '../actions/auth';
import '../css/main.css';
import api from "../api";

class Profile extends Component {
  state = {
    code: ""
  };

  // handleSecret = async () => {
  //   try {
  //     let { data } = await api.getSecret(this.props.match.params.uid);
  //     this.setState({ code: data.code });
  //   } catch (e) {
  //     if (!e.response) {
  //       console.log(e);
  //       return;
  //     }
  //     let { data } = e.response;
  //     this.setState({ code: data.code });
  //   }
  // };

  componentDidMount() {
    this.props.dispatch(getChips(this.props.userInfo))
  }

  resetChips = () => {
    api.resetChips(this.props.userInfo);
    window.location.reload();
  }


  render() {
    const { userInfo } = this.props;
    // console.log("props prifle", this.props);

    return (
      <div className="App">
        <Grid>
        <Row>
          <Col xs={6}>
            <h2>{userInfo.name}'s Profile Page</h2>
            <p>You're email is {userInfo.email}</p>

            <h3>Your net worth is {this.props.chips} chips</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <h2>Out of chips? We got freebies</h2> 
            <br />
            <br />
            <button id="custom-button" disabled={this.props.chips >= 1} onClick={this.resetChips}>Get chips</button>
          </Col>
        </Row>
          
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

Profile = connect(mapStateToProps, null)(Profile);

export default Profile;