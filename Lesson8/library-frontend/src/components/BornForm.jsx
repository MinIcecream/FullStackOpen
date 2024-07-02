import { useEffect, useState } from 'react'
import { useMutation, gql } from '@apollo/client'
 
const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!)
{
  editAuthor(
    name: $name,
    setBornTo: $setBornTo, 
  ) {
    name
    born
  }
}
`

const BornForm = ({authors}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('') 

  const [ changeBorn ] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault()
    console.log(name)

    changeBorn({ variables: { name, setBornTo: parseInt(born) } }) 
 
    setBorn('')
  }

  const changeAuthor = (event) => { 
    setName(event.target.value)
  }

  useEffect(() => {
    setName(authors[0].name)
  }, [])

  return (
    <div> 
      <h2>change birthyear</h2>

      <form onSubmit={submit}>
        
        <select onChange = {changeAuthor}>
            {authors.map(author => {
                return <option value = {author.name} key = {author.name}>{author.name}</option>
            })}
        </select>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BornForm