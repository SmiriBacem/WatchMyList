import React, { Component } from 'react'
import axios from 'axios'
import AuthService from "../../authservice/authService";
import { Card } from 'react-bootstrap';
import MovieList from '../components/moveiList';

export default class User extends Component {
    state={
        currentUser: AuthService.getCurrentUser(),
        profile:'',
    }

    async componentWillMount(){
        await axios.get(`http://localhost:5000/movies/${this.state.currentUser.userId}`)
        .then(response=>{
            this.setState({profile: response.data})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render() {
        return (
            <React.Fragment>
            <Card>
                <Card.Header>                        
                    <img height="50px" width='50px'src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/600px-User_icon_2.svg.png"/>
                    <br/>
                    {this.state.currentUser.name}
                </Card.Header>
                <Card.Body>
                    <Card.Title>Email : {this.state.currentUser.email}</Card.Title>
                    <Card.Text>
                        Age : 25 <br/>
                        Add : New York City
                    </Card.Text>
                </Card.Body>
                </Card>
                <MovieList movieList={this.state.profile}/>
            </React.Fragment>

        )
    }
}
    