import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import OverView from './components/OverView'
import Settings from './components/Settings'
import Header from './components/Common/Header'
import './App.css';
import Sidebar from "./components/Common/Sidebar";

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="wrapper toggled">
          <Sidebar />
          <div className="page-content-wrapper">
            <Switch>
              <Route path="/overview" component={OverView}/>
              <Route path="/settings" component={Settings}/>
              <Route path="/" component={OverView}/>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
