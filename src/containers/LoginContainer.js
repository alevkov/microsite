import React, { Component } from 'react';
import Dialog from 'react-bootstrap-dialog';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import PropTypes from 'prop-types';
import Querystring from 'querystring';

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
    const axios = require('axios');
    const eventName = localStorage.getItem(constants.kEventId);
    console.log(eventName);
    axios({
      method: 'post',
      url: `https://helios-api.herokuapp.com/password/check/${eventName}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: Querystring.stringify({
        pwd: this.state.password
      })
    }).then(response => {
      window.location = '/' + eventName
    })
    .catch(error => {
      this.dialog.showAlert('Incorrect code or password!');
    });
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
               onChange={this.handlePasswordChange}
               defaultValue={this.state.password} />
          </FormGroup>
        </form>
        <Button 
          bsStyle="normal" 
          onClick={this.handleSignIn}>
          Go to event!
        </Button>
        <Dialog ref={(el) => { this.dialog = el; }} />
      </div>
    );
  }
}

