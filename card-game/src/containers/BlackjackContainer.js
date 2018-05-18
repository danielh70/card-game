import { connect } from 'react-redux';
import Blackjack from '../components/blackjack';
import { getChips, adjustChips } from '../actions/auth';

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    getChips: userInfo => {
      dispatch(getChips(userInfo))
    },
    adjustChips: userInfo => {
      dispatch(adjustChips(userInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blackjack);