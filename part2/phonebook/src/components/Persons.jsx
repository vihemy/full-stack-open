const Contact = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <Contact key={person.name} person={person} />
      ))}
    </div>
  );
};

export default Persons;
