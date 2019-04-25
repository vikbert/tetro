export const DECREMENT_TIME = 'DECREMENT_TIME';
export const RESET_TIME = 'RESET_TIME';
export const INIT_TIME = 'INIT_TIME';
export const PAUSE_TIME = 'PAUSE_TIME';

export function decrement(timeId) {
  return {
    type: DECREMENT_TIME,
    timeId
  };
}

export function reset(timeId) {
  return {
    type: RESET_TIME,
    timeId
  };
}

export function init(seconds) {
  return {
    type: INIT_TIME,
    seconds
  };
}

export function pause() {
  return {
    type: RESET_TIME,
  };
}
