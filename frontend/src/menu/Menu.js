import React, { Component, Fragment } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
import AuthService from "../authservice/authService";

export default class Menu extends Component {
    state = {
        currentUser: undefined
      };
    
      componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user,
          });
        }
      }
    
      logOut() {
        AuthService.logout();
      }
    render() {
        const { currentUser  } = this.state;
        return (
            <div>
                <Navbar bg='dark' expand='lg'>
                <Navbar.Brand to="/">Movies</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='mr-auto'>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/">Home</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/users">Profile</NavLink>
                        {
                            currentUser ? 
                                <NavLink className="d-inline p-2 bg-dark text-white" to="/login">Logout</NavLink>
                            : (<Fragment>
                                <NavLink className="d-inline p-2 bg-dark text-white" to="/login">Login</NavLink>
                                <NavLink className="d-inline p-2 bg-dark text-white" to="/signup">Signup</NavLink>
                            </Fragment>
                            )
                        }
                        
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
