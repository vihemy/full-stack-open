import { useState, useEffect } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";
import Result from "./components/Result";

const SearchBar = ({ newSearch, handleSearchChange }) => {
  return (
    <div>
      find countries: <input value={newSearch} onChange={handleSearchChange} />
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState(null);
  const [newSearch, setNewSearch] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getAll().then((response) => setCountries(response));
  }, []);

  if (!countries) return null;

  const countriesToShow = countries.filter((c) =>
    c.name.common.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase())
  );

  const handleSearchChange = (event) => {
    event.preventDefault();
    setNewSearch(event.target.value);
  };

  const handleShowFullResult = (country) => {
    setNewSearch(country.name.common);
  };

  const getWeather = (country) => {
    return weatherService
      .get(country.capitalInfo.latlng)
      .then((returnedWeather) => {
        setWeather(returnedWeather);
      });
  };

  return (
    <>
      <SearchBar
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <Result
        filteredCountries={countriesToShow}
        handleShowFullResult={handleShowFullResult}
        getWeather={getWeather}
        weather={weather}
      />
    </>
  );
}

export default App;
