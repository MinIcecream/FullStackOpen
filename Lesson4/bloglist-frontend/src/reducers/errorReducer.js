import { createSlice } from '@reduxjs/toolkit'
  
const initialState = ""

const errorSlice = createSlice({ 
  name: 'error',
  initialState,
  reducers: {
    addError(state, action) { 
        return action.payload
    },
    clearError(state, action) {
        return ""
    }
  }
}) 

export const setError = (content, timeout) => {
  return async dispatch => {
    dispatch(addError(content))
    setTimeout(() => {
      dispatch(clearError())
    }, timeout)
  }
}

export const { addError, clearError } = errorSlice.actions
export default errorSlice.reducer