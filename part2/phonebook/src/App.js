import React, { useState, useEffect } from 'react';
import personsService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState({
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  });

  const personsToShow =
    filterText === ''
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(filterText.toLowerCase()),
        );

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const displayMessage = (message, color) => {
    setNotificationStyle({ ...notificationStyle, color });
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const addPerson = event => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    if (persons.some(person => person.name === newPerson.name)) {
      const oldPerson = persons.find(person => person.name === newPerson.name);
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Would you like to replace the old number with the new one?`,
        )
      ) {
        personsService
          .update(oldPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== returnedPerson.id ? person : returnedPerson,
              ),
            );
            setNewName('');
            setNewNumber('');
            displayMessage(`Changed ${returnedPerson.name}'s number.`, 'green');
          })
          .catch(error => {
            displayMessage(
              `Information of ${newPerson.name} has already been removed from the server.`,
              'red',
            );
          });
      }
      return;
    }

    personsService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      displayMessage(`Added ${returnedPerson.name}.`, 'green');
    });
  };

  const handleFilterText = event => {
    setFilterText(event.target.value);
  };

  const handleNewName = event => {
    setNewName(event.target.value);
  };

  const handleNewNumber = event => {
    setNewNumber(event.target.value);
  };

  const handleRemovePerson = personDelete => {
    if (window.confirm(`Delete ${personDelete.name}?`)) {
      personsService
        .remove(personDelete.id)
        .then(removedPerson => {
          setPersons(persons.filter(person => person.id !== personDelete.id));
        })
        .catch(error => {
          displayMessage(`Error deleting ${personDelete.name}.`);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={notificationStyle} />
      <Filter filterText={filterText} handleFilterText={handleFilterText} />
      <h3>Add a new person</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} removePerson={handleRemovePerson} />
    </div>
  );
};

export default App;
