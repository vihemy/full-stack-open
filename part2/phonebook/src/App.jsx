import { useEffect, useState } from "react";
import PersonService from "./services/persons";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Arto Hellas");
  const [newNumber, setNewNumber] = useState("88888888");
  const [newSearchText, setNewSearchText] = useState("");

  useEffect(() => {
    PersonService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personsToShow = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(newSearchText.toLocaleLowerCase())
  );

  const addContact = (event) => {
    event.preventDefault();
    persons.some((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : createContact();

    function createContact() {
      PersonService.create({
        name: newName,
        number: newNumber,
      }).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewSearchText(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newSearchText={newSearchText}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new contact</h3>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
