const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '5c7875e9',
      s: searchTerm
    }
  });

  console.log(response.data);
};

const input = document.querySelector('input');

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
const onInput = (e) => {
  fetchData(e.target.value);
};

input.addEventListener('input', debounce(onInput, 1000));