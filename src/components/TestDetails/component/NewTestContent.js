import React from 'react';

const NewTestContent = props => {
  const {handleMCQModal, handleCodingModal} = props;
  return (
    <div className="row new-test">
      <div className='col-sm-12 col-md-12 col-xs-12 mt-3'>
        <div className="card">
          <div className="card-body text-center">
            <h4 className="text-dark">Add MCQ And Coding Test</h4>
            <p className="text-muted mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="mt-4">
              <button className="btn btn-success btn-rounded mr-2" onClick={handleMCQModal}>Add MCQ Test</button>
              <button className="btn btn-success btn-rounded" onClick={handleCodingModal}>Add Coding Test</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NewTestContent
