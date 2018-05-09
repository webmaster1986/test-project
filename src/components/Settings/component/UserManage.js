import React from 'react';

const UserManage = props => {
  const { users, onDelete, onAddUser} = props;
  return (
    <div className='row user-management'>
      <div className='col-sm-8 col-md-8 col-xs-12'>
          <h6 className='heading'>User Management</h6>
          <small className='text-muted'>Manage your user's account.</small>
      </div>
      <div className='col-sm-4 col-md-4 col-xs-12'>
        <div className="form-group text-right">
          <button className="btn btn-primary btn-sm mt-4" onClick={onAddUser}><small>Add new user</small></button>
        </div>
      </div>
      <div className='col-sm-12 col-md-12 col-xs-12'>
        <table className="table table-row-header">
          <thead>
            <tr>
              <th scope="col"><small>ID</small></th>
              <th scope="col"><small>Name</small></th>
              <th scope="col"><small>Email</small></th>
              <th scope="col"><small>Designation</small></th>
              <th scope="col"><small>Action</small></th>
            </tr>
          </thead>
          <tbody>
          {
            users.length > 0 ? users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.designation}</td>
                <td>
                  <div><a className="link mr-1">Change Password</a></div>
                  <div><a className="link" onClick={() => onDelete(user.id)}>Delete</a></div>
                </td>
              </tr>
            )) : null
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default UserManage