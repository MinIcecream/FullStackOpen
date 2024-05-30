import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query' 
import { createAnecdote, getAnecdotes, updateAnecdote } from './requests' 
import NotificationContext from './NotificationContext' 

const App = () => { 
  const queryClient = useQueryClient() 

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })
  const handleVote = (anecdote) => {
    anecdote.votes += 1
    updateAnecdoteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  }) 

  if (result.isError){
    return <div>Error communicating with server</div>
  }
  if (result.isLoading){
    return <div>loading data...</div>
  }
  const anecdotes = result.data 

  return (
    <div>
      <h3>Anecdote app</h3> 
        <Notification /> 
        <AnecdoteForm /> 
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
