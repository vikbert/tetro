import {DECREMENT_TIME, PAUSE_TIME, START_TIME, RESET_TIME} from '../actions/timer';
import {clearAllIntervals} from '../utils/WindowsTimer';

const initState = {
  current: 5,
  isRunning: false,
  isCompleted: false,
  init: 1500,
};

export default function timer(state = initState, action) {
  switch (action.type) {
    case DECREMENT_TIME:
      if (state.current === 0) {
        clearAllIntervals();
        return {...state, isRunning: false, isCompleted: true, color: undefined};
      }

      return {...state, current: state.current - 1};
    case RESET_TIME:
      clearAllIntervals();
      return {...state, current: action.current, init: action.current, isRunning: false, isCompleted: false};
    case PAUSE_TIME:
      clearAllIntervals();
      return {...state, isRunning: false};
    case START_TIME:
      clearAllIntervals();
      return {...state, isRunning: true};
    default:
      return state;
  }
}
