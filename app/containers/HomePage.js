import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Home from '../components/Home';
import * as TimerActions from '../actions/timer'

function mapStateToProps(state) {
  return {
    isCompleted: state.timer.isCompleted,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TimerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
