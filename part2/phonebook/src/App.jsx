import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [type, setType] = useState(null)

  const hook = () => {
    personService.getAll()
    .then(initialNotes => {
      setPersons(initialNotes)
    })
  }

  useEffect(hook, [])

  const addMessage = 'Added'
  const updateMessage = 'Changed number of'
  const deleteMessage = "'s information has already been removed from the server"
  const displayNotification = (message, name) => {
    if (message == deleteMessage) {
      setType('error')
    } else {
      setType('success')
    }
    setNotification(
      `${message} ${name}`
    )
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()

    const nameExists = persons.map(person => person.name).some((name) => name.toLowerCase() == newName.toLowerCase())
    
    if (nameExists) {
      const personExist = persons.find(person => person.name.toLowerCase() == newName.toLowerCase())
      const confirmed = window.confirm(`${personExist.name} is already added to phonebook, replace the old number with a new one?`)
      const changedPerson = {...personExist, number: newNumber}
  
      if (confirmed) {
        personService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            console.log(returnedPerson)
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            displayNotification(updateMessage, returnedPerson.name)
          })
          .catch(error => {
            console.error('Error updating person:', error)
            setType('error')
            setNotification(
              `Information of ${changedPerson.name} has already been removed from server`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            // displayNotification(deleteMessage, returnedPerson.name)
            setPersons(persons.filter(p => p.id !== changedPerson.id))
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }

      personService.create(newPerson)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        setNewName('')
        setNewNumber('')
        displayNotification(addMessage, returnedPerson.name)
      })
    }
  }

  const personToShow = filter == '' ? persons : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`Delete ${name}?`);
    const personExist = persons.find(person => person.id == id)
  
    if (confirmed) {
      personService
        .deleteP(id)
        .then(() => {
          const updatedPersons = persons.filter((person) => person.id !== id)
          setPersons(updatedPersons);
        })
        .catch((error) => {
          console.error('Error deleting person:', error)
          setType('error')
            setNotification(
              `Information of ${personExist.name} has already been removed from server`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          // displayNotification(deleteMessage, returnedPerson.name)
        });
    }
  };
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={type} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm 
        handlePersonSubmit={handlePersonSubmit} 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      {personToShow.map(person => <Person key={person.name} person={person} handleDelete={handleDelete} />)}
    </div>
  )
}

export default App