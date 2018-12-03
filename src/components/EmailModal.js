import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rodal from 'rodal';
import Dialog from 'react-bootstrap-dialog';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import 'rodal/lib/rodal.css';
import '../styles/EmailModal.css';
import Querystring from 'querystring';
import axios from 'axios';

export default class EmailModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recepient: this.props.emailRecepient, // recepient of email
      header: 'Check out my photos!' // email header
    };

    this.handleRecepientChange = this.handleRecepientChange.bind(this);
    this.handleTextBodyChange = this.handleTextBodyChange.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
  }

  handleRecepientChange(event) {
    this.setState({recepient: event.target.value});
  }
  
  handleTextBodyChange(event) {
    this.setState({header: event.target.value});
  }

  handleEmailSubmit(event) {
    let emailTotalContent = this.state.header + '\n' + this.props.emailBody;
    const emailData = {
      emailBody: emailTotalContent,
      emailRecepient: this.state.recepient,
    };
    axios({
      method: 'post',
      url: 'https://helios-api.herokuapp.com/email/send',
      headers: {
        'Content-Type': 'application/json'
      },
      data: emailData
    }).then(response => {
      this.dialog.showAlert("Email sent!");
    })
      .catch(error => {
        this.dialog.showAlert('Error!' + error);
        throw(error);
      });
    event.preventDefault();
  }

  render () {
    const formStyles = {
      display: 'block',
      width:100,
      flexWrap: 'wrap',
    };
    return (
      <div className="EmailModal">
        <Rodal width="600" height="270" visible={this.props.isShown} onClose={this.props.handleClose}>
          <form onSubmit={this.handleEmailSubmit}>
            <FormGroup controlId="recepient" bsSize="large">
              <ControlLabel id="recepient-label">Email</ControlLabel>
              <FormControl
                autoFocus
                defaultValue={this.props.emailRecepient}
                onChange={this.handleRecepientChange}
              />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel id="email-label">Message</ControlLabel>
              <FormControl
                defaultValue={this.state.header}
                onChange={this.handleTextBodyChange}
                type="text"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              type="submit">
              Send
            </Button>
          </form>
        </Rodal>
        <Dialog ref={(el) => { this.dialog = el; }} />
      </div>
    );
  }
}