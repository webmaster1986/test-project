import React from 'react';
import Modal from 'react-bootstrap4-modal';

const InviteCandidateModal = props => {
  const {isModal, handleModal, onChange, state, onSave} = props;
  return (
    <Modal visible={isModal}>
      <div className="modal-header">
        <h5 className="modal-title">Invite Candidate</h5>
        <button type="button" className="close" onClick={handleModal}>&times;</button>
      </div>
      <div className="modal-body">
        {
          state.inviteCandidate.link ?
            <div className="form-group">
              <label className="col-form-label"><b>Invitation Link</b></label>
              <input type="text" value={state.inviteCandidate.link} className="form-control" disabled/>
            </div>
          :
          <div className="form">
            <div className="form-group">
              <label className="col-form-label"><b>Candidate Name</b></label>
              <input name="candidateName" value={state.inviteCandidate.candidateName} onChange={onChange} className="form-control"/>
              <small className="text-danger">{state.errors.candidateName}</small>
            </div>
            <div className="form-group">
              <label className="col-form-label"><b>Candidate Email</b></label>
              <input name="candidateEmail" value={state.inviteCandidate.candidateEmail} onChange={onChange} className="form-control"/>
              <small className="text-danger">{state.errors.candidateEmail}</small>
            </div>
          </div>
        }
      </div>
      <div className="modal-footer">
        <a className="btn btn-default btn-sm" onClick={handleModal}>Cancel</a>
        {!state.inviteCandidate.link && <button type="button" className="btn btn-success btn-sm" onClick={onSave}>Save</button>}
      </div>
    </Modal>
  )
}
export default InviteCandidateModal
