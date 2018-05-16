import React, { Fragment } from 'react';
import '../css/main.css';

const PokerChip = ({ value, onClick }) => (
  <Fragment>
    <input
      type="submit"
      onClick={onClick}
      value={value}
      className="pokerchip flat"
    />
  </Fragment>
);


export default PokerChip;