import { useState } from "react";

const Contact = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Arto Hellas");
  const [newNumber, setNewNumber] = useState("88888888");

  const addContact = (event) => {
    event.preventDefault();
    persons.some((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : createContact();

    function createContact() {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Contact key={person.name} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
