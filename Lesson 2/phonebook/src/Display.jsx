 
const Display = ({ personsToShow }) => { 
  return (
    <> 
        {personsToShow.map((person, i) => <p key = {i} >{person.name} {person.number}</p>)}
    </>    
  )
}

export default Display