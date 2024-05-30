 
  export const Anecdote = ({ anecdote }) => {
    return (
      <div>
        <h2>{anecdote.content}</h2>
        <div>{anecdote.author}</div>
        <div>{anecdote.votes} votes</div>
      </div>
    )
  }