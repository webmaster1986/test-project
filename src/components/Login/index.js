import React, {Component} from 'react'
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
        },
        login: [],
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
        const { fields, login} = this.state;
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

            login.push(fields);
            this.setState({
                login: login
            });
            console.log(login);
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="form_bg">
                            <div style={{color: "black"}}>
                            <h1>Log in</h1>
                            </div>
                                <br/>
                            <div className="form-group" >
                                <input type="email"
                                       className="form-control form-control-lg"
                                       name="email"
                                       value={this.state.fields.email}
                                       onChange={this.onChange}
                                       id="userid"
                                       style={{height: "70px", marginTop: "-35px"}}
                                       placeholder="Username"/>
                                <small className="text-danger" style={{fontSize: "50%",fontWeight: "bold"}}>{this.state.errors.email}</small>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       className="form-control form-control-lg"
                                       name="password"
                                       value={this.state.fields.password}
                                       onChange={this.onChange}
                                       id="pwd"
                                       style={{height: "70px"}}
                                       placeholder="Password"/>
                                <small className="text-danger" style={{fontSize: "50%",fontWeight: "bold"}}>{this.state.errors.password}</small>
                            </div>
                            <br/>
                            <div className="form-group">
                                <button type="submit"
                                        className="btn btn-primary mb1 bg-teal btn-lg btn-block"
                                        id="login"
                                        style={{height: "70px", marginTop: "-32px"}}
                                        onClick={this.onSave}>Login</button>
                            </div>
                            <div className="form-group">
                                <a style={{cursor: "cursor", color: "cornflowerblue"}}>Forgot Your Password?</a>
                            </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Login
