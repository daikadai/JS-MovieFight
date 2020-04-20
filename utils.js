const debounce = (func, delay) => {
  let timeoutId;
  return (...arg) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func.apply(null, arg);
    }, delay)
  }
}