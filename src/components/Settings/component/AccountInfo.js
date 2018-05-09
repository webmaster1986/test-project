import React from 'react';

const AccountInfo = props => {
  const {errors, fields, onChange, onSavePassword} = props;
  return (
    <div className='row'>
      <div className='col-sm-8 col-md-8 col-xs-8'>
        <div>
          <h6 className='heading'>Account Information</h6>
          <small className='text-muted'>Changes your password.</small>
        </div>
        <div className='row pt-3'>
          <div className='col-sm-6 col-md-6 col-xs-12'>
            <div className="form-group">
              <small className="text-muted">Current Password</small>
              <input type="text" name="currentPassword" className="form-control text-field" value={fields.currentPassword || ''} onChange={onChange}/>
              <small className="error">{errors.currentPassword}</small>
            </div>
          </div>
          <div className='col-sm-6 col-md-6 col-xs-12'>
            <div className="form-group">
              <small className="text-muted">New Password</small>
              <input type="text" name="newPassword" className="form-control text-field" value={fields.newPassword || ''} onChange={onChange}/>
              <small className="error">{errors.newPassword}</small>
            </div>
          </div>
        </div>
      </div>
      <div className='col-sm-4 col-md-4 col-xs-12'>
        <div className='row pt-4   mt-5'>
          <div className='col-sm-12 col-md-12 col-xs-12'>
            <div className="form-group">
              <button className="btn btn-primary btn-sm mt-3" onClick={onSavePassword}><small>Save Password</small></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AccountInfo
