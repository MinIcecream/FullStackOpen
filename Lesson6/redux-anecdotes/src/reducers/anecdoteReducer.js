import { createSlice } from '@reduxjs/toolkit'
 import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload.id
      return state.map(item => {
        if (item.id === id) {
          return action.payload
        }
        return item
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }, 
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => { 
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content) 
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id)
    dispatch(voteFor(updatedAnecdote))
  }
}
export const {voteFor, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer