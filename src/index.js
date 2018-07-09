import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// styles
import './index.css';
// service worker
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<MuiThemeProvider>
    <Router>
      <App />
    </Router>,
	</MuiThemeProvider>, document.getElementById('root')
);
registerServiceWorker();
