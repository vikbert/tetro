export const DECREMENT_TIME = 'DECREMENT_TIME';
export const RESET_TIME = 'RESET_TIME';
export const PAUSE_TIME = 'PAUSE_TIME';
export const START_TIME = 'START_TIME';

export function decrement(timeId) {
  return {
    type: DECREMENT_TIME,
    timeId
  };
}

export function reset(current) {
  return {
    type: RESET_TIME,
    current,
  };
}

export function pause() {
  return {
    type: PAUSE_TIME,
  };
}

export function start() {
  return {
    type: START_TIME,
  };
}
