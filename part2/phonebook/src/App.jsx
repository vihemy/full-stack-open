import { useState } from "react";

const Number = ({ person }) => {
  return <p>{person.name}</p>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Arto Hellas");

  const addNumber = (event) => {
    event.preventDefault();
    const numberObject = {
      name: newName,
      id: String(persons.length + 1),
    };
    setPersons(persons.concat(numberObject));
    setNewName("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Number key={person.name} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
