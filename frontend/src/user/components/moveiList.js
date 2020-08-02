import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import ItemList from './itemList';
import './movieList.css';

export default class MovieList extends Component {
    state = {
        tagList:[],
        slideActive :true,
    }
    componentDidUpdate(prevProps, prevState){
        let arr=[];
        this.props.movieList.list.forEach(element => {
            arr.push(element.tag);
        });
        const clean = [...new Set(arr)];
        if (!prevState.slideActive !== this.state.slideActive && this.state.slideActive) {
            this.setState({
                tagList: clean,
                slideActive:false
            });
          }
    }

    render() {
        const { list}= this.props.movieList;
        if(this.state.tagList){
            return (
                <Card className="customCard" style={{ width: '25rem' }}>
                    <Card.Body >
                    <Card.Title>{!this.state.tagList ? 'loading' : this.state.tagList}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">My List </Card.Subtitle>
                    { !list ? 'Hello' :list.map(m=>{
                        return <ItemList ItemToShow={m}/>
                    })}  
                    </Card.Body>
                </Card>
            )
        }else {
            return (
                <div>No List</div>
            )
        }

    }
}
                  
