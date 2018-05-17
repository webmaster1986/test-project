import React, {Component} from 'react'
import swal from 'sweetalert';
import {getCandidateInvitation, getTestDetailsById, addCandidateAnswer, updateCandidateAnswer, getCandidateAnswer} from "../../utils/_data";
import './invitation.css'
import MCQTest from "./components/MCQTest";
import CodingTest from "./components/CodingTest";

class Invitation extends Component {
  state = {
    candidate: {},
    exam: {},
    test: "",
    visibleQuestionIndex: 0,
    errors: {},
    isNew: false,
    isMCQ: false,
    isCodingText: false,
    inProgress: false,
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
           getTestDetailsById(candidateAnswer.testId).then(exam => {
             if(exam.length) {
                exam = exam[0];
                const isMCQ = !!exam.MCQCount;
                const isCodingText = !!exam.CodingTestCount;
                if (!candidateAnswer.MCQQuestions && isMCQ) {
                  test = 1
                } else if (!candidateAnswer.CodingTests && isCodingText) {
                  test = 2
                } else if((!!candidateAnswer.MCQQuestions && isMCQ) || (!!candidateAnswer.CodingTests && isCodingText)  ) {
                  test = 4
                }
                this.setState({
                  candidate: candidateAnswer,
                  exam,
                  test,
                  isNew,
                  isMCQ,
                  isCodingText
                })
              } else {
               this.setState({test: 5})
             }
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
  }

  onChange = (e) => {
    let { visibleQuestionIndex, exam} = this.state;
    if(e.target.name === "correctAnswer" || (e.target.attributes["data-name"] &&e.target.attributes["data-name"].value === "correctAnswer")) {
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
    let { exam, candidate, isNew, isMCQ, isCodingText } = this.state;
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

    this.setState({
        inProgress: true,
    }, () => {
      if(isNew) {
          delete candidate['id'];
          candidate.completionDate = new Date();
          addCandidateAnswer(candidate).then(candidateAnswer => {
              if (!candidateAnswer.MCQQuestions && isMCQ) {
                  test = 1
              } else if (!candidateAnswer.CodingTests && isCodingText) {
                  test = 2
              } else {
                  test = 3
              }
              this.setState({
                  test,
                  inProgress: false,
              });
              swal(message, {
                  icon: "success",
              });
          }).catch(err => console.log(err));
      } else {
        candidate.completionDate = new Date();
        updateCandidateAnswer(candidate).then(candidateAnswer => {
            if (!candidateAnswer.MCQQuestions && isMCQ) {
                test = 1
            } else if (!candidateAnswer.CodingTests && isCodingText) {
                test = 2
            } else {
                test = 3
            }
            this.setState({
                test,
                inProgress: false,
            });
            swal(message, {
                icon: "success",
            });
        }).catch(err => console.log(err));
      }
    })

  }

  render() {
    const { exam, errors, visibleQuestionIndex, test, isMCQ, isCodingText, inProgress } = this.state;
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
          {test === 2 && isMCQ &&
            <div className='col-sm-6 col-md-6 col-xs-12 mt-3'>
              <h3><b>1. MCQ Test</b> <i className="ml-2 fa fa-check text-success" aria-hidden="true" /></h3>
            </div>
          }
          <div className={`col-xs-12 mt-5 text-right ${isMCQ ? 'col-sm-6 col-md-6' : 'col-sm-12 col-md-12'}`}>
            {test === 1 && isMCQ && <button className="btn btn-primary" disabled={inProgress} onClick={() => this.onSave('MCQ')}>Submit</button>}
            {test === 2 && isCodingText && <button className="btn btn-primary" onClick={() => this.onSave('Coding')}>Submit</button>}
          </div>
        </div>
        <div className="row new-test">
          {test === 1 && isMCQ &&
            <MCQTest visibleQuestionIndex={visibleQuestionIndex} exam={exam} onChange={this.onChange} onNextPrivious={this.onNextPrivious} errors={errors} />
          }
          {
            test === 2 && isCodingText &&
            <CodingTest isMCQ={isMCQ} exam={exam} errors={errors} onChange={this.onChange}/>
          }
          {
            test === 3 &&
            <div className='col-sm-12 col-md-12 col-xs-12 mt-3 text-center'>
              <h3><b>Test is Completed.</b></h3>
            </div>
          }
          {
            test === 4 &&
            <div className='col-sm-12 col-md-12 col-xs-12 mt-3 text-center'>
              <h3><b>Test Already Given.</b></h3>
            </div>
          }
          {
            test === 5 &&
            <div className='col-sm-12 col-md-12 col-xs-12 mt-3 text-center'>
              <h3><b>MCQ or Coding Test Not Found.</b></h3>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Invitation;
