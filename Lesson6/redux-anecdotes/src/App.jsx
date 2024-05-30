import { useDispatch } from 'react-redux'
import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import Filter from './Filter'
import Notification from './Notification'
import { useEffect } from 'react' 
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => { 
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App