import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class StudentResponse extends Component {
  state = {responses: [], result: '', names: [], studentInfo: []}

  componentDidMount() {
    const studentResponses = JSON.parse(localStorage.getItem('studentAnswers'))
    if (studentResponses === null) {
      this.setState({result: false})
    } else {
      const names = studentResponses.map(each => each.id)
      const {responsesList} = studentResponses[0]
      this.setState({
        result: true,
        names,
        responses: studentResponses,
        studentInfo: responsesList,
      })
    }
  }

  recordName = event => {
    const {responses} = this.state
    const data = responses.filter(each => each.id === event.target.value)
    const {responsesList} = data[0]
    this.setState({studentInfo: responsesList})
  }

  renderStudentResponseTab = () => {
    const {studentInfo, responses, names} = this.state
    return (
      <div className="studentResponseContainer">
        <Link to="/">
          <button className="disc">Back</button>
        </Link>
        <h1>Student Responses Board</h1>
        <label htmlFor="namesList">Student Names:</label>
        <select onChange={this.recordName}>
          {names.map(each => (
            <option key={each} value={each}>
              {each}
            </option>
          ))}
        </select>
        {studentInfo.map(each => (
          <div className="qa">
            <h1 className="qn">Q: {each.question}</h1>
            <textarea value={each.response} />
          </div>
        ))}
      </div>
    )
  }

  render() {
    const {result} = this.state
    return result ? (
      this.renderStudentResponseTab()
    ) : (
      <div className="studentResponseContainer">
        <h1>Student Response Board</h1>
        <p>No Responses/Questions Yet</p>
        <Link to="/">
          <button className="disc">Back</button>
        </Link>
      </div>
    )
  }
}

export default StudentResponse
