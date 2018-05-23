import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { getTestDetailsById, getInvitedCandidates, getTestById, addNewTestDetails, updateTestDetails, inviteCandidateForTest, getAllCandidateAnswer } from "../../utils/_data"
import './TestDetails.css'
import Candidates from "./component/Candidates";
import QuestionList from "./component/QuestionList";
import CodingContent from "./component/CodingContent";
import CreateMCQModal from "./component/CreateMCQModal";
import CreateCodingModal from "./component/CreateCodingModal";
import NewTestContent from "./component/NewTestContent";
import InviteCandidateModal from "./component/InviteCandidateModal";

const initialState = {
  fields: {
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
  },
  errors: {
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
  },
};

class TestDetails extends Component {
  state = {
    ...initialState,
    addTest: {
        testName: "",
        testId: "",
        MCQCount: "",
        MCQQuestions: [],
        CodingTestCount: "",
        CodingTests: [],
    },
    inviteCandidate: {
      candidateName: "",
      candidateEmail: "",
    },
    codingName: "",
    codingQuestion: "",
    users: [],
    candidates: [],
    testDetails: {},
    pages: 0,
    startIndex: 0,
    endIndex: 3,
    currentPage: 1,
    newTest: false,
    MCQModal: false,
    codingModal: false,
    inviteModal: false,
    loading: true,
  }

  componentWillMount() {
    const testId = (this.props.history.location && this.props.history.location.pathname.split('/')[2]) || '';
    const user =  localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    this.setState({
      user
    },() => {
      if(testId) {
        this.getTestDetails(testId);
        this.getAllCandidates(testId)
      }
    })
  }

  getTestDetails = async (testId) => {
    const {user} = this.state;
    const res = await getTestDetailsById(testId)
    if(res && res.length) {
      this.setState({
        newTest: false,
        loading: false,
        testDetails: res[0] || {},
        pages: (res[0].MCQQuestions && Math.ceil(res[0].MCQQuestions.length/3)) || 0,
        addTest: res[0] || {...this.state.addTest},
      })
    } else {
      const res1 = await getTestById(testId)
      if(res1) {
        this.setState({
          newTest: true,
          loading: false,
          testDetails: res1,
          addTest: {
            ...this.state.addTest,
            testName: res1.testName,
            testId: res1.id,
            companyName: user.companyName,
            companyId: user.companyId,
          },
        })
      }
    }
  }

  getAllCandidates = async (testId) => {
    const candidates = await getInvitedCandidates(testId)
    const candidatesAnswers = await getAllCandidateAnswer()
    candidates.forEach(candidate => {
      const answers = candidatesAnswers.filter(answer => candidate.examId === answer.examId);
      if(answers.length) {
        candidate.completionDate = answers[0].completionDate;
      }
    });
    this.setState({
      candidates,
    })
  }

  pagination = (currentPage) => {
     const startIndex = currentPage*3 - 3;
     const endIndex  = currentPage*3;
     this.setState({
       startIndex,
       currentPage,
       endIndex,
     })
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

  onCodingChange = (e) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [e.target.name]: this.validate(e.target.name, e.target.value),
      },
      [e.target.name]: e.target.value,
    })
  }

  onInviteChange = (e) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [e.target.name]: this.validate(e.target.name, e.target.value),
      },
      inviteCandidate: {
        ...this.state.inviteCandidate,
        [e.target.name]: e.target.value,
      }
    })
  }

  validate = (name, value) => {
    switch (name) {
      case 'question':
        if (!value) {
          return 'Question is Required';
        } else {
          return '';
        }
      case 'optionA':
        if (!value) {
          return 'Option A is Required';
        } else {
          return '';
        }
      case 'optionB':
        if (!value) {
          return 'Option B is Required';
        } else {
          return '';
        }
      case 'optionC':
        if (!value) {
          return 'Option C is Required';
        } else {
          return '';
        }
      case 'optionD':
        if (!value) {
          return 'Option D is Required';
        } else {
          return '';
        }
      case 'correctAnswer':
        if (!value) {
          return 'Please choose one correct Answer';
        } else {
          return '';
        }
      case 'codingQuestion':
        if (!value) {
          return 'Question is Required';
        } else {
          return '';
        }
      case 'codingName':
        if (!value) {
          return 'Name is Required';
        } else {
          return '';
        }
      case 'candidateName':
        if (!value) {
          return 'Candidate Name is Required';
        } else {
          return '';
        }
      case 'candidateEmail':
        if (!value) {
          return 'Email is Required';
        } else if (!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
          return 'Email is invalid';
        } else {
          return '';
        }
      default: {
        return ''
      }
    }
  };

  onSave = (status) => {
    const { fields, addTest, newTest } = this.state;
    const _this = this;
    let validationErrors = {};
    Object.keys(fields).forEach(name => {
      const error = this.validate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      this.setState({errors: validationErrors});
      return;
    }
    const Question = {
      "Question": fields.question,
      "Answers":[
        {
          "answertext": fields.optionA,
          "correctAnswer": fields.correctAnswer === "optionA",
        },
        {
          "answertext": fields.optionB,
          "correctAnswer": fields.correctAnswer === "optionB",
        },
        {
          "answertext": fields.optionC,
          "correctAnswer": fields.correctAnswer === "optionC",
        },
        {
          "answertext": fields.optionD,
          "correctAnswer": fields.correctAnswer === "optionD",
        }]
    };

    addTest.MCQCount = addTest.MCQQuestions.length + 1;
    addTest.MCQQuestions.push(Question);

    if(status === "save") {
      if(newTest) {
        addNewTestDetails(addTest).then((res) => {
          if(res) {
            _this.getTestDetails(res.testId);
            _this.handleMCQModal();
          }
        })
      } else {
        updateTestDetails(addTest).then((res) => {
          if(res) {
            _this.getTestDetails(res.testId);
            _this.handleMCQModal();
          }
        })
      }
    }
    if(status === "saveAndNew") {
      this.setState({
        ...initialState,
      })
    }
  }

  onCodingSave = () => {
    const { addTest, codingName, codingQuestion, newTest, testDetails } = this.state;
    const _this = this;
    const fields = {
      codingName: "",
      codingQuestion: "",
    };
    let validationErrors = {};
    Object.keys(fields).forEach(name => {
      const error = this.validate(name, this.state[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      this.setState({errors: validationErrors});
      return;
    }
    const Question =  {
      "CodingTestName": codingName,
      "CodingTestDescription": codingQuestion,
    };
    addTest.CodingTestCount = 1;
    addTest.CodingTests.push(Question);
    if(newTest) {
      addNewTestDetails(addTest).then((res) => {
        if(res) {
          _this.getTestDetails(testDetails.id);
          _this.handleCodingModal();
        }
      })
    }else {
      updateTestDetails(addTest).then((res) => {
        if(res) {
          _this.getTestDetails(testDetails.id);
          _this.handleCodingModal();
        }
      })
    }
  }

  onInviteSave = () => {
    const { inviteCandidate, testDetails, candidates, user } = this.state;
    let validationErrors = {};
    Object.keys(inviteCandidate).forEach(name => {
      const error = this.validate(name, inviteCandidate[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      this.setState({errors: validationErrors});
      return;
    }
    inviteCandidate.testId = testDetails.testId;
    inviteCandidate.examId = Math.random().toString(36).replace('0.', '');
    inviteCandidate.assignDate = new Date();
    inviteCandidate.companyName = user.companyName;
    inviteCandidate.companyId = user.companyId;
    inviteCandidateForTest(inviteCandidate).then((res) => {
      if(res) {
        candidates.push(res);
        this.setState({
          candidates,
          inviteCandidate: {
            link: `http://${window.location.host}/test/${testDetails.testName.replace(' ','_')}/${res.examId}`
          }
        })
      }
    })
  }

  handleMCQModal = () => {
      if (!this.state.MCQModal) {
          this.setState({
              MCQModal: !this.state.MCQModal,
              addTest: {
                  ...this.state.addTest,
                  MCQCount: "",
                  MCQQuestions: [],
              },
              ...initialState,
          })
      } else {
          this.setState({
              MCQModal: !this.state.MCQModal,
              ...initialState,
          })
      }
  }

  handleCodingModal = () => {
      if (!this.state.codingModal) {
          this.setState({
              codingModal: !this.state.codingModal,
              codingName: "",
              codingQuestion: "",
              addTest: {
                  ...this.state.addTest,
                  CodingTestCount: "",
                  CodingTests: [],
              },
              ...initialState,
          })
      } else {
          this.setState({
              ...initialState,
              codingModal: !this.state.codingModal,
              codingName: "",
              codingQuestion: "",
          })
      }
  }

  handleInviteModal = () => {
    this.setState({
      inviteModal: !this.state.inviteModal,
      inviteCandidate: {
        candidateName: "",
        candidateEmail: "",
      },
      errors: {},
    })
  }

  render() {
    const {testDetails, candidates, startIndex, endIndex, currentPage, pages, newTest, MCQModal, codingModal, inviteModal} = this.state;
    const queCount = ['A', 'B', 'C', 'D', 'E', 'F'];
    const questionByPage = (testDetails.MCQQuestions && testDetails.MCQQuestions.length && testDetails.MCQQuestions.slice(startIndex, endIndex)) || [];
    const pageContents = [];
    for (let i=0; i<pages; i++) {
      pageContents.push(<li key={i} className={i === currentPage-1 ? 'active' : ''} onClick={() => this.pagination(i+1)}>{i+1}</li>)
    }

    if (this.state.loading) {
      return <div />
    }

    return (
      <div className="test-details mb-5 mt-4">
        <CreateMCQModal isModal={MCQModal} state={this.state} onChange={this.onChange} onSave={this.onSave} handleModal={this.handleMCQModal}/>
        <CreateCodingModal isModal={codingModal} state={this.state} onChange={this.onCodingChange} onSave={this.onCodingSave} handleModal={this.handleCodingModal} />
        <InviteCandidateModal isModal={inviteModal} state={this.state} onChange={this.onInviteChange} onSave={this.onInviteSave} handleModal={this.handleInviteModal} />
        <div className='row'>
            <div className='col-sm-12 col-md-12 col-xs-12 mb-3'>
              <Link  to={`/tests`} className="mr-3 text-secondary" title="View Details"><i className="fa fa-angle-left" /> Back</Link>
            </div>
            <div className="col-sm-8 col-md-8 col-xs-12">
              <div className='row'>
                <div className="col-sm-10 col-md-10 col-xs-12">
                  <div className="test-title"><h4 className='text-dark'>{testDetails.testName}</h4></div>
                  <div className="test-description text-muted">{testDetails.description}  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</div>
                </div>
                <div className="col-sm-2 col-md-2 col-xs-12">
                  <div className='btn btn-default border-dark btn-rounded invites-bg'>{candidates.length} Invites</div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-xs-12 text-right">
              <button type="button" className='btn btn-success btn-rounded' onClick={this.handleInviteModal}>Invite Candidate</button>
            </div>
          </div>
          {
            newTest ?
              <NewTestContent handleMCQModal={this.handleMCQModal} handleCodingModal={this.handleCodingModal}/>
            :
            <div className="row">
              <QuestionList startIndex={startIndex} queCount={queCount} questionByPage={questionByPage} handleMCQModal={this.handleMCQModal} pageContents={pageContents}/>
              <CodingContent testDetails={testDetails} handleCodingModal={this.handleCodingModal}/>
            </div>
          }
          <hr/>
          <div className="row">
            <Candidates candidates={candidates} testName={testDetails.testName}/>
          </div>
      </div>
    );
  }
}

export default TestDetails;
