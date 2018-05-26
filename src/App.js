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
import ExamEvaluation from "./components/ExamEvaluation";
import Welcome from "./components/Welcome";

class App extends Component {
  render() {
    const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        {
          user && user.email ?
            <div>
              <Header user={user}/>
              <div className="wrapper toggled" id='wrapper'>
                <Sidebar user={user}/>
                <div id='page-content-wrapper' className="page-content-wrapper">
                  <Switch>
                    <Route path="/overview" component={OverView}/>
                    <Route path="/settings" component={Settings}/>
                    <Route path={`/${user.companyName}/evaluations`} component={Evaluations}/>
                    <Route path={`/${user.companyName}/invitedCandidates`} component={Candidates}/>
                    <Route path={`/${user.companyName}/tests`} component={Tests}/>
                    <Route path={`/${user.companyName}/testDetails/:testId`} component={TestDetails}/>
                    <Route path="/test/:testName/:examId" component={Invitation}/>
                    <Route path={`/evaluations/:examId`} component={ExamEvaluation}/>
                    <Route path="/" component={OverView}/>
                  </Switch>
                </div>
              </div>
            </div>
            :
            <div>
              <Switch>
                <Route path="/welcome" component={Welcome}/>
                <Route path="/" component={Login}/>
              </Switch>
            </div>
        }
      </div>
    );
  }
}

export default App;
