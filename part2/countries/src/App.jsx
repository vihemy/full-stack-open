import { useState } from "react";

const SearchBar = ({ newSearch, handleSearchChange }) => {
  return (
    <div>
      name: <input value={newSearch} onChange={handleSearchChange} />
    </div>
  );
};

function App() {
  const [newSearch, setNewSearch] = useState("");

  const handleSearchChange = (event) => setNewSearch(event.target.value);

  return (
    <>
      <SearchBar
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
    </>
  );
}

export default App;
