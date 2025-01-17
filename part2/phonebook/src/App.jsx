import { useEffect, useState } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearchText, setNewSearchText] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState("green");

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

    if (person) {
      const changedPerson = { ...person, number: newNumber };
      updateNumber(person.id, changedPerson);
    } else {
      createPerson();
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

  const handleRemovePerson = (personToRemove) => {
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      personService.remove(personToRemove.id).then(() => {
        setPersons(persons.filter((p) => p.id !== personToRemove.id));
      });
    }
  };

  function updateNumber(id, changedPerson) {
    if (
      window.confirm(
        `${changedPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personService
        .update(id, changedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map((p) => (p.id === id ? returnedPerson : p)));
          notifySuccess(`Number of ${returnedPerson.name} has been updated`);
          resetFields();
        })
        .catch((error) => {
          notifyError(error.response.data.error);
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
        notifySuccess(`${returnedPerson.name} has been added`);
        resetFields();
      })
      .catch((error) => {
        notifyError(error.response.data.error);
      });
  }

  function handleUpdateError(changedPerson) {
    notifyError(
      `Information of ${changedPerson.name} has already been removed from server.`
    );
    personService
      .getAll()
      .then((returnedPersons) => setPersons(returnedPersons));
  }

  function notifySuccess(message) {
    notify(message, "green");
  }

  function notifyError(message) {
    notify(message, "red");
  }

  function notify(message, color) {
    setNotification(message);
    setNotificationColor(color);
    setTimeout(() => setNotification(null), 5000);
  }

  function resetFields() {
    setNewName("");
    setNewNumber("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} color={notificationColor} />
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
