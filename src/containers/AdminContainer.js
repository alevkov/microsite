import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import '../styles/AdminContainer.css';

export default class AdminContainer extends Component {
  constructor(props) {
    super(props)
  }

  handleDeleteAllForEvent = event => {
    // TODO...
  }

  render () {
    return(
      <div className="AdminContainer">
        <form>
          <FormGroup controlId="eventId" bSize="large">
            <ControlLabel>event code</ControlLabel>
            <FormControl
             autoFocus
             type="text"
             value={this.props.eventId} />
          </FormGroup>
        </form>
        <Button bsStyle="primary" onClick={this.handleDeleteAllForEvent}>Delete All</Button>
      </div>
    );
  }
}