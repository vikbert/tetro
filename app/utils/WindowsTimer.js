export function clearAllIntervals()  {
  const maxIntervalId = window.setTimeout(() => false, 0);
  for (let index = 0; index < maxIntervalId; index += 1) {
    window.clearTimeout(index);
  }
};

