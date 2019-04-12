import {DECREMENT_TIME, RESET_TIME, PAUSE_TIME} from '../actions/timer';

const initState = {
  seconds: 5,
  isPaused: false,
  isCompleted: false,
  init: 1500,
};

const clearAllIntervals = () => {
  const maxIntervalId = window.setTimeout(() => false, 0);
  for (let index = 0; index < maxIntervalId; index += 1) {
    window.clearTimeout(index);
  }
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
      return {...state, seconds: state.init, isPaused: false};
    case PAUSE_TIME:
      return {...state, isPaused: true};
    default:
      return state;
  }
}
