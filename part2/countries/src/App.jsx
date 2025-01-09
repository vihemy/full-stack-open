import axios from "axios";
import { useState, useEffect } from "react";

const SingleLineResult = ({ countryName }) => {
  return <p>{countryName}</p>;
};

const FullResult = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <p>
        <b>languages:</b>
        {console.log(country.languages)}
      </p>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={country.flags.alt}
        width={150}
        height={150}
      />
    </div>
  );
};

const Result = ({ filteredCountries }) => {
  let content;

  switch (true) {
    case !filteredCountries.length:
      content = <div>No country with this name.</div>;
      break;
    case filteredCountries.length > 10:
      content = <div>Too many matches, specify another filter</div>;
      break;
    case filteredCountries.length > 1:
      content = (
        <div>
          {filteredCountries.map((c) => (
            <SingleLineResult key={c.name.common} countryName={c.name.common} />
          ))}
        </div>
      );
      break;
    default:
      content = <FullResult country={filteredCountries[0]} />;
  }

  return <div>{content}</div>;
};

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

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  if (!countries) return null;

  const countriesToShow = countries.filter((c) =>
    c.name.common.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase())
  );

  const handleSearchChange = (event) => {
    event.preventDefault();
    setNewSearch(event.target.value);
  };

  return (
    <>
      <SearchBar
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <Result filteredCountries={countriesToShow} />
    </>
  );
}

export default App;
