import React, { Component } from 'react'
import './signup.css';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { Redirect } from 'react-router'
//import { Redirect } from 'react-router';


class Signup extends Component {
    constructor() {
        super()
        this.validator = new SimpleReactValidator();
    }
    state={
           fullName:'',
            email:'',
            password:'',
            success:'',
            redirect: false
    }



    handleChange = (e)=>{
        const value =e.target.value;
        const name=e.target.name;
        
        this.setState({[name] :  value});
    }
    onSubmit= async (e)=> {
        e.preventDefault();
        if (this.validator.allValid()) {
            var addUser = {
                method: 'post',
                url: 'http://localhost:5000/users/singup',
                data: JSON.stringify({"name": this.state.fullName,"email":this.state.email,"password":this.state.password}),
                headers: {
                  'Content-Type': 'application/json'
                 },
                json: true
               };
            axios(addUser)
               .then((response) => {
                    this.setState({success:'User has been successfully added',redirect:true})
                   })
               .catch((error) => {
                  alert(error)
                 })
          } else {
            this.validator.showMessages();
            this.forceUpdate();
          }
    }

    render() {
        const { redirect } = this.state;
        if(redirect){ return <Redirect to="/login" />}

        return ( 
            <React.Fragment>
                <div className="sidenav">
                    <div className="login-main-text">
                        <h2>Application<br/> Register Page</h2>
                        <p>Thanks.</p>
                        <img src="https://amplesms247.com/images/300x250_en.gif" alt ="error" height="400px"/>
                    </div>
                </div>
                <div className="main">
                    <div className="col-md-6 col-sm-12">
                        <div className="login-form">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text" 
                                name="fullName"
                                value={this.state.fullName}
                                className="form-control" 
                                placeholder="User Name"
                                onChange={this.handleChange}/>
                                {/**********   This is where the magic happens     ***********/}
                                {this.validator.message('fullName', this.state.fullName, 'required|alpha|min:6', { className: 'text-danger' })}
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" 
                                name="email"
                                value={this.state.email}
                                className="form-control" 
                                placeholder="User Email"
                                onChange={this.handleChange}
                                />
                                {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" 
                                name="password"
                                value={this.state.password}
                                className="form-control" 
                                placeholder="Password"
                                onChange={this.handleChange}/>
                                {this.validator.message('password', this.state.password, 'required|min:6', { className: 'text-danger' })}
                            </div>
                            <button  className="btn btn-secondary">Register</button>
                            <NavLink  className="btn btn-black" to="/login">Login</NavLink>
                        </form>
                        </div>
                    </div>
                    <p className="text-success">{this.state.success==='' ? null : this.state.success }</p>
                </div>
            </React.Fragment>

        )
    }
}

export default Signup;
