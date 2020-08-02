import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

export default class ItemList extends Component {
    render() {

        return (
            <Card.Text key={this.props.ItemToShow}>
                {this.props.ItemToShow ? this.props.ItemToShow.name : 'Loading'}
            </Card.Text>
        )
    }
}
