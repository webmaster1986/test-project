import React from 'react';
import User from '../../../assets/images/avatar.png'

const GeneralInfo = props => {
  const {errors, fields, onChange} = props;
  return (
    <div className='row'>
      <div className='col-sm-8 col-md-8 col-xs-8'>
        <div>
          <h6 className='heading'>General Information</h6>
          <small className='text-muted'>Setup tour account, edit profile details & change password.</small>
        </div>
        <div className='row pt-3'>
          <div className='col-sm-6 col-md-6 col-xs-12'>
            <div className="form-group">
              <small className="text-muted">First Name*</small>
              <input type="text" name="firstName" className="form-control text-field" value={fields.firstName || ''} onChange={onChange}/>
              <small className="text-danger">{errors.firstName}</small>
            </div>
          </div>
          <div className='col-sm-6 col-md-6 col-xs-12'>
            <div className="form-group">
              <small className="text-muted">Last Name*</small>
              <input type="text" name="lastName" className="form-control text-field" value={fields.lastName || ''} onChange={onChange}/>
              <small className="text-danger">{errors.lastName}</small>
            </div>
          </div>
          <div className='col-sm-6 col-md-6 col-xs-12'>
            <div className="form-group">
              <small className="text-muted">Email*</small>
              <input type="text" name="email" className="form-control text-field" value={fields.email || ''} onChange={onChange}/>
              <small className="text-danger">{errors.email}</small>
            </div>
          </div>
          <div className='col-sm-6 col-md-6 col-xs-12'>
            <div className="form-group">
              <small className="text-muted">Designation*</small>
              <input type="text" name="designation" className="form-control text-field" value={fields.designation || ''} onChange={onChange}/>
              <small className="text-danger">{errors.designation}</small>
            </div>
          </div>
        </div>
      </div>
      <div className='col-sm-4 col-md-4 col-xs-12'>
        <div className='user-image text-center mt-5'>
          <img alt='user' src={User} width={'50%'}/>
        </div>
      </div>
    </div>
  )
}
export default GeneralInfo