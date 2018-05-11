import React from 'react';

const CodingContent = props => {
  const {testDetails, handleCodingModal} = props;
  return (
    <div className='col-sm-12 col-md-5 col-xs-12 mt-3'>
      <div className="card">
        {testDetails.CodingTests && testDetails.CodingTests.length ? testDetails.CodingTests.map((codingTest, i) => (
          <div key={i} className="card-body">
            <div className='row'>
              <div className='col-md-8 col-sm-12 col-xs-12'>
                <div className="mb-1 text-muted"><small>#MCQ346565</small></div>
                <h6 className="card-subtitle text-secondary mb-2"><b>{codingTest.CodingTestName}</b></h6>
              </div>
              <div className='col-md-4 col-sm-12 col-xs-12 text-right'>
                <a className="text-secondary">Change</a>
              </div>
            </div>
            <p className="card-text text-muted" dangerouslySetInnerHTML={{ __html: codingTest.CodingTestDescription}} />
          </div>
        )):
          <div className="card-body text-center p-5">
            <h4 className="text-dark">Add Coding Test</h4>
            <p className="text-muted mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="mt-4">
              <button className="btn btn-success btn-rounded" onClick={handleCodingModal}>Add Coding Test</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
export default CodingContent
