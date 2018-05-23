import React, {Component} from 'react'
import {login} from "../../utils/_data";
import "./Login.css"

class Login extends Component{
  state = {
    fields: {
      email: '',
      password: '',
    },
    errors: {
      email: '',
      password: '',
    }
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
      case 'email':
        if (!value) {
          return 'Email Is Required';
        } else if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
          return 'Email Is Invalid';
        } else {
          return '';
        }
      case 'password':
        if (!value) {
          return 'Password is Required';
        } else {
          return '';
        }
      default: {
        return ''
      }
    }
  }

  onSave = () => {
    const {fields} = this.state;
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

    login(fields.email, fields.password).then((res)=> {
     if(res.length) {
        localStorage.setItem('user', JSON.stringify(res[0]));
        this.props.history.push('/overview');
     } else {
       this.setState(prevState => ({
         errors: {
             ...prevState.errors,
            unAuth: "Username and Password is Invalid"
         }
       }));
     }
    }).catch(err =>
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          unAuth: "Username and Password is Invalid"
        }
      }))
    );
  }

  render() {
    const {errors, fields} = this.state;

    return (
      <div className="container login-page">
        <div className="row">
          <div className="col-sm-6 offset-sm-3 col-md-6 offset-md-3 col-xs-12 mt-5">
            <div>
              <h1>Log in</h1>
            </div>
            <small className="text-danger">{errors.unAuth}</small>
            <div className="form-group mt-4">
              <input type="email" className="form-control form-control-lg" name="email" value={fields.email}
                     onChange={this.onChange} placeholder="Username"/>
              <small className="text-danger">{errors.email}</small>
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" name="password"
                     value={fields.password} onChange={this.onChange} placeholder="Password"/>
              <small className="text-danger">{errors.password}</small>
            </div>
            <div className="form-group">
              <button className="btn btn-primary mb1 bg-teal btn-lg btn-block" onClick={this.onSave}>Login</button>
            </div>
            <div className="form-group">
              <a className="text-info">Forgot Your Password?</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
