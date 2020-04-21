const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '5c7875e9',
      s: searchTerm
    }
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <labe><b>Search for a movide</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
 `
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


const onInput = async (e) => {
  const movies = await fetchData(e.target.value);
  if (!movies.length) {
    dropdown.classList.remove('is-active');
    return;
  }
  resultsWrapper.innerHTML = '';
  dropdown.classList.add('is-active');
  for (let movie of movies) {
    const option = document.createElement('a');
    const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster;
    option.classList.add('dropdown-item');
    option.innerHTML = `
      <img src="${imgSRC}" />
      ${movie.Title}
    `
    option.addEventListener('click', e => {
      dropdown.classList.remove('is-active');
      input.value = movie.Title;
      onMovieSelect(movie)
    })
    resultsWrapper.appendChild(option);
  }
};

input.addEventListener('input', debounce(onInput, 1000));

document.addEventListener('click', e => {
  if (!root.contains(e.target)) {
    dropdown.classList.remove('is-active');
  }
})

const onMovieSelect = async (movie) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '5c7875e9',
      i: movie.imdbID
    }
  })

  console.log(response.data);

}