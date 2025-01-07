import { useEffect, useState } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearchText, setNewSearchText] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personsToShow = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(newSearchText.toLocaleLowerCase())
  );

  const handleAddPerson = (event) => {
    event.preventDefault();
    const person = persons.find((p) => p.name === newName);
    console.log(person);

    if (person) {
      const changedPerson = { ...person, number: newNumber };
      updateNumber(person.id, changedPerson);
    } else {
      createPerson();
    }
  };

  function updateNumber(id, changedPerson) {
    if (
      window.confirm(
        `${changedPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personService.update(id, changedPerson).then((returnedPerson) => {
        setPersons(persons.map((p) => (p.id === id ? returnedPerson : p)));
        notifyAndReset(`Number of ${returnedPerson.name} has been updated`);
      });
    }
  }

  function createPerson() {
    personService
      .create({
        name: newName,
        number: newNumber,
      })
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        notifyAndReset(`${returnedPerson.name} has been added`);
      });
  }

  const handleFilterChange = (event) => {
    setNewSearchText(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleRemovePerson = (personToRemove) => {
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      personService.remove(personToRemove.id).then((returnedPerson) => {
        setPersons(persons.filter((p) => p.id !== returnedPerson.id));
        // notifyAndReset(`${returnedPerson.name} has been deleted`);
      });
    }
  };

  function notifyAndReset(message) {
    setNotification(message);
    setTimeout(() => setNotification(null), 5000);
    setNewName("");
    setNewNumber("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter
        newSearchText={newSearchText}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new person</h3>
      <PersonForm
        handleAddPerson={handleAddPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        handleRemovePerson={handleRemovePerson}
      />
    </div>
  );
};

export default App;
