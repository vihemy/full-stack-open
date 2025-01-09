import axios from "axios";
import { useState, useEffect } from "react";
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
