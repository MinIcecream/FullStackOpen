import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote } from './reducers/anecdoteReducer'
import { setNotification } from './reducers/notificationReducer'

const Anecdotes = () => { 
  const anecdotes = useSelector(({filter, anecdotes}) => {   
    return anecdotes.filter(anec => anec.content.includes(filter))
  }) 
  const dispatch = useDispatch() 
  
  const vote = (id, content) => {
    dispatch(updateAnecdote(id))
    dispatch(setNotification("you voted "+ content, 5000)) 
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