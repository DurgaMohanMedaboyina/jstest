import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    role: '',
    user: '',
    pwd: '',
    teacherDetails: [],
    studentDetails: [],
    error: false,
    signUp: false,
  }

  componentDidMount() {
    const {teacherDetails, studentDetails} = this.state
    const teacherInfo = JSON.parse(localStorage.getItem('Teacher'))
    const studentInfo = JSON.parse(localStorage.getItem('Student'))

    if (teacherInfo !== null && teacherInfo.length !== 0) {
      this.setState({
        teacherDetails: [...teacherDetails, ...teacherInfo],
      })
    }
    if (studentInfo !== null && studentInfo.length !== 0) {
      this.setState({
        studentDetails: [...studentDetails, ...studentInfo],
      })
    }
  }

  changeSignUp = () => {
    this.setState({signUp: true})
  }

  formSubmission = event => {
    event.preventDefault()
  }

  recordRole = event => {
    this.setState({role: event.target.value})
  }

  recordUser = event => {
    this.setState({user: event.target.value})
  }

  recordPwd = event => {
    this.setState({pwd: event.target.value})
  }

  validatePassword = () => {
    const {teacherDetails, studentDetails, user, pwd, role} = this.state
    const {history} = this.props
    const result = teacherDetails.filter(each => each.name === user)
    const result1 = studentDetails.filter(each => each.name === user)
    if (result !== null && role === 'Teacher' && result[0].pwd === pwd) {
      history.replace('/')
      localStorage.setItem('user', user)
      localStorage.setItem('role', role)
    } else if (
      result1 !== null &&
      role === 'Student' &&
      result1[0].pwd === pwd
    ) {
      history.replace('/student')
      localStorage.setItem('user', user)
      localStorage.setItem('role', role.toLowerCase())
    } else {
      this.setState({error: true, errorMsg: 'Password is Incorrect'})
    }
  }

  produceOutput = () => {
    const {role, user, pwd, teacherDetails, studentDetails} = this.state
    const teachers = teacherDetails.map(each => each.name)
    const students = studentDetails.map(each => each.name)
    if (role === 'Teacher') {
      if (teachers.includes(user) === false) {
        this.setState({
          error: true,
          errorMsg: 'User does not exist',
          role: '--SELECT--',
          pwd: '',
          user: '',
        })
      } else if (teachers.includes(user) === true) {
        this.validatePassword()
      }
    } else if (role === 'Student') {
      if (students.includes(user) === false) {
        this.setState({
          error: true,
          errorMsg: 'User does not exist',
          role: '--SELECT--',
          pwd: '',
          user: '',
        })
      } else if (students.includes(user) === true) {
        this.validatePassword()
      }
    }
  }

  renderLocalStorage = () => {
    const {teacherDetails, studentDetails} = this.state
    localStorage.setItem('Teacher', JSON.stringify(teacherDetails))
    localStorage.setItem('Student', JSON.stringify(studentDetails))
  }

  registerUser = () => {
    const {role, user, pwd, teacherDetails, studentDetails} = this.state
    const Obj = {
      name: user,
      pwd,
    }
    const teachers = teacherDetails.map(each => each.name)
    const students = studentDetails.map(each => each.name)

    if (role === 'Teacher') {
      if (teachers.includes(user) === true) {
        this.setState({
          error: true,
          errorMsg: 'User already exists',
          role: '--SELECT--',
          pwd: '',
          user: '',
        })
      } else {
        this.setState(
          {
            teacherDetails: [...teacherDetails, Obj],
            role: '--SELECT--',
            pwd: '',
            user: '',
            signUp: false,
          },
          this.renderLocalStorage,
        )
        alert('Please Login to Continue')
      }
    } else if (role === 'Student') {
      if (students.includes(user) === true) {
        this.setState({
          error: true,
          errorMsg: 'User already exists',
          role: '--SELECT--',
          pwd: '',
          user: '',
        })
      } else {
        this.setState(
          {
            studentDetails: [...studentDetails, Obj],
            role: '--SELECT--',
            pwd: '',
            user: '',
            signUp: false,
          },
          this.renderLocalStorage,
        )
        alert('Please Login to Continue')
      }
    }
  }

  renderButtonContainer = () => (
    <div className="buttonCon">
      <button
        type="submit"
        className="loginButton"
        onClick={this.produceOutput}
      >
        Login
      </button>
      <hr className="vl" />
      <div className="buttonCon">
        <p>New User?</p>
        <button
          type="button"
          onClick={this.changeSignUp}
          className="signupButton"
        >
          Signup
        </button>
      </div>
    </div>
  )

  render() {
    const {
      role,
      user,
      pwd,
      teacherDetails,
      studentDetails,
      errorMsg,
      error,
      signUp,
    } = this.state
    const loggedUser = localStorage.getItem('user')
    const string = `/${role.toLowerCase()}`
    const {history} = this.props
    if (loggedUser === 'student') {
      history.replace('/student')
    } else if (loggedUser === 'teacher') {
      history.replace('/')
    }
    return (
      <div className="loginContainer">
        <form className="loginFormContainer" onSubmit={this.formSubmission}>
          <h1>You Tell, I do</h1>
          <div className="codingImagesContainer">
            <img
              src="https://www.freepnglogos.com/uploads/javascript-png/js-logo-png-5.png"
              alt="js"
              className="codingImage"
            />
            <img
              src="https://c.tenor.com/GfSX-u7VGM4AAAAC/coding.gif"
              alt="codingTest"
              className="codingImage"
            />
          </div>
          <label htmlFor="Role">Role:</label>
          <select id="Role" onChange={this.recordRole} value={role} required>
            <option>--SELECT--</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
          <label htmlFor="user">User Name:</label>
          <input
            type="text"
            placeholder="Enter UserName"
            id="user"
            value={user}
            onChange={this.recordUser}
            required
          />
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            id="pwd"
            value={pwd}
            onChange={this.recordPwd}
            required
          />
          {signUp ? (
            <button onClick={this.registerUser} className="signupButton">
              Register
            </button>
          ) : (
            this.renderButtonContainer()
          )}
          {error ? <p className="error">*{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}

export default LoginForm
