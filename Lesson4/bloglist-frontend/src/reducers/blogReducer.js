import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import blogs from '../services/blogs'
  
const initialState = []

const blogSlice = createSlice({ 
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) { 
        return action.payload
    },
    appendBlog(state, action) {
        state.push(action.payload)
    },
    modifyBlog(state, action) { 
        const id = action.payload.id
        return state.map(item => {
            if (item.id === id){
                return action.payload
            }
            return item
        })
    },
    deleteBlog(state, action) {   
        const id = action.payload.id
        return state.filter(item => item.id !== id)
    }
  }
}) 
 
export const initializeBlogs = () => {
    return async dispatch => { 
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    }
}


export const addBlog = content => { 
    return async dispatch => { 
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
    }
}


export const updateBlog = newBlog => {
    return async dispatch => {
      const updatedBlog = await blogService.update(newBlog)
      dispatch(modifyBlog(updatedBlog))
    }
}
export const addComment = newBlog => {  
    return async dispatch => { 
      const updatedBlog = await blogService.comment(newBlog)
      dispatch(modifyBlog(updatedBlog))
    }
}


export const removeBlog = blogToRemove => {
    return async dispatch => { 
        const removedBlog = await blogService.remove(blogToRemove) 
        dispatch(deleteBlog(blogToRemove))
    }
}

export const { setBlogs, appendBlog, modifyBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer