import React, { Component } from 'react';
import ListMovie from '../components/listMovie';
import SearchMovie from '../components/searchMovie';
import axios from 'axios'
import AuthService from "../../authservice/authService";
import MovieSummary from '../components/movieSummary';
import './movie.css'

export default class Movie extends Component {
    state={
        movies:[],
        searchMovie:'',
        Loading : true,
        currentUser: AuthService.getCurrentUser(),
        listLiked:[],
        modal:false,
        show:false,
        tag:''
    }
    componentDidMount(){
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=289160ee8062a99c89d0e98270c89ed3')
        .then(ms=>{
            this.setState({movies:ms.data.results});
        })
        .catch(err=>{
            console.log(err)
        })

    }
    nameofMovieToSearch = async (name)=>{
        await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=289160ee8062a99c89d0e98270c89ed3&language=en-US&query=${name}&page=1&include_adult=false`)
        .then(res=>{
            this.setState({movies:res.data.results})
        }).catch(err =>{
            console.log(err)
        })
    }
    movieClickedfromMovie= (movie) => {
        let newlist = [...this.state.movies];
        newlist = this.state.movies.filter( mv=> { return mv.id != movie.id; });
        let floors = [...this.state.listLiked];
        floors.push(movie);
        this.setState({listLiked:floors, movies:newlist})
    }
    showfavorites= () =>{
        this.setState({show:true})
    }
    handleSubmitTags=  (tagMovie) =>{
        this.setState({tag:tagMovie})
        this.state.listLiked.map(async lm=>{
            const newMovieListToUser ={
                "name": lm.name,
                "movieDBid":lm.id,
                "tag":tagMovie,
                "owner":this.state.currentUser.userId
            }
            try {
                const resp = await axios.post('http://localhost:5000/movies/createlist', newMovieListToUser);
            } catch (err) {
                // Handle Error Here
                console.error('error catch',err);
            }
        })
    }

    render() {
        const { currentUser, listLiked } = this.state;
        return ( 
            <React.Fragment>

                <MovieSummary 
                    handleClose={() => this.setState({ show: false })}
                    show={this.state.show}  
                    handleSubmitTags={this.handleSubmitTags} 
                    toggle={this.state.modal} 
                    /> 
                <h3>{currentUser  ? 'Hello, '+currentUser.name : ''}</h3>
                <h3>{listLiked.length === 0 ? '' 
                : <button className="btn btn-success float-right addbtn" onClick={this.showfavorites}>Submit my List</button>}</h3>
                <SearchMovie movieToSearch={this.nameofMovieToSearch}/>
                <ListMovie movieList={this.state.movies} movieClickedfromMovie={this.movieClickedfromMovie}/>
            </React.Fragment>
 
        )
    }
}
