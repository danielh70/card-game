import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Grid, Row } from 'react-bootstrap';
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


  render() {
    const { userInfo } = this.props;

    return (
      <div className="App">
        <Grid>
          <Col xs={6}>
            <h2>{userInfo.name}'s Profile Page</h2>
            <p>You're email is {userInfo.email}</p>

            <h3>Your net worth is {this.props.chips}</h3>
          
            
          </Col>

          <Col xs={6}>
          </Col>
          
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