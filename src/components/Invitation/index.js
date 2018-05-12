import React, {Component} from 'react'
import {getCandidateInvitation, getTestDetailsById} from "../../utils/_data";
import './invitation.css'

class Invitation extends Component {
  state = {
    candidate: {},
    exam: {},
    fields: {
      correctAnswer: '',
    },
    visibleQuestionIndex: 0,
    errors: {},
  }

  componentWillMount() {
    const examId = (this.props.history.location.pathname && this.props.history.location.pathname.split('/') && this.props.history.location.pathname.split('/')[2]) || "";
    if(examId) {
      this.getInvitation(examId)
    }
  }

  onChange = (e) => {
    if(e.target.name === "correctAnswer") {
      this.setState({
        fields: {
          ...this.state.fields,
          [e.target.name]: e.target.id,
        }
      });
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          [e.target.name]: this.validate(e.target.name, e.target.value),
        },
        fields: {
          ...this.state.fields,
          [e.target.name]: e.target.value,
        }
      });
    }
  }

  validate = (name, value) => {
    switch (name) {
      case 'correctAnswer':
        if (!value) {
          return 'Please choose one correct Answer';
        } else {
          return '';
        }
      default: {
        return ''
      }
    }
  };

  getInvitation = (examId) => {
    getCandidateInvitation(examId).then(candidate => {
      if(candidate.length) {
        getTestDetailsById(candidate[0].testId).then(exam => {
          if(exam.length) {
            this.setState({
              candidate: candidate[0],
              exam: exam[0]
            })
          }
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
  }

  onNextPrivious = (move) => {
    let { visibleQuestionIndex } = this.state;
    if(move === "Next") {
      visibleQuestionIndex++;
    } else if(move === "Previous") {
      visibleQuestionIndex--;
    } else {
      visibleQuestionIndex = move;
    }
    this.setState({visibleQuestionIndex})
  }

  render() {
    const { exam, fields, errors, visibleQuestionIndex } = this.state;
    const options = ['A', 'B', 'C', 'D'];
    const pageContents = [];
    for (let i=0; i<exam.MCQCount; i++) {
      pageContents.push(<li key={i} className={i === visibleQuestionIndex ? 'active' : ''} onClick={() => this.onNextPrivious(i)}>{i+1}</li>)
    }
    return (
      <div className="invitation">
        <div className="row new-test">
          <div className='col-sm-12 col-md-6 col-xs-12 mt-3'>
            <div><small>Questions</small></div>
            <ul className='text-left pages'>{ pageContents.map(x=>x) }</ul>
          </div>
          <div className='col-sm-12 col-md-6 col-xs-12 mt-5 text-right'>
            <button className="btn btn-primary btn-sm" >Submit</button>
          </div>
        </div>
        <div className="row new-test">
          <div className='col-sm-12 col-md-12 col-xs-12 mt-3'>
            <div className="card">
              <div className="card-body text-center">
                <h4 className="text-dark">MCQ Test {visibleQuestionIndex+1}/{exam.MCQCount}</h4>
                <div className="row">
                  {
                    exam.MCQQuestions && exam.MCQQuestions.map((que,j) => {
                      if(visibleQuestionIndex === j) {
                        return (
                          <div key={j} className='col-sm-12 col-md-6 offset-md-3 col-xs-12'>
                            <p className="text-muted text-dark mt-4">
                              {que.Question}
                            </p>
                            {
                              que.Answers.map((option,i) => (
                                <div key={i} className={`form-group ${fields.correctAnswer === `option${options[i]}` ? 'text-success' : ''}`}>
                                  <input
                                    type="text"
                                    name={`option${options[i]}`}
                                    value={`${options[i]}. ${option.answertext}`}
                                    onChange={this.onChange}
                                    disabled
                                    className={`form-control disabled ${fields.correctAnswer === `option${options[i]}` ? 'text-primary border border-primary' : ''}`}
                                  />
                                  <label className="container">
                                    <input type="checkbox" name="correctAnswer" id={`option${options[i]}`} onClick={this.onChange} checked={fields.correctAnswer === `option${options[i]}`}/>
                                    <span className="checkmark text-primary" />
                                  </label>
                                  <small className="text-danger">{errors[`option${options[i]}`]}</small>
                                </div>
                              ))
                            }
                          </div>
                        )
                      }
                    })
                  }
                  <small className="text-danger">{errors.correctAnswer}</small>
                  <div className="col-sm-12 col-md-6 offset-md-3 col-xs-12 mt-4 mb-4">
                    <button className="btn bg-white border border-primary text-primary pl-5 pr-5 mr-2" onClick={() => this.onNextPrivious('Previous')} disabled={!visibleQuestionIndex}>Previous</button>
                    <button className="btn bg-white border border-primary text-primary pl-5 pr-5" onClick={() => this.onNextPrivious('Next')} disabled={((exam.MCQCount-1) === visibleQuestionIndex)}>Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Invitation;
