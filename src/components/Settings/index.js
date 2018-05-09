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
      designation: '',
      newPassword: '',
      currentPassword: '',
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
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      }
    })
  }

  onAddUser = () => {
    const { fields } = this.state;
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
