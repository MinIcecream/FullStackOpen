import { useState } from 'react'
import Display from './Display'
import PersonForm from './PersonForm'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
 
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')

  const addPerson = (event) => { 
    event.preventDefault()
 
    if(persons.some(obj => obj.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      const nameObject = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(nameObject))
      setNewName("") 
      setNewNumber("") 
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
      <Filter filter= {filter} handleFilterChange = {handleFilterChange} /> 

      <h2>add a new</h2> 
      <PersonForm addPerson = {addPerson} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} />
        
      <h2>Numbers</h2>
      <Display personsToShow = {personsToShow} />
    </div>
  )
}

export default App