import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { getTestDetailsById, getCandidates } from "../../utils/_data"
import './TestDetails.css'
import Candidates from "./component/Candidates";
import QuestionList from "./component/QuestionList";
import CodingContent from "./component/CodingContent";

class TestDetails extends Component {
  state = {
    users: [],
    candidates: [],
    testDetails: {},
    pages: 0,
    startIndex: 0,
    endIndex: 2,
    currentPage: 1,
  }

  componentWillMount() {
    const testId = (this.props.history.location && this.props.history.location.pathname.split('/')[2]) || '';
    if(testId) {
      this.getTestDetails(testId);
    }
    this.getAllCandidates()
  }

  getTestDetails = (testId) => {
    getTestDetailsById(testId).then( res => {
      this.setState({
        testDetails: res || {},
        pages: (res.MCQQuestions && Math.ceil(res.MCQQuestions.length/2)) || 0,
      })
    }).catch(err => console.log(err));
  }

  getAllCandidates = () => {
    getCandidates().then( res => {
      this.setState({
        candidates: res,
      })
    }).catch(err => console.log(err));
  }

  pagination = (currentPage) => {
     const startIndex = currentPage*2 - 2;
     const endIndex  = currentPage*2;
     this.setState({
       startIndex,
       currentPage,
       endIndex,
     })
  }

  render() {
    const {testDetails, candidates, startIndex, endIndex, currentPage, pages} = this.state;
    const queCount = ['A', 'B', 'C', 'D', 'E', 'F'];
    const questionByPage = (testDetails.MCQQuestions && testDetails.MCQQuestions.length && testDetails.MCQQuestions.slice(startIndex, endIndex)) || [];
    const pageContents = [];
    for (let i=0; i<pages; i++) {
      pageContents.push(<li key={i} className={i === currentPage-1 ? 'active' : ''} onClick={() => this.pagination(i+1)}>{i+1}</li>)
    }
    if(testDetails && !testDetails.id) {
        return (
          <div className="overview">

          </div>
        )
    }

    return (
      <div className="test-details mb-5 mt-4">
        {testDetails.id ?
          <div className='row'>
            <div className='col-sm-12 col-md-12 col-xs-12 mb-3'>
              <Link  to={`/tests`} className="mr-3 text-secondary" title="View Details"><i className="fa fa-angle-left" /> Back</Link>
            </div>
            <div className="col-sm-8 col-md-8 col-xs-12">
              <div className='row'>
                <div className="col-sm-10 col-md-10 col-xs-12">
                  <div className="test-title"><h4 className='text-dark'>Fronted Test-1 For Full stack developer job {testDetails.testName}</h4></div>
                  <div className="test-description text-muted">This test expected to be completed within 2 hours.</div>
                </div>
                <div className="col-sm-2 col-md-2 col-xs-12">
                  <div className='btn btn-default border-dark btn-rounded invites-bg'>4 Invites</div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-xs-12 text-right">
              <button type="button" className='btn btn-success btn-rounded'>Invite Candidate</button>
            </div>
            <QuestionList startIndex={startIndex} queCount={queCount} questionByPage={questionByPage} pageContents={pageContents}/>
            <CodingContent testDetails={testDetails}/>
            <hr/>
            <Candidates candidates={candidates}/>
          </div>
          :
          <div className='text-center'>
            <h4>Question Not Found</h4>
          </div>
        }
      </div>
    );
  }
}

export default TestDetails;
