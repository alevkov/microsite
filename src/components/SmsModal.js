import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rodal from 'rodal';
import Dialog from 'react-bootstrap-dialog';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
// styles
import 'rodal/lib/rodal.css';
import '../styles/SmsModal.css';
// api
import axios from 'axios';
import Querystring from 'querystring';

export default class SmsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recepient: this.props.smsRecepient, // recepient of SMS
  	  header: 'Check out my photos!' // SMS header
	  };

    this.handleRecepientChange = this.handleRecepientChange.bind(this);
    this.handleTextBodyChange = this.handleTextBodyChange.bind(this);
    this.handleSmsSubmit = this.handleSmsSubmit.bind(this);
  }

  handleRecepientChange(event) {
    this.setState({recepient: event.target.value});
  }
  
  handleTextBodyChange(event) {
    this.setState({header: event.target.value});
  }

  handleSmsSubmit(event) {
    let smsTotalContent = this.state.header + '\n' + this.props.smsBody;
    const smsData = {
      smsBody: smsTotalContent,
      smsRecepient: this.state.recepient,
    };
    axios({
      method: 'post',
      url: 'https://helios-api.herokuapp.com/messaging/send',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: Querystring.stringify(smsData)
    }).then(response => {
      this.dialog.showAlert('Message send to recepient!');
      console.log(response);
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
    	<div className="SmsModal">
    	  <Rodal width="600" height="270" visible={this.props.isShown} onClose={this.props.handleClose}>
          <form onSubmit={this.handleSmsSubmit}>
            <FormGroup controlId="recepient" bsSize="large">
              <ControlLabel id="recepient-label">Phone</ControlLabel>
              <FormControl
                autoFocus
                defaultValue={this.props.smsRecepient}
                onChange={this.handleRecepientChange}
              />
            </FormGroup>
            <FormGroup controlId="sms" bsSize="large">
              <ControlLabel id="sms-label">Message</ControlLabel>
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