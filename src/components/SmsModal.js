import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rodal from 'rodal';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// assets
import logo from '../svg/logo.svg';
// styles
import '../App.css';
import 'rodal/lib/rodal.css';
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
	    url: 'http://localhost:8080/messaging/send',
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

	  const phoneTextFieldStyles = {
	  	margin:10
	  }

	  const smsTextFieldStyles = {
	  	margin:10,
	  	width:500,
	  	height:100
	  }

	  const inputStyles = {
	  	margin:10
	  }

      return (
      	<div>
      	  <Rodal width="600" visible={this.props.isShown} onClose={this.props.handleClose}>
      	  	<form style={formStyles} onSubmit={this.handleSmsSubmit}>
      	  	  <InputLabel id="recepient-label" style={inputStyles}>phone #</InputLabel>
          	  <TextField id="recepient-field" style={phoneTextFieldStyles} defaultValue={this.props.smsRecepient} onChange={this.handleRecepientChange} />
          	  <InputLabel id="sms-label" style={inputStyles}>text</InputLabel>
          	  <TextField id="sms-field" style={smsTextFieldStyles} defaultValue={this.props.smsBody} onChange={this.handleTextBodyChange} />
          	  <Button type="submit" variant="contained" color="primary">
        		Send
      		  </Button>
      	  	</form>
          </Rodal>
        </div>
      );
    }
}