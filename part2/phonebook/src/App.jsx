import { useEffect, useState } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearchText, setNewSearchText] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personsToShow = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(newSearchText.toLocaleLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    persons.some((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : createPerson();

    function createPerson() {
      personService
        .create({
          name: newName,
          number: newNumber,
        })
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        });
    }
  };

  const handleFilterChange = (event) => {
    setNewSearchText(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const removePerson = (personToRemove) => {
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      personService.remove(personToRemove.id).then((returnedPerson) => {
        setPersons(persons.filter((p) => p.id !== returnedPerson.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newSearchText={newSearchText}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new person</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
