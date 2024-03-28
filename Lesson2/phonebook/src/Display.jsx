 
const Display = ({ personsToShow, onClick }) => { 
    
  return (
    <> 
        {personsToShow.map((person, i) => <p key = {i} >{person.name} {person.number} <button onClick = {() => onClick(person.id)}>delete</button></p>)}
    </>    
  )
}

export default Display