import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Header from '../Header/index'
import StudentResponse from '../studentResponse/index'
import './index.css'

const numbers = [
  'ZERO',
  'ONE',
  'TWO',
  'THREE',
  'FOUR',
  'FIVE',
  'SIX',
  'SEVEN',
  'EIGHT',
  'NINE',
]

const operations = ['PLUS', 'MINUS', 'TIMES', 'DIVIDEDBY']

class Master extends Component {
  state = {
    questionDetails: [],
    question: '',
    first: '',
    second: '',
    third: '',
    loading: true,
  }

  componentDidMount() {
    const questions = JSON.parse(localStorage.getItem('questions'))
    if (questions !== null) {
      this.setState({questionDetails: questions})
    }
    this.setState({loading: false})
  }

  postQuestions = () => {
    const {questionDetails} = this.state
    localStorage.setItem('questions', JSON.stringify(questionDetails))
    alert('Questions Posted')
  }

  recordFirst = event => {
    this.setState({first: event.target.value})
  }

  recordSecond = event => {
    this.setState({second: event.target.value})
  }

  recordThird = event => {
    this.setState({third: event.target.value})
  }

  addQuestion = () => {
    const numbersObject = {
      ZERO: 0,
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      SIX: 6,
      SEVEN: 7,
      EIGHT: 8,
      NINE: 9,
    }
    const {questionDetails, question, first, second, third} = this.state
    let result
    if (second === 'PLUS') {
      result = numbersObject[first] + numbersObject[third]
    } else if (second === 'MINUS') {
      result = numbersObject[first] - numbersObject[third]
    } else if (second === 'TIMES') {
      result = numbersObject[first] * numbersObject[third]
    } else {
      result = Math.floor(numbersObject[first] / numbersObject[third])
    }

    const string = `${first}(${second}(${third}()))`

    const obj = {
      id: questionDetails.length + 1,
      question: string,
      result,
    }

    this.setState({
      questionDetails: [...questionDetails, obj],
      question: '',
    })
  }

  renderTeacherBoard = () => {
    const {questionDetails} = this.state
    const questionsCount = questionDetails.length
    return (
      <div>
        <h1>Frame The Question</h1>
        <div>
          <select onChange={this.recordFirst} required>
            {numbers.map(each => (
              <option value={each}>{each}</option>
            ))}
          </select>
          <select onChange={this.recordSecond} required>
            {operations.map(each => (
              <option value={each}>{each}</option>
            ))}
          </select>
          <select onChange={this.recordThird} required>
            {numbers.map(each => (
              <option value={each}>{each}</option>
            ))}
          </select>
          <button onClick={this.addQuestion} className="submitButton">
            Add
          </button>
        </div>
        <div className="qT">
          <h1>QUESTIONS</h1>
          <p className="total">Count: {questionsCount}</p>
        </div>
        <div className="QACONTAINER">
          {questionDetails.map(each => (
            <div>
              <p>
                Q{each.id}: {each.question}
              </p>
              <p>Ans: {each.result}</p>
            </div>
          ))}
        </div>
        <div className="postButtonCon">
          <button className="saveButton" onClick={this.postQuestions}>
            {' '}
            POST{' '}
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {loading} = this.state
    const role = localStorage.getItem('role')
    if (role === 'student') {
      return <Redirect to="/student" />
    }
    return (
      <div className="masterContainer">
        <div className="questionContainer">
          <Header />
          <Link to="/studentresponses">
            <p className="disc">Student Responses</p>
          </Link>
          {loading ? <p>...Loading</p> : this.renderTeacherBoard()}
        </div>
        <div className="student">
          <StudentResponse />
        </div>
      </div>
    )
  }
}

export default Master
