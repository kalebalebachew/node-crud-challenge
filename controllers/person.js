const { v4: uuidv4 } = require('uuid');

const getAllPersons = (req, res) => {
  const persons = req.app.get('db');
  res.json(persons);
};

const getPersonById = (req, res) => {
  const persons = req.app.get('db');
  const person = persons.find(p => p.id === req.params.id);
  if (!person) {
    return res.status(404).json({ message: 'Person not found' });
  }
  res.json(person);
};

const createPerson = (req, res) => {
  const { name, age, hobbies } = req.body;
  const newPerson = {
    id: uuidv4(),
    name,
    age,
    hobbies
  };
  const persons = req.app.get('db');
  persons.push(newPerson);
  res.json(newPerson);
};

const updatePerson = (req, res) => {
  const { name, age, hobbies } = req.body;
  const persons = req.app.get('db');
  const person = persons.find(p => p.id === req.params.id);
  if (!person) {
    return res.status(404).json({ message: 'Person not found' });
  }
  person.name = name;
  person.age = age;
  person.hobbies = hobbies;
  res.json(person);
};

const deletePerson = (req, res) => {
  const persons = req.app.get('db');
  const personIndex = persons.findIndex(p => p.id === req.params.id);
  if (personIndex === -1) {
    return res.status(404).json({ message: 'Person not found' });
  }
  persons.splice(personIndex, 1);
  res.status(200).json({ message: 'Person deleted' });
};

module.exports = {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson
};
