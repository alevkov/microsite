import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Dialog from 'react-bootstrap-dialog'
// styles
import '../styles/AdminContainer.css';
// helpers
import axios from 'axios';
// constants
const constants = require('../constants');

export default class AdminContainer extends Component {
  constructor(props) {
    super(props)
  }

  handleEventIdChange = event => {
    localStorage.setItem(constants.kEventId, event.target.value);
  }

  handleDeleteAllForEvent = event => {
    axios({
      method: 'get',
      url: 'https://helios-api.herokuapp.com/events/delete/'
      + localStorage.getItem(constants.kEventId)
    })
    .then(response => {
      this.dialog.showAlert('All photos deleted!');
    })
    .catch(error => {
      this.dialog.showAlert('Error! Contact your sysadmin. ' + error);
      throw(error);
    });
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
               onChange={this.handleEventIdChange}
               defaultValue={localStorage.getItem("KEY_EVENT_ID")} />
          </FormGroup>
        </form>
        <Button 
          bsStyle="danger" 
          onClick={this.handleDeleteAllForEvent}>
          Delete All
        </Button>
        <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    );
  }
}