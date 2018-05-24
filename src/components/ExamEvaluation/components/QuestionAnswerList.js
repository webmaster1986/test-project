import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const QuestionAnswerList = props => {
  const {startIndex, examStatus, percentageView, percentage, score, candidateAnswers} = props.state;
  const {questionByPage, pageContents, queCount,} = props;
  const totalQuestion = (candidateAnswers && candidateAnswers.testDetails && candidateAnswers.testDetails.MCQQuestions && candidateAnswers.testDetails.MCQQuestions.length) || 0;
  return (
    <div className={`col-sm-12 ${examStatus === 2 ? 'col-md-12' : 'col-md-7'} col-xs-12 mt-3`}>
      <div className="card">
        {
          !percentageView && questionByPage.length ?
          <div className="card-body">
            <div className='row'>
              <div className='col-md-8 col-sm-12 col-xs-12'>
                <div className="mb-1 text-muted"><small>#MCQ346565</small></div>
                <h6 className="card-subtitle text-secondary mb-2"><b>MCQ Test</b></h6>
              </div>
              <div className='col-md-4 col-sm-12 col-xs-12 text-right'>
                <a className="mr-3 text-secondary" onClick={props.viewAnswer}>X</a>
              </div>
            </div>
            <div className="card-text text-muted">
              {
                questionByPage.map((que,i) => (
                  <div key={i}>
                    <p className='question text-dark'><span>{startIndex + i + 1}.</span> {que.Question}</p>
                    <ul>
                      {que.Answers.map((ans, j) => (
                        <li key={j} className={que.correctIndex === j ? 'text-success' : que.givenIndex === j ? 'text-danger' : ''}>
                          <span>{queCount[j]}.</span> {ans.answertext} {que.correctIndex === j ? <i className="fa fa-check text-success" /> : que.givenIndex === j ? <i className="fa fa-times text-danger" /> : ''}</li>
                      ))}
                    </ul>
                  </div>
                ))
              }
              <ul className='text-right pages'>{ pageContents.map(x=>x) }</ul>
            </div>
          </div>
          :
          <div className="card-body text-center p-5">
            <div className='row'>
              <div className='col-md-12 col-sm-12 col-xs-12'>
                <div className="mb-1 text-muted"><small>#MCQ346565</small></div>
                <h6 className="card-subtitle text-secondary mb-2"><b>MCQ Test</b></h6>
              </div>
            </div>
            <div className="mt-4">
              <CircularProgressbar
                percentage={percentage}
                strokeWidth={3}
                textForPercentage={(percentage) => {
                  return percentage ? `${score}/${totalQuestion}` : `0/${totalQuestion}`
                }}
                className="circular-progressbar"
              />
              <button className="btn btn-success btn-rounded mt-4" onClick={props.viewAnswer}>View Answer</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
export default QuestionAnswerList
