import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rodal from 'rodal';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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
  	  recepient: this.props.smsRecepient,
  	  sms: this.props.smsBody
	  }

    this.handleRecepientChange = this.handleRecepientChange.bind(this);
    this.handleTextBodyChange = this.handleTextBodyChange.bind(this);
    this.handleSmsSubmit = this.handleSmsSubmit.bind(this);
	}

  handleRecepientChange(event) {
    this.setState({recepient: event.target.value});
  }
  
  handleTextBodyChange(event) {
    this.setState({smsText: event.target.value});
  }

  handleSmsSubmit(event) {
    const smsData = {
      smsBody: this.state.sms,
      smsRecepient: this.state.recepient
    }
    console.log(smsData);
    axios({
      method: 'post',
      url: 'https://helios-api.herokuapp.com/messaging/send',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: Querystring.stringify(smsData)
    }).then(response => {
      console.log(response);
    })
    .catch(error => {
      throw(error);
    });
  event.preventDefault();
  }

  render () {
	  const formStyles = {
    	display: 'block',
    	width:100,
    	flexWrap: 'wrap',
	  }

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
                defaultValue={this.props.smsBody}
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
      </div>
    );
  }
}