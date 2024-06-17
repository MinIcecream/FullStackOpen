import { useSelector } from 'react-redux' 

const Notification = () => {

  const message = useSelector(state => state.notifications)

  if (message === "")
  {
    return null
  }
  return (
    <div className = "notification">
      {message}
    </div>
  )
}

export default Notification