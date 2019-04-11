import {DECREMENT_TIME} from '../actions/timer';

export default function timer(state: timer = 1500, action) {
  switch (action.type) {
    case DECREMENT_TIME:
      return state > 0 ? state - 1 : state;
    default:
      return state;
  }
}
