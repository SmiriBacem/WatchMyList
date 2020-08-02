import React, { Component } from 'react';



class MovieItem extends Component{
    handleClickMovie(movie){
        this.props.movieClicked(movie);
    }

    render(){
        return(
        <div className="col-sm-3">
            <div className="card">
                <img className="card-img-top" src={`https://image.tmdb.org/t/p/original/${this.props.image}`} alt={this.props.name}/>
                <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>
                <p className="card-text">{this.props.decription}</p>
                <button className="btn btn-info" onClick={()=>this.handleClickMovie(this.props)}>Add to my list</button>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
        )
    }
}
export default MovieItem;
