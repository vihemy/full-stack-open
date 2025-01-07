const Person = ({ person, handleRemovePerson }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => handleRemovePerson(person)}>delete</button>
    </p>
  );
};

const Persons = ({ personsToShow, handleRemovePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <Person
          key={person.name}
          person={person}
          handleRemovePerson={handleRemovePerson}
        />
      ))}
    </div>
  );
};

export default Persons;
