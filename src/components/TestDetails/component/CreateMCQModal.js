import React from 'react';
import Modal from 'react-bootstrap4-modal';

const CreateMCQModal = props => {
  const {isModal, handleModal, state, onChange, onSave} = props;
  const options = ['A', 'B', 'C', 'D'];
  return (
    <Modal visible={isModal}>
      <div className="modal-body">
        <button type="button" className="close" onClick={handleModal}>&times;</button>
        <div className="form mt-4">
          <div className="form-group">
            <h6>Add Question 1</h6>
            <p className="text-muted"><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </small></p>
          </div>
          <div className="form-group">
            <label className="col-form-label"><b>Question</b></label>
            <input type="text" name="question" value={state.fields.question} onChange={onChange} className="form-control"/>
            <small className="text-danger">{state.errors.question}</small>
          </div>
          {
            options && options.map(option => (
              <div key={option} className={`form-group ${state.fields.correctAnswer === `option${option}` ? 'text-success' : ''}`}>
                <label className="col-form-label"><b>Option {option}</b></label>
                <input type="text" name={`option${option}`} value={state.fields[`option${option}`]} onChange={onChange} className={`form-control ${state.fields.correctAnswer === `option${option}` ? 'text-success border border-success' : ''}`}/>
                <label className="container">
                  <input type="checkbox" name="correctAnswer" id={`option${option}`} onClick={onChange} checked={state.fields.correctAnswer === `option${option}`}/>
                  <span className="checkmark text-success" />
                </label>
                <small className="text-danger">{state.errors[`option${option}`]}</small>
              </div>
            ))
          }
          <small className="text-danger">{state.errors.correctAnswer}</small>
        </div>
      </div>
      <div className="modal-footer">
        <a className="btn btn-default btn-sm text-success" onClick={() => onSave("save")}>Save</a>
        <button type="button" className="btn btn-success btn-sm" onClick={() => onSave("saveAndNew")}>Save + New</button>
      </div>
    </Modal>
  )
}
export default CreateMCQModal
