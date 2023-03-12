import {Component} from 'react'
import Header from '../Header/index'
import StudentResponse from '../studentResponse/index'
import './index.css'

class Student extends Component {
  state = {
    qNum: 1,
    answer: '',
    questionsList: [],
    student: '',
    existing: false,
  }

  componentDidMount() {
    const questions = JSON.parse(localStorage.getItem('questions'))
    const loggedUser = localStorage.getItem('user')
    if (questions === null) {
      this.setState({existing: 'default'})
    } else {
      const questionDetails = questions.map(each => ({
        id: each.id,
        question: each.question,
      }))
      const studentResponses = JSON.parse(
        localStorage.getItem('studentAnswers'),
      )
      let studentNames
      let submittedResponses
      if (studentResponses !== null) {
        studentNames = studentResponses.map(each => each.id)
        if (studentNames.includes(loggedUser)) {
          submittedResponses = studentResponses.filter(
            each => each.id === loggedUser,
          )
          const {responsesList} = submittedResponses[0]
          this.setState({
            questionsList: [...responsesList],
            existing: 'oldUser',
          })
        } else {
          this.setState({
            questionsList: [...questionDetails],
            existing: 'newUser',
          })
        }
      } else {
        this.setState({
          questionsList: [...questionDetails],
          existing: 'newUser',
        })
      }
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

  submitResponses = () => {
    console.log('Submit BUtton Clicked')
    const {questionsList} = this.state
    console.log('inside submit', questionsList)
    const loggedUser = localStorage.getItem('user')
    let filteredResponses
    let final
    const obj = {
      id: loggedUser,
      responsesList: questionsList,
    }
    const studentResponses = JSON.parse(localStorage.getItem('studentAnswers'))
    if (studentResponses !== null) {
      filteredResponses = studentResponses.filter(
        each => each.id !== loggedUser,
      )
      final = [...filteredResponses, obj]
      localStorage.setItem('studentAnswers', JSON.stringify(final))
    } else {
      final = [obj]
      localStorage.setItem('studentAnswers', JSON.stringify(final))
    }
    alert('Answers Submitted')
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
    if (qNum < questionsList.length) {
      console.log('HELLo')
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

  decrement = () => {
    const {qNum} = this.state
    if (qNum >= 2) {
      this.setState(prevState => ({
        qNum: prevState.qNum - 1,
      }))
    }
  }

  renderExistingBoard = () => {
    const {qNum, questionsList, answer} = this.state
    const problem = questionsList.filter(each => each.id === qNum)
    const {question, response} = problem[0]
    return (
      <div className="questionContainer">
        <Header />
        <p className="question">
          Q{qNum}: {question}
        </p>
        {response === undefined ? (
          <textarea
            rows="10"
            cols="30"
            onChange={this.recordResponse}
            value={answer}
          />
        ) : (
          <div>
            <p>In case of amendment add the new response in the second box</p>
            <p>Prev Submission</p>
            <textarea rows="10" cols="30" value={response} />
            <p>Current Submission</p>
            <textarea
              rows="10"
              cols="30"
              onChange={this.recordResponse}
              value={answer}
            />
          </div>
        )}
        <div className="buttonCon">
          <button type="button" onClick={this.decrement} className="Button">
            PREV
          </button>
          <p>{qNum}</p>
          <button type="button" onClick={this.increment} className="Button">
            NEXT
          </button>
          <button type="button" onClick={this.addResponse} className="Button">
            Save
          </button>
          {qNum === questionsList.length ? (
            <button
              type="button"
              onClick={this.submitResponses}
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

  renderStudentBoard = () => {
    const {qNum, questionsList, answer} = this.state
    const problem = questionsList.filter(each => each.id === qNum)
    const {question, response} = problem[0]
    return (
      <div className="questionContainer">
        <Header />
        <p className="question">
          Q{qNum}: {question}
        </p>
        {response === undefined ? (
          <textarea
            rows="10"
            cols="30"
            onChange={this.recordResponse}
            value={answer}
          />
        ) : (
          <div>
            <p>In case of amendment add the new response in the second box</p>
            <p>Prev Submission</p>
            <textarea rows="10" cols="30" value={response} />
            <p>Current Submission</p>
            <textarea
              rows="10"
              cols="30"
              onChange={this.recordResponse}
              value={answer}
            />
          </div>
        )}
        <div className="buttonCon">
          <button type="button" onClick={this.decrement} className="Button">
            PREV
          </button>
          <p>{qNum}</p>
          <button type="button" onClick={this.increment} className="Button">
            NEXT
          </button>
          <button type="button" onClick={this.addResponse} className="Button">
            Save
          </button>
          {qNum === questionsList.length ? (
            <button
              type="button"
              onClick={this.submitResponses}
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

  updateStudent = event => {
    this.setState({student: event.target.value})
  }

  defaultView = () => (
    <div>
      <Header />
      <h1>No Questions Posted</h1>
    </div>
  )

  render() {
    const {existing} = this.state
    switch (existing) {
      case false:
        return <p>...Loading</p>
      case 'newUser':
        return this.renderStudentBoard()
      case 'oldUser':
        return this.renderExistingBoard()
      case 'default':
        return this.defaultView()
      default:
        return null
    }
  }
}

export default Student
