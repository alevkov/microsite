import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import PropTypes from 'prop-types';

import '../styles/LoginContainer.css';

const constants = require('../constants');

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    }
  }

  handleEventIdChange = event => {
    localStorage.setItem(constants.kEventId, event.target.value);
  }

  handlePasswordChange = event => {
    this.setState({password : event.target.value});
  }

  handleSignIn = event => {
    window.location = '/' + localStorage.getItem("KEY_EVENT_ID");
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
          <FormGroup controlId="password" bSize="large">
            <ControlLabel>password</ControlLabel>
            <FormControl
               autoFocus
               type="password"
               onChange={this.handleEventIdChange}
               defaultValue={this.state.password} />
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

