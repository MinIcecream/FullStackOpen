import { useDispatch, useSelector } from 'react-redux'
import anecdoteReducer, { voteFor, newAnecdote } from './reducers/anecdoteReducer'
import { setNotification, clearNotification } from './reducers/notificationReducer'

const Anecdotes = () => { 
  const anecdotes = useSelector(({filter, anecdotes}) => {  
    console.log(filter)
    return anecdotes.filter(anec => anec.content.includes(filter))
  }) 
  const dispatch = useDispatch() 
  
  const vote = (id, content) => {
    dispatch(voteFor(id))
    dispatch(setNotification("you voted "+ content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )} 
    </div>
  )
}

export default Anecdotes