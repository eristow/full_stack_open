import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
const api_key = process.env.REACT_APP_API_KEY;

function App() {
  const [countries, setCountries] = useState([]);
  const [filterText, setFilterText] = useState('');
  const maxDisplayCount = 10;
  const minDisplayCount = 1;
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [weatherResult, setWeatherResult] = useState('');
  const [weatherGot, setWeatherGot] = useState(false);
  let filterResult = '';

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    setCountriesToShow(
      filterText === ''
        ? countries
        : countries.filter(country =>
            country.name.toLowerCase().includes(filterText.toLowerCase()),
          ),
    );
  }, [filterText, countries]);

  useEffect(() => {
    if (countriesToShow.length === 1 && !weatherGot) {
      setWeatherGot(true);
      const country = countriesToShow[0];
      const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`;

      axios.get(url).then(response => {
        console.log(response.data);
        if (response.data.success === false) {
          setWeatherResult(<h2>Error getting weather</h2>);
        } else {
          const weather = response.data.current;
          setWeatherResult(
            <div>
              <h2>{`Weather in ${country.capital}`}</h2>
              <p>
                <strong>Temperature: </strong>
                {weather.temp} Celsius
              </p>
              <img src={weather.weather_icons[0]} alt="weather icon" />
              <p>
                <strong>Wind: </strong>
                {weather.wind_speed} mph direction {weather.wind_dir}
              </p>
            </div>,
          );
          console.log(weatherResult);
        }
      });
    } else {
      setWeatherGot(false);
      setWeatherResult('');
    }
  }, [countriesToShow]);

  const handleFilterText = event => {
    setFilterText(event.target.value);
  };

  const handleShowButton = index => {
    setCountriesToShow([countriesToShow[index]]);
  };

  if (countriesToShow.length > maxDisplayCount) {
    filterResult = <p>Too many matches, refine your search</p>;
  } else if (countriesToShow.length > minDisplayCount) {
    filterResult = countriesToShow.map((country, i) => (
      <div key={country.name}>
        {country.name}
        <button type="button" onClick={() => handleShowButton(i)}>
          show
        </button>
      </div>
    ));
  } else if (countriesToShow.length === minDisplayCount) {
    const country = countriesToShow[0];
    filterResult = (
      <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {country.languages.map(language => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img
          style={{ width: '150px' }}
          alt={`${country.name} flag`}
          src={country.flag}
        />
      </div>
    );
  }

  return (
    <div>
      <Filter filterText={filterText} handleFilterText={handleFilterText} />
      {filterResult}
      {weatherResult}
    </div>
  );
}

export default App;
