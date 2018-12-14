import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import PropTypes from 'prop-types';

import '../styles/LoginContainer.css';

const constants = require('../constants');

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleEventIdChange = event => {
    localStorage.setItem(constants.kEventId, event.target.value);
  }

  handleSignIn = event => {
    window.location = '/';
  }

  render() {
    return (
      <div className="LoginContainer">
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
          bsStyle="normal" 
          onClick={this.handleSignIn}>
          Go to event!
        </Button>
      </div>
    );
  }
}

