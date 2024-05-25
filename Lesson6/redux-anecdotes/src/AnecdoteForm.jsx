import { useDispatch } from 'react-redux'
import anecdoteReducer, { voteFor, newAnecdote } from './reducers/anecdoteReducer'
import { setNotification, clearNotification } from './reducers/notificationReducer'

const NewAnecdote = () => {

  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(content))
    dispatch(setNotification("you added "+ content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit = {createAnecdote}>
        <div><input name = "anecdote" /></div>
        <button>create</button>
      </form>
    </> 
  )
}

export default NewAnecdote