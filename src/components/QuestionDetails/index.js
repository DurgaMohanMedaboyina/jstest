import {Component} from 'react'
import Header from '../Header/index'
import StudentResponse from '../studentResponse/index'
import './index.css'

const questions = [
  {
    id: 1,
    question: 'Write a function to get the output of Five Times Six?',
  },
  {
    id: 2,
    question: 'Write a function to get the output of Eight Plus Nine?',
  },
  {
    id: 3,
    question: 'Write a function to get the output of Six Divided By Two?',
  },
  {
    id: 4,
    question: 'Write a function to get the output of Nine Minus Four?',
  },
  {
    id: 5,
    question: 'Write a function to get the output of Three Minus Zero?',
  },
  {
    id: 6,
    question: 'Write a function to get the output of Nine Times Five?',
  },
  {
    id: 7,
    question: 'Write a function to get the output of One Plus Eight?',
  },
  {
    id: 8,
    question: 'Write a function to get the output of Two Times Seven?',
  },
  {
    id: 9,
    question: 'Write a function to get the output of Five Plus Nine?',
  },
  {
    id: 10,
    question: 'Write a function to get the output of Four Times Six?',
  },
]

class QuestionDetails extends Component {
  state = {
    qNum: 1,
    answer: '',
    questionsList: [...questions],
    existing: false,
    recordsList: [],
    loading: 'inProgress',
    student: '',
  }

  componentDidMount() {
    const studentDetails = JSON.parse(localStorage.getItem('studentDetails'))
    if (studentDetails !== null) {
      const studentNames = studentDetails.map(each => each.id)
      const loggedUser = localStorage.getItem('user')
      if (studentNames.includes(loggedUser)) {
        const filteredDetails = studentDetails.filter(
          each => each.id === loggedUser,
        )
        const {responseList} = filteredDetails[0]
        this.setState({
          recordsList: [...responseList],
          existing: true,
          loading: 'existing',
        })
      } else {
        this.setState({loading: 'newUser'})
      }
    } else {
      this.setState({loading: 'newUser'})
    }
  }

  increment = () => {
    const {qNum} = this.state
    if (qNum <= 9) {
      this.setState(prevState => ({
        qNum: prevState.qNum + 1,
      }))
    }
  }

  recordResponse = event => {
    this.setState({answer: event.target.value}, this.amendResponse)
  }

  addResponse = () => {
    const {qNum, questionsList, answer} = this.state
    const Details = questionsList.filter(each => each.id !== qNum)
    const updatedQuestion = questionsList.filter(each => each.id === qNum)
    const filteredQuestion = {...updatedQuestion[0], response: answer}
    const final = [...Details, filteredQuestion]
    if (qNum <= 9) {
      this.setState(prevState => ({
        qNum: prevState.qNum + 1,
        questionsList: final,
        answer: '',
      }))
    } else {
      this.setState({
        questionsList: final,
        answer: '',
      })
    }
  }

  amendResponse = () => {
    const {recordsList, qNum, answer} = this.state
    const Details = recordsList.filter(each => each.id !== qNum)
    const updatedQuestion = recordsList.filter(each => each.id === qNum)
    const filteredQuestion = {
      ...updatedQuestion[0],
      response: answer,
    }
    const final = [...Details, filteredQuestion]
    if (qNum <= 9) {
      this.setState(prevState => ({
        qNum: prevState.qNum + 1,
        recordsList: final,
        answer: '',
      }))
    } else {
      this.setState({
        recordsList: final,
        answer: '',
      })
    }
  }

  decrement = () => {
    const {qNum} = this.state
    if (qNum >= 2) {
      this.setState(prevState => ({
        qNum: prevState.qNum - 1,
      }))
    }
  }

  addStudentDetails = () => {
    const {questionsList, existing, recordsList} = this.state
    const loggedUser = localStorage.getItem('user')
    const obj = {id: loggedUser, responseList: questionsList}
    const obj1 = {id: loggedUser, responseList: recordsList}
    const studentRecords = JSON.parse(localStorage.getItem('studentDetails'))
    if (existing !== true) {
      if (studentRecords === null) {
        localStorage.setItem('studentDetails', JSON.stringify([obj]))
      } else {
        const details = [...studentRecords, obj]
        localStorage.setItem('studentDetails', JSON.stringify(details))
      }
    } else if (existing === true) {
      const filteredDetails = studentRecords.filter(
        each => each.id !== loggedUser,
      )
      const details = [...filteredDetails, obj1]
      localStorage.setItem('studentDetails', JSON.stringify(details))
    }
  }

  renderExistingUserDetails = () => {
    const {recordsList, qNum, answer} = this.state
    const details = recordsList.filter(each => each.id === qNum)
    const {question, response} = details[0]
    console.log(response)
    return (
      <div className="questionContainer">
        <Header />
        <p className="question">
          Q{qNum} {question}
        </p>
        {response !== '' ? (
          <textarea
            rows="10"
            cols="30"
            value={response}
            onChange={this.amendResponse}
          />
        ) : (
          <textarea
            rows="10"
            cols="30"
            value={answer}
            onBlur={this.recordResponse}
          />
        )}
        <div className="buttonContainer">
          <button
            type="button"
            onClick={this.decrement}
            className="prevNextButton"
          >
            PREV
          </button>
          <p>{qNum}</p>
          <button
            type="button"
            onClick={this.increment}
            className="prevNextButton"
          >
            NEXT
          </button>
          <button
            type="button"
            onClick={this.amendResponse}
            className="saveButton"
          >
            Save
          </button>
          {qNum === 10 ? (
            <button
              type="button"
              onClick={this.addStudentDetails}
              className="submitButton"
            >
              Submit
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }

  renderNewUser = () => {
    const {qNum, questionsList, answer} = this.state
    const problem = questionsList.filter(each => each.id === qNum)
    const {question, response} = problem[0]
    const studentsInfo = JSON.parse(localStorage.getItem('studentDetails'))
    if (studentsInfo !== null) {
      const studentNames = studentsInfo.map(each => each.id)
    }
    return (
      <div className="questionContainer">
        <Header />
        <p className="question">
          Q{qNum}: {question}
        </p>
        {response !== undefined ? (
          <textarea
            rows="10"
            cols="30"
            onChange={this.recordResponse}
            value={response}
            placeholder="ENTER"
          />
        ) : (
          <textarea
            rows="10"
            cols="30"
            onChange={this.recordResponse}
            value={answer}
          />
        )}
        <div className="buttonContainer">
          <button
            type="button"
            onClick={this.decrement}
            className="prevNextButton"
          >
            PREV
          </button>
          <p>{qNum}</p>
          <button
            type="button"
            onClick={this.increment}
            className="prevNextButton"
          >
            NEXT
          </button>
          <button
            type="button"
            onClick={this.addResponse}
            className="saveButton"
          >
            Save
          </button>
          {qNum === 10 ? (
            <button
              type="button"
              onClick={this.addStudentDetails}
              className="submitButton"
            >
              Submit
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }

  renderStudentsInfo = () => {
    const {loading} = this.state
    switch (loading) {
      case 'inProgress':
        return <p>...Loading</p>
      case 'existing':
        return this.renderExistingUserDetails()
      case 'newUser':
        return this.renderNewUser()
      default:
        return null
    }
  }

  updateStudent = event => {
    this.setState({student: event.target.value})
  }

  renderTeachersInfo = () => {
    const {student} = this.state
    const studentDetails = JSON.parse(localStorage.getItem('studentDetails'))
    const loggedUser = localStorage.getItem('user')
    let studentResponseList
    let studentNames
    if (studentDetails === null) {
      return (
        <div className="questionContainer">
          <Header />
          <p className="noresponseColor">No Responses Submitted</p>
          {questions.map(each => (
            <h1 className="questionColor">
              Q{each.id} {each.question}
            </h1>
          ))}
        </div>
      )
    }

    if (studentDetails !== undefined) {
      studentResponseList = studentDetails.filter(each => each.id === student)
      studentNames = studentDetails.map(each => each.id)
    }
    if (student === '') {
      return (
        <div className="questionContainer">
          <Header />
          <p>Please Select the Student Name</p>
          <select onChange={this.updateStudent}>
            {studentNames.map(each => (
              <option value={each} key={each}>
                {each}
              </option>
            ))}
          </select>
        </div>
      )
    }
    return (
      <div className="questionContainer">
        <Header />
        <select onChange={this.updateStudent}>
          {studentNames.map(each => (
            <option value={each} key={each}>
              {each}
            </option>
          ))}
        </select>
        {studentResponseList[0].responseList.map(each => (
          <StudentResponse key={each.id} details={each} />
        ))}
      </div>
    )
  }

  render() {
    const role = localStorage.getItem('role')
    switch (role) {
      case 'Teacher':
        return this.renderTeachersInfo()
      case 'Student':
        return this.renderStudentsInfo()
      default:
        return null
    }
  }
}

export default QuestionDetails
