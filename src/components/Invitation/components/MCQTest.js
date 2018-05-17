import React from 'react';

const MCQTest = props => {
  const { visibleQuestionIndex, exam, onNextPrivious, errors, onChange } = props;
  const options = ['A', 'B', 'C', 'D'];
  return (
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
                            <div
                              data-name="correctAnswer"
                              id={`${options[i]}`}
                              data-id={i}
                              onClick={onChange}
                              className={`form-control text-left disabled ${option.chooseAnswer ? 'text-primary border border-primary' : ''}`}
                            >{options[i]}. {option.answertext}</div>
                            <label className="check-container">
                              <input type="checkbox" name="correctAnswer" data-id={i} id={`${options[i]}`}
                                     onClick={onChange} checked={option.chooseAnswer}/>
                              <span className="checkmark text-primary"/>
                            </label>
                            <small className="text-danger">{errors[`option${options[i]}`]}</small>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                return null
              })
            }
            <div className="col-sm-12 col-md-6 offset-md-3 col-xs-12 mt-4 mb-4">
              <button className="btn bg-white border border-primary text-primary pl-5 pr-5 mr-2"
                      onClick={() => onNextPrivious('Previous')} disabled={!visibleQuestionIndex}>Previous
              </button>
              <button className="btn bg-white border border-primary text-primary pl-5 pr-5"
                      onClick={() => onNextPrivious('Next')}
                      disabled={((exam.MCQCount - 1) === visibleQuestionIndex)}>Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MCQTest