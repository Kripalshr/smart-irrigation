import React, { Component } from 'react';
import './Form.css';
import logo from '../../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.css';
// import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
        fullName: '',
        email: '',
        password: '',
        isLoginForm: false,
        };
    }

handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
};

handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, password, isLoginForm } = this.state;
    let data = {};

    if (isLoginForm) {
        data = {
            email,
            password,
        };
    } else {
        data = {
            fullName,
            email,
            password,
        };
    }

    const endpoint = isLoginForm ? '/login' : '/signup';
    console.log(data, endpoint);

    // axios
    //     .post(endpoint, data)
    //     .then((response) => {
    //         console.log('Form submitted:', response.data);
    //         // Perform any additional logic or state updates based on the response
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         // Perform any error handling or display error messages
    // });
};

toggleFormMode = () => {
    this.setState((prevState) => ({
        isLoginForm: !prevState.isLoginForm,
    }));
};

render() {
    const { fullName, email, password, isLoginForm } = this.state;

    return (
        <div className="container">
            <div className="forms-container">
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h1>Rain Rain</h1>
            </div>
            <form onSubmit={this.handleSubmit}>
                {!isLoginForm && (
                    <div className="form-group groups">
                        <label>Name</label>
                        <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={this.handleChange}
                        />
                    </div>
                )}
                <div className="form-group groups">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.handleChange}
                />
                </div>
                <div className="form-group groups">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleChange}
                />
                </div>
                <button type="submit" className="btn btn-success btn-lg btn-block">
                {isLoginForm ? 'Login' : 'Sign up'}
                </button>
                <p>
                {
                    isLoginForm
                    ? "Don't have an account?"
                    : 'Already have an account? '
                }
                <span onClick={this.toggleFormMode}>
                    {isLoginForm ? 'Sign up' : 'Login'}
                </span>
                </p>
            </form>
            </div>
        </div>
    );
  }
}

export default Form;
