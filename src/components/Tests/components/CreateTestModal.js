import React from 'react';
import Modal from 'react-bootstrap4-modal';

const CreateTestModal = props => {
  const {isModal, handleModal, state, onChange, onSave} = props;
  return (
    <Modal visible={isModal}>
      <div className="modal-header">
        <h5 className="modal-title">Create Custom Test</h5>
        <button type="button" className="close" onClick={handleModal}>&times;</button>
      </div>
      <div className="modal-body">
        <p className="text-muted">This will save your new test. You can then create MCQ and Coding Test components as part of the test</p>
        <div className="form">
          <div className="form-group">
            <label className="col-form-label"><b>Test Name</b></label>
            <input type="text" name="testName" value={state.fields.testName} onChange={onChange} className="form-control"/>
            <small className="text-danger">{state.errors.testName}</small>
          </div>
          <div className="form-group">
            <label className="col-form-label"><b>Description</b></label>
            <textarea name="description" value={state.fields.description} onChange={onChange} className="form-control"/>
            <small className="text-danger">{state.errors.description}</small>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-success btn-sm" onClick={onSave}>Save Test</button>
      </div>
    </Modal>
  )
}
export default CreateTestModal
