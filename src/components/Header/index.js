import {withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const loggedUser = localStorage.getItem('user')
  const role = localStorage.getItem('role')
  const logOut = () => {
    const {history} = props
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    history.replace('/login')
  }

  return (
    <div className="headerContainer">
      {role === 'Teacher' ? (
        <img
          src="https://res.cloudinary.com/dewlfbykg/image/upload/v1678552776/19197641_lbpxct.jpg"
          alt="Teacher"
          className="image"
        />
      ) : (
        ''
      )}
      <p>User: {loggedUser}</p>
      <p>Role: {role}</p>
      {role === 'Student' ? (
        <p className="disclaimer">
          *Ensure to submit.Once submitted,answers cannot be modified.
        </p>
      ) : (
        ''
      )}
      <div>
        <button type="button" onClick={logOut} className="logOutButton">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
