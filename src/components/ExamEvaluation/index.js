import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
  getCandidateAnswer,
  getTestDetailsById,
} from "../../utils/_data";
import moment from "moment/moment";
import QuestionAnswerList from "./components/QuestionAnswerList";
import AnswerCodingContent from "./components/AnswerCodingContent";


class ExamEvaluation extends Component{
  state = {
    candidateAnswers: [],
    pages: 0,
    startIndex: 0,
    endIndex: 3,
    currentPage: 1,
    examStatus: "",
    percentageView: true,
    percentage: 0
  }

  componentWillMount() {
    const examId = (this.props.history.location.pathname && this.props.history.location.pathname.split('/').length && this.props.history.location.pathname.split('/')[1]) || "";
    if(examId) {
      this.getAnswers(examId)
    }
  }

  getAnswers = async (examId) => {
    let {examStatus} = this.state
    let candidateAnswers = await getCandidateAnswer(examId)

    if(candidateAnswers && Array.isArray(candidateAnswers) && candidateAnswers.length) {
      const testDetails = await getTestDetailsById(candidateAnswers[0].testId)
      if(testDetails && Array.isArray(testDetails) && testDetails.length) {
        candidateAnswers = candidateAnswers[0];
        candidateAnswers.testDetails = testDetails[0];
        const isMCQ = !!testDetails[0].MCQCount;
        const isCodingText = !!testDetails[0].CodingTestCount;
        if (isCodingText && isMCQ) {
          examStatus = 1
        } else if (isMCQ) {
          examStatus = 2
        } else if(isCodingText) {
          examStatus = 3
        }
        this.setState({
          examStatus,
          candidateAnswers,
          pages: (testDetails[0].MCQQuestions && Math.ceil(testDetails[0].MCQQuestions.length/3)) || 0,
        }, () => {
          const {candidateAnswers} = this.state;
          this.getExamScore(candidateAnswers.testDetails.MCQQuestions, candidateAnswers.MCQQuestions)
        })
      }
    }
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

  getExamScore = (Questions, Answers) => {
    const { candidateAnswers } = this.state;
    const answer = ["A", "B", "C", "D"];

    Questions.forEach((ans, i) => {
      const correct = ans.Answers.findIndex(x=>x.correctAnswer)
      const given = Answers[i].Answers
      const givenIndex = answer.findIndex(x => x === given);
      ans.isRight = answer[correct] === given;
      ans.givenIndex = givenIndex;
      ans.correctIndex = correct
    })

    const score = Questions.filter(ques => ques.isRight);
    candidateAnswers.testDetails.MCQQuestions = Questions;

    this.setState({
      score: score.length,
      percentage: (score.length*100)/Questions.length,
      candidateAnswers,
    })
  }

  viewAnswer = () => {
    this.setState(prevState => ({
      percentageView: !prevState.percentageView
    }));
  }

  render() {
    const { candidateAnswers, startIndex, endIndex, pages, currentPage, examStatus } = this.state;
    const testDetails = candidateAnswers.testDetails;
    const queCount = ['A', 'B', 'C', 'D', 'E', 'F'];
    const questionByPage = (testDetails && testDetails.MCQQuestions && testDetails.MCQQuestions.length && testDetails.MCQQuestions.slice(startIndex, endIndex)) || [];
    const pageContents = [];
    for (let i=0; i< pages; i++) {
      pageContents.push(<li key={i} className={i === currentPage-1 ? 'active' : ''} onClick={() => this.pagination(i+1)}>{i+1}</li>)
    }
    return (
      <div className="test-details mb-5 mt-4">
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-xs-12 mb-3'>
            <Link  to={`/evaluations`} className="mr-3 text-secondary" title="View Details"><i className="fa fa-angle-left" /> Back to Evaluation</Link>
          </div>
          <div className="col-sm-12 col-md-12 col-xs-12">
            <div className="test-title inline-block mr-2"><h4 className='text-dark'>{testDetails && testDetails.testName}</h4></div>
            <span className="inline-block">{candidateAnswers && moment(candidateAnswers.completionDate).format('MM/DD/YYYY hh:mm a')}</span>
          </div>
        </div>
        <div className="row">
          {examStatus && (examStatus === 1 || examStatus === 2 ) && <QuestionAnswerList state={this.state} queCount={queCount} questionByPage={questionByPage} pageContents={pageContents} viewAnswer={this.viewAnswer}/>}
          {examStatus && (examStatus === 1 || examStatus === 3 ) && <AnswerCodingContent examStatus={examStatus} testDetails={testDetails} /> }
        </div>
      </div>
    )
  }
}

export default ExamEvaluation
