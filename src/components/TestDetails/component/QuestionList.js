import React from 'react';

const QuestionList = props => {
  const {questionByPage, pageContents, startIndex, queCount} = props;
  return (
    <div className='col-sm-12 col-md-8 col-xs-12 mt-3'>
      <div className="card">
        <div className="card-body">
          <div className='row'>
            <div className='col-md-8 col-sm-12 col-xs-12'>
              <div className="mb-1 text-muted"><small>#MCQ346565</small></div>
              <h6 className="card-subtitle text-secondary mb-2"><b>MCQ Test</b></h6>
            </div>
            <div className='col-md-4 col-sm-12 col-xs-12 text-right'>
              <a className="mr-3 text-secondary">Change MCQ</a>
              <a className="mr-3 text-secondary">Edit</a>
            </div>
          </div>
          <div className="card-text text-muted">
            {
              questionByPage.map((que,i) => (
                <div key={i}>
                  <p className='question text-dark'><span>{startIndex+i+1}.</span> {que.Question}</p>
                  <ul>
                    {que.Answers.map((ans,j) =>(
                      <li key={j} className={ans.correctAnswer && ans.correctAnswer.toString() === 'true' ? 'text-success' : ''}><span>{queCount[j]}.</span> {ans.answertext} </li>
                    ))}
                  </ul>
                </div>
              ))
            }
            <ul className='text-right pages'>{ pageContents.map(x=>x) }</ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default QuestionList
