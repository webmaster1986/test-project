import React, {Component} from 'react';
import './Settings.css';
import GeneralInfo from "./component/GeneralInfo";
import AccountInfo from "./component/AccountInfo";
import UserManage from "./component/UserManage";
import { getUsersList, addUser, deleteUser } from "../../utils/_data";

class Settings extends Component {
  state = {
    users: [],
    fields: {
      firstName: '',
      lastName: '',
      email: '',
      designation: '',
    },
    errors: {
      firstName: '',
      lastName: '',
      email: '',
      designation: '',
    }
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers = () => {
    getUsersList().then( res => {
      this.setState({
        users: res,
      })
    }).catch(err => console.log(err));
  }

  onChange = (e) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [e.target.name]: this.validate(e.target.name, e.target.value),
      },
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      }
    });
  }

  validate = (name, value) => {
    switch (name) {
      case 'firstName':
        if (!value) {
          return 'First name is Required';
        } else {
          return '';
        }
      case 'lastName':
        if (!value) {
          return 'Last name is Required';
        } else {
          return '';
        }
      case 'email':
        if (!value) {
          return 'Email is Required';
        } else if (!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
          return 'Email is invalid';
        } else {
          return '';
        }
      case 'designation':
        if (!value) {
          return 'Designation is Required';
        } else {
          return '';
        }
      default: {
        return ''
      }
    }
  };

  onAddUser = (ev) => {
    ev.preventDefault();
    const { fields } = this.state;
    let validationErrors = {};
    Object.keys(fields).forEach(name => {
      const error = this.validate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      this.setState({errors: validationErrors});
      return;
    }
    addUser(fields).then(() => {
      this.getUsers();
      alert('User added successfully.');
      this.setState({
        fields: {},
      })
    }).catch(err => console.log(err))
  }

  onSavePassword = () => {

  }

  onDelete = (userId) => {
    deleteUser(userId).then(() => {
      this.getUsers();
    }).catch(err => console.log(err));
  }

  render() {
    const { users, errors,  fields } = this.state;
    return (
      <div className="settings mb-5">
        <div className="text-left mt-3">
          <h5>Settings</h5>
        </div>
        <hr/>
        <GeneralInfo errors={errors} fields={fields} onChange={this.onChange} />
        <hr/>
        <AccountInfo errors={errors} fields={fields} onChange={this.onChange} onAddUser={this.onSavePassword} />
        <hr/>
        <UserManage users={users} onDelete={this.onDelete} onAddUser={this.onAddUser}/>
      </div>
    );
  }
}

export default Settings;
