import React from 'react'
import MovieItem from './movieItem';

const ListMovie = (props)=> {

    const movieClicked=(movie)=>{
        props.movieClickedfromMovie(movie);
    }

    if(props.movieList.length === 0){
        return <div className="row">
            <p >
                No movies
            </p>
        </div>
    }
    return (       
        <div className="row" >
            {
               props.movieList.map(m=>{
                   return <MovieItem 
                   key={m.id} 
                   id={m.id} 
                   image={m.poster_path}
                   name={m.original_title} 
                   genre={m.genre_ids}
                   movieClicked={movieClicked}
                   description={m.overview}
                   /> 
               }) 
            }
        </div>
    )
}
export default ListMovie;