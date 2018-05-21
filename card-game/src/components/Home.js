import React, { Component } from 'react';
import '../css/main.css';

export default class Home extends Component {
  render() {
    return (
      <div className="hand">
        <div style={{margin: 300}} className="card-test rank5S">
        10 <br />&diams;
        </div>
        <div style={{margin: 300}} className="card-test rank7S">
        10 <br />&diams;
        </div>
        <div style={{margin: 300}} className="card-test rank11S">
        10 <br />&diams;
        </div>
      </div>
    );
  }
}


