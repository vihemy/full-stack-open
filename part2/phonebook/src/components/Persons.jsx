const Person = ({ person, removePerson }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => removePerson(person)}>delete</button>
    </p>
  );
};

const Persons = ({ personsToShow, removePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <Person key={person.name} person={person} removePerson={removePerson} />
      ))}
    </div>
  );
};

export default Persons;
