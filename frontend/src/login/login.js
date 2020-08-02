import React, { Component } from 'react'
import './login.css';
import AuthService from "../authservice/authService";
import SimpleReactValidator from 'simple-react-validator';
import { Redirect } from 'react-router'


class Login extends Component {
    constructor() {
        super()
        this.validator = new SimpleReactValidator();
      }
      
    state = {
        email: "",
        password: "",
        loading: false,
        message: "",
        redirect: false

      };

      handleChange = (e)=>{
        const value =e.target.value;
        const name=e.target.name;
        this.setState({[name] :  value});
    }

    handleLogin= (e)=>{
        e.preventDefault()
        this.setState({
            message: "",
            loading: true,
          });
        if (this.validator.allValid()) {
            AuthService.login(this.state.email, this.state.password).then(
                () => {
                  //this.props.history.push("/profile");
                  this.setState({redirect:true})
                  window.location.reload();

                },
                error => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
        
                  this.setState({
                    loading: false,
                    message: resMessage,
                  });
                }
            );


        }else{
            this.validator.showMessages();
            this.forceUpdate();     
        }
    }

    render() {
        const { redirect } = this.state;
        if(redirect){ return <Redirect to="/" />}

        return (
            <React.Fragment>
                <div className="sidenav">
                    <div className="login-main-text">
                        <h2>Application<br/> Login Page</h2>
                        <p>Login or register from here to access.</p>
                    </div>
                </div>
                <div className="main">
                    <div className="col-md-6 col-sm-12">
                        <div className="login-form">
                        <form onSubmit={this.handleLogin}>
                            <div className="form-group">
                                <label>User email</label>
                                <input type="email" 
                                className="form-control" 
                                placeholder="User Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}/>
                                {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}

                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" 
                                className="form-control" 
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}/>
                                {this.validator.message('password', this.state.password, 'required|min:6', { className: 'text-danger' })}

                            </div>
                            <button type="submit" className="btn btn-black">Login</button>
                        
                        </form>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default Login;