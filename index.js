const fetchData = async () => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '5c7875e9',
      s: 'avengers'
    }
  });

  console.log(response.data);

};

fetchData();
