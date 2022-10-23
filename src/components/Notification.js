const Notification = ({ message, isError }) => {
  if(message === null) {
    return null
  }

  return(
    <div className={isError === false ? 'message': 'errorMessage' }>
      {message}
    </div>
  )
}

export default Notification