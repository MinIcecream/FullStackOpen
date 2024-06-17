import { useSelector } from 'react-redux' 

const Error = () => {
  const message = useSelector(state => state.errors)

  if (message === "")
  {
    return null
  }
  return (
    <div className = "error">
      {message}
    </div>
  )
}

export default Error