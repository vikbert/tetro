import {DECREMENT_TIME, RESET_TIME} from '../actions/timer';

const initState = {
  seconds: 1500,
  isPaused: false,
  init: 1500,
};

const clearAllIntervals = () => {
  const maxIntervalId = window.setTimeout(() => false, 0);
  for (let index = 0; index < maxIntervalId; index += 1) {
    window.clearTimeout(index);
  }
};

export default function timer(state = initState, action) {
  switch (action.type) {
    case DECREMENT_TIME:
      if (state.seconds === 0) {
        clearAllIntervals();
        return {...state, isPaused: true};
      }

      return state.seconds > 0 ? {...state, seconds: state.seconds - 1} : state;
    case RESET_TIME:
      return {...state, seconds: state.init, isPaused: false};
    default:
      return state;
  }
}
