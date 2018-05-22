import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from "./components/Login";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={App}/>
      <Route path="/login" components={Login}/>
    </Switch>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
