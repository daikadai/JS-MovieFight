const createAutoComplete = ({ root, renderOption }) => {
  root.innerHTML = `
  <labe><b>Search for a movide</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
 `
  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');


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
      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(movie);
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
}