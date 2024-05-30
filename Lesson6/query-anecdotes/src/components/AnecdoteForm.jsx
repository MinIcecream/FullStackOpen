import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query' 
import { createAnecdote, getAnecdotes } from '../requests'
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const [counter, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["anecdotes"]})
    }})
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content: content, votes: 0}, {onError: (error) => {dispatch({type: "SET"}); setTimeout(() => {dispatch({type: "CLEAR"})}, 5000)}}) 
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
