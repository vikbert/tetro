import {DECREMENT_TIME, PAUSE_TIME, RESET_TIME} from '../actions/timer';
import {clearAllIntervals} from '../utils/WindowsTimer';

const initState = {
  seconds: 5,
  isPaused: false,
  isCompleted: false,
  init: 1500,
};

const onSecondsEqualZero = state => {
  clearAllIntervals();

  return {...state, isPaused: true, isCompleted: true, color: undefined};
};

export default function timer(state = initState, action) {
  switch (action.type) {
    case DECREMENT_TIME:
      if (state.seconds === 0) {
        return onSecondsEqualZero(state);
      }

      return state.seconds > 0 ? {...state, seconds: state.seconds - 1} : state;
    case RESET_TIME:
      clearAllIntervals();
      return {...state, seconds: state.init, isPaused: false, isCompleted: false};
    case PAUSE_TIME:
      return {...state, isPaused: true};
    default:
      return state;
  }
}
