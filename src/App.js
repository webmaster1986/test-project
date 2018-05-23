import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import OverView from './components/OverView'
import Settings from './components/Settings'
import Tests from './components/Tests'
import TestDetails from './components/TestDetails'
import Header from './components/Common/Header'
import Invitation from './components/Invitation'
import './App.css';
import Sidebar from "./components/Common/Sidebar";
import Login from "./components/Login"
import Evaluations from "./components/Evaluations";
import Candidates from "./components/Candidates";

class App extends Component {
  render() {
    const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        {
          user && user.email ?
            <div>
              <Header/>
              <div className="wrapper toggled" id='wrapper'>
                <Sidebar/>
                <div id='page-content-wrapper' className="page-content-wrapper">
                  <Switch>
                    <Route path="/overview" component={OverView}/>
                    <Route path="/settings" component={Settings}/>
                    <Route path="/evaluations" component={Evaluations}/>
                    <Route path="/candidates" component={Candidates}/>
                    <Route path="/tests" component={Tests}/>
                    <Route path="/testDetails/:testId" component={TestDetails}/>
                    <Route path="/test/:testName/:examId" component={Invitation}/>
                    <Route path="/" component={OverView}/>
                  </Switch>
                </div>
              </div>
            </div>
            :
            <div>
              <Route path="/" component={Login}/>
            </div>
        }
      </div>
    );
  }
}

export default App;
