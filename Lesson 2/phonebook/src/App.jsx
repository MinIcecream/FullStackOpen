import { useState } from 'react'
import Display from './Display'
import PersonForm from './PersonForm'
import Filter from './Filter' 
import { useEffect } from 'react'
import Notification from './Notification' 
import Error from './Error'
import api from './services/api'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
 
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .getAll()
      .then(persons => {
        setPersons(persons)
      }) 
  }, [])

  const addPerson = (event) => { 
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    } 
    
     
    if(persons.some(obj => obj.name === newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        const id = persons.filter(person => person.name === newName)[0].id
        api.update(id, personObject)
        .then(response => {
          setPersons(persons.map(person => person.name !== newName ? person : response))
          setNotification(`${newName} was successfully added to the phonebook`)
          setTimeout(()=>{
            setNotification(null)
          },5000)

        })
        .catch(error => { 
          setError(`${newName} was already removed!`)
          setTimeout(()=>{
            setError(null)
          },5000) 
        })
      }
    }
    else{ 
      api
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
        })
        setNotification(`${newName} was successfully added to the phonebook`)
        setTimeout(()=>{
          setNotification(null)
        },5000)

    
      setNewName("") 
      setNewNumber("") 
    }  
  
  }

  const deletePerson = (personId) => {
    if(window.confirm("Delete??"))
    {
      api.remove(personId)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id != deletedPerson.id))
      })
    }
  }

  const handleNameChange = (event) => { 
    setNewName(event.target.value)
  } 
  const handleNumberChange = (event) => { 
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => { 
    setFilter(event.target.value)
  }

  const personsToShow = filter == ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2> 
      <Notification message = {notification} />
      <Error message = {error} />
      <Filter filter= {filter} handleFilterChange = {handleFilterChange} /> 

      <h2>add a new</h2> 
      <PersonForm addPerson = {addPerson} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} />
        
      <h2>Numbers</h2>
      <Display personsToShow = {personsToShow} onClick = {deletePerson}/>
    </div>
  )
}

export default App