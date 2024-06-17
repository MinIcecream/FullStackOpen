import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = null

const userSlice = createSlice({ 
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) { 
        const user = action.payload 
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
   
        blogService.setToken(user.token)
        return action.payload
    },
    removeUser(state, action) {
        window.localStorage.removeItem('loggedBlogappUser')
        return null
    }
  }
}) 
 

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer