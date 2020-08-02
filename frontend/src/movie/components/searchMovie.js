//import React from 'react'
import './serachMovie.css';

import React, { Component } from 'react'

class SearchMovie extends Component {
    handleChangeSearchMovie = e=>{
        this.props.movieToSearch(e.target.value);
    }
    render() {
        return (
            <div>
           <input className="form-control" aria-label="Large" name="movie" aria-describedby="inputGroup-sizing-sm"
             onChange={this.handleChangeSearchMovie}/>     
            </div>
        )
    }
}

export default SearchMovie;