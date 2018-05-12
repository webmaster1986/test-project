import React, {Component} from 'react'
import swal from 'sweetalert';
import {getCandidateInvitation, getTestDetailsById, addCandidateAnswer, updateCandidateAnswer, getCandidateAnswer} from "../../utils/_data";
import './invitation.css'

class Invitation extends Component {
  state = {
    candidate: {},
    exam: {},
    test: 1,
    visibleQuestionIndex: 0,
    errors: {},
    isNew: false,
  }

  componentWillMount() {
    const examId = (this.props.history.location.pathname && this.props.history.location.pathname.split('/').length && this.props.history.location.pathname.split('/')[3]) || "";
    if(examId) {
      this.getInvitation(examId)
    }
  }

  componentDidUpdate() {
    let element = document.getElementById("page-content-wrapper");
    element.classList.add("container");
    element.classList.add("mt-5");
    element.classList.remove("page-content-wrapper");
    document.getElementsByClassName("sidebar-wrapper")[0].style.display = "none";
  }

  getInvitation = (examId) => {
    let { test }= this.state;
    getCandidateInvitation(examId).then(candidate => {
      if(candidate.length) {
        candidate = candidate[0];
        getCandidateAnswer(candidate.examId).then(answers => {
           let candidateAnswer = answers.length > 0 ? answers[0] : candidate;
           let isNew = !answers.length;
           getTestDetailsById(candidate.testId).then(exam => {
              if(exam.length) {
                exam = exam[0];
                if (!candidateAnswer.MCQQuestions && (exam.MCQQuestions && exam.MCQQuestions.length)) {
                  test = 1
                } else if (!candidateAnswer.CodingTests || (exam.CodingTestCount && exam.CodingTestCount.length)) {
                  test = 2
                } else if(candidateAnswer.MCQQuestions && candidateAnswer.CodingTests) {
                  test = 3
                }
                this.setState({
                  candidate: candidateAnswer,
                  exam,
                  test,
                  isNew,
                  isMCQ: !!exam.MCQQuestions,
                  isCodingText: !!exam.CodingTestCount,
                })
              }
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
  }

  onChange = (e) => {
    let { visibleQuestionIndex, exam} = this.state;
    if(e.target.name === "correctAnswer") {
      exam.MCQQuestions[visibleQuestionIndex].Answers.forEach((ans, i) => {
        if (parseInt(e.target.attributes["data-id"].value, 10) === i) {
          ans.chooseAnswer = true;
        } else {
          ans.chooseAnswer = false;
        }
      });
      this.setState({
        exam,
        errors: {},
      });
    }

    if(e.target.name === "codingTextAnswer") {
      exam.CodingTests[0].codingTextAnswer = e.target.value;
      this.setState({
        exam,
        errors: {
          [e.target.name]: this.validate(e.target.name, e.target.value)
        },
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
      case 'codingTextAnswer':
        if (!value) {
          return 'Coding Answer is Required.';
        } else {
          return '';
        }
      default: {
        return ''
      }
    }
  };

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

  onSave = (test) => {
    let { exam, candidate, isNew } = this.state;
    let message = "";
    if(test === "MCQ") {
      let filledList = [];
      let unFilledList = [];
      let validationErrors = {};
      exam.MCQQuestions.forEach((que, i) =>{
        const choose = que.Answers.filter(ans => ans.chooseAnswer);
        if(choose.length) {
          filledList.push(i+1)
        }else {
          unFilledList.push(i+1);
        }
      });
      validationErrors.MCQError = `Question number ${unFilledList.join(',')} is unfilled, please choose answer`
      if (unFilledList.length) {
        this.setState({errors: validationErrors});
        return;
      }

      candidate.MCQQuestions = exam.MCQQuestions;
      candidate.MCQQuestions.forEach(que=>{
        let ansIndex = que.Answers.findIndex(ans => ans.chooseAnswer);
        que.Answers = ansIndex === 0 ? 'A' : ansIndex === 1 ? 'B' : ansIndex === 2 ? 'C' : ansIndex === 3 ? 'D' : '';
      });
      message = "Your MCQ test Completed successfully...";
    }

    if(test === "Coding") {
      let validationErrors = {};
      Object.keys({codingTextAnswer: ''}).forEach(name => {
        const error = this.validate(name, exam.CodingTests[0].codingTextAnswer);
        if (error && error.length > 0) {
          validationErrors[name] = error;
        }
      });
      if (Object.keys(validationErrors).length > 0) {
        this.setState({errors: validationErrors});
        return;
      }
      candidate.CodingTests = exam.CodingTests;
      message = "Your Coding Test Completed successfully...";
    }

    if(isNew) {
      delete candidate['id'];
      addCandidateAnswer(candidate).then(candidateAnswer => {
        if (!candidateAnswer.MCQQuestions && this.state.isMCQ) {
          test = 1
        } else if (!candidateAnswer.CodingTests && this.state.isCodingText) {
          test = 2
        } else {
          test = 3
        }
        this.setState({
          test,
        });
        swal(message, {
          icon: "success",
        });
      }).catch(err => console.log(err));
    } else {
      updateCandidateAnswer(candidate).then(candidateAnswer => {
        if (!candidateAnswer.MCQQuestions && this.state.isMCQ) {
          test = 1
        } else if (!candidateAnswer.CodingTests && this.state.isCodingText) {
          test = 2
        } else {
          test = 3
        }
        this.setState({
          test,
        });
        swal(message, {
          icon: "success",
        });
      }).catch(err => console.log(err));
    }
  }

  render() {
    const { exam, errors, visibleQuestionIndex, test, isMCQ, isCodingText } = this.state;
    const options = ['A', 'B', 'C', 'D'];
    const pageContents = [];
    for (let i=0; i<exam.MCQCount; i++) {
      pageContents.push(<li key={i} className={`${i === visibleQuestionIndex ? 'active' : ''}`} onClick={() => this.onNextPrivious(i)}>{i+1}</li>)
    }
    return (
      <div className="invitation">
        <div className="row new-test">
          {test === 1 && isMCQ &&
            <div className='col-sm-6 col-md-6 col-xs-12 mt-3'>
              <div><small>Questions</small></div>
              <ul className='text-left pages'>{ pageContents.map(x=>x) }</ul>
            </div>
          }
          {test === 2 && isCodingText &&
            <div className='col-sm-6 col-md-6 col-xs-12 mt-3'>
              <h3><b>1. MCQ Test</b> <i className="ml-2 fa fa-check text-success" aria-hidden="true" /></h3>
            </div>
          }
          <div className='col-sm-6 col-md-6 col-xs-12 mt-5 text-right'>
            {test === 1 && isMCQ && <button className="btn btn-primary" onClick={() => this.onSave('MCQ')}>Submit</button>}
            {test === 2 && <button className="btn btn-primary" onClick={() => this.onSave('Coding')}>Submit</button>}
          </div>
        </div>
        <div className="row new-test">
          {test === 1 && isMCQ &&
            <div className='col-sm-12 col-md-12 col-xs-12 mt-3'>
              <div className="card">
                <div className="card-body text-center">
                  <h4 className="text-dark">MCQ Test {visibleQuestionIndex + 1}/{exam.MCQCount}</h4>
                  <small className="text-danger">{errors.MCQError}</small>
                  <div className="row">
                    {
                      exam.MCQQuestions && exam.MCQQuestions.map((que, j) => {
                        if (visibleQuestionIndex === j) {
                          return (
                            <div key={j} className='col-sm-12 col-md-6 offset-md-3 col-xs-12'>
                              <p className="text-muted text-dark mt-4">
                                {que.Question}
                              </p>
                              {
                                que.Answers.map((option, i) => (
                                  <div key={i} className={`form-group ${option.chooseAnswer ? 'text-success' : ''}`}>
                                    <input
                                      type="text"
                                      value={`${options[i]}. ${option.answertext}`}
                                      onChange={this.onChange}
                                      disabled
                                      className={`form-control disabled ${option.chooseAnswer ? 'text-primary border border-primary' : ''}`}
                                    />
                                    <label className="check-container">
                                      <input type="checkbox" name="correctAnswer" data-id={i} id={`${options[i]}`}
                                             onClick={this.onChange} checked={option.chooseAnswer}/>
                                      <span className="checkmark text-primary"/>
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
                    <div className="col-sm-12 col-md-6 offset-md-3 col-xs-12 mt-4 mb-4">
                      <button className="btn bg-white border border-primary text-primary pl-5 pr-5 mr-2"
                              onClick={() => this.onNextPrivious('Previous')} disabled={!visibleQuestionIndex}>Previous
                      </button>
                      <button className="btn bg-white border border-primary text-primary pl-5 pr-5"
                              onClick={() => this.onNextPrivious('Next')}
                              disabled={((exam.MCQCount - 1) === visibleQuestionIndex)}>Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {
            test === 2 && isCodingText &&
            <div className="col-sm-12 col-md-12 col-xs-12 mt-3">
              {
                exam.CodingTests && exam.CodingTests.length ? exam.CodingTests.map((codingTest, i) => (
                  <div  key={i}  className="row">
                    <div className="col-sm-6 col-md-6 col-xs-12 mt-3">
                      <div className="card">

                          <div className="card-body code-content">
                            <div className='row'>
                              <div className='col-md-12 col-sm-12 col-xs-12'>
                                <h3><b>2. Coding Test</b></h3>
                                <h6 className="card-subtitle text-secondary mb-2"><b>{codingTest.CodingTestName}</b></h6>
                              </div>
                            </div>
                            <p className="card-text text-muted" dangerouslySetInnerHTML={{ __html: codingTest.CodingTestDescription}} />
                          </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-xs-12 mt-3">
                      <div className="card">
                        <div className="card-body">
                          <div className='row'>
                            <div className='col-md-12 col-sm-12 col-xs-12'>
                              <div className="form-group">
                                <textarea name="codingTextAnswer" value={codingTest.codingTextAnswer || ''} placeholder="Code write here..." rows={15} onChange={this.onChange} className="form-control"/>
                                <small className="text-danger">{errors.codingTextAnswer || ''}</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )): null
              }
            </div>
          }
          {
            test === 3 &&
            <div className='col-sm-12 col-md-12 col-xs-12 mt-3 text-center'>
              <h3><b>Test Already Given</b></h3>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Invitation;
