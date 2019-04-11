export const DECREMENT_TIME = 'DECREMENT_TIME';
export const RESET_TIME = 'RESET_TIME';

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
