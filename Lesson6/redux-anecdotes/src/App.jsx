import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import Filter from './Filter'
import Notification from './Notification'

const App = () => { 
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