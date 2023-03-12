import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm/index'
import Master from './components/Master/index'
import Student from './components/Student/index'
import StudentResponse from './components/studentResponse'
import NotFound from './components/NotFound/index'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Master} />
    <ProtectedRoute exact path="/student" component={Student} />
    <ProtectedRoute
      exact
      path="/studentresponses"
      component={StudentResponse}
    />
    <Route component={NotFound} />
  </Switch>
)

export default App
