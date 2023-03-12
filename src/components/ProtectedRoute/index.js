import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
  const loggedUser = localStorage.getItem('user')
  if (loggedUser === null) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
