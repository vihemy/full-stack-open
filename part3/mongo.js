const mongoose = require('mongoose');

if (process.argv.length < 3 || process.argv.length === 4) {
  console.log(
    'To get all entries, give password as argument.\nTo add an entry, give password, name and number as arguments'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://vihemy:${password}@cluster0.pojsc.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  console.log('phonebook:');
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log('person saved:', result);
    mongoose.connection.close();
  });
}
