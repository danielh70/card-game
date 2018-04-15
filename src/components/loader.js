import React, { Component} from 'react';
import '../css/loader.css';

class Loader extends Component {
  render() {
    return (
      <div id="loader-wrapper">
        <div id="loader"></div>
      </div>
    )
  }
}

export default Loader;
