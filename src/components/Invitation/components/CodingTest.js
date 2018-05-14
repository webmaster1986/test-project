import React from 'react';

const CodingTest = props => {
  const { isMCQ, exam, errors, onChange } = props;
  return (
    <div className="col-sm-12 col-md-12 col-xs-12 mt-3">
      {
        exam.CodingTests && exam.CodingTests.length ? exam.CodingTests.map((codingTest, i) => (
          <div  key={i}  className="row">
            <div className="col-sm-6 col-md-6 col-xs-12 mt-3">
              <div className="card">

                <div className="card-body code-content">
                  <div className='row'>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                      <h3><b>{isMCQ ? '2.' : '1.'} Coding Test</b></h3>
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
                        <textarea name="codingTextAnswer" value={codingTest.codingTextAnswer || ''} placeholder="Code write here..." rows={15} onChange={onChange} className="form-control"/>
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
  )
}
export default CodingTest