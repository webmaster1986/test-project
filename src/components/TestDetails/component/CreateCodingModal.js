import React from 'react';
import Modal from 'react-bootstrap4-modal';

const CreateCodingModal = props => {
  const {isModal, handleModal, state, onChange, onSave} = props;
  return (
    <Modal visible={isModal}>
      <div className="modal-body">
        <button type="button" className="close" onClick={handleModal}>&times;</button>
        <div className="form mt-4">
          <div className="form-group">
            <h5>Add Coding Test</h5>
            <p className="text-muted"><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. </small></p>
          </div>
          <div className="form-group">
            <label className="col-form-label"><b>Coding Name</b></label>
            <input type="text" name="codingName" value={state.codingName} onChange={onChange} className="form-control"/>
            <small className="text-danger">{state.errors.codingName}</small>
          </div>
          <div className="form-group">
            <label className="col-form-label"><b>Question</b></label>
            <textarea name="codingQuestion" rows={6} value={state.codingQuestion} onChange={onChange} className="form-control"/>
            <small className="text-danger">{state.errors.codingQuestion}</small>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-success btn-sm" onClick={onSave}>Save</button>
      </div>
    </Modal>
  )
}
export default CreateCodingModal
