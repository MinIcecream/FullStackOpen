import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import { Provider } from 'react-redux'
import errorReducer from './reducers/errorReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { BrowserRouter as Router } from 'react-router-dom'

const store = configureStore({
    reducer: {
      notifications: notificationReducer, 
      errors: errorReducer,
      blogs: blogReducer,
      users: userReducer
    }
  }) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router> 
    <Provider store = {store}>
          <App /> 
      </Provider> 
  </Router> 
)