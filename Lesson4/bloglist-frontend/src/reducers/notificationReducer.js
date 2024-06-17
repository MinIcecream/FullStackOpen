import { createSlice } from '@reduxjs/toolkit'
  
const initialState = ""

const notificationSlice = createSlice({ 
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) { 
        return action.payload
    },
    clearNotification(state, action) {
        return ""
    }
  }
}) 

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}

export const { addNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer