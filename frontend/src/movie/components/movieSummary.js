import React from 'react'
import { Modal,Button } from 'react-bootstrap';



class MovieSummary extends React.Component{
    constructor(props) {
        super(props);
        this.state = { inputTag:'' };
      }

    handleChange= (e)=> {
        var value=e.target.value;
        this.setState({inputTag:value});
        // props.handleSubmitTags();
    }

    handleSubmit=()=>{
        this.props.handleSubmitTags(this.state.inputTag);
    }

    render(){
        return(
            <>
            <Modal show={this.props.show} onHide={this.props.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body><input 
              placeholder="Tag Name" 
              name="tag" 
              type="text"
              onChange={this.handleChange} 
              className="form-control"/></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )
    }
}


export default MovieSummary;