import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import './Sidebar.css';

const Sidebar = ({location: {pathname}}) => {
  return (
    <div className="sidebar-wrapper">
      <ul className="sidebar-nav">
        <li className="sidebar-brand">
          <Link to={'/overview'} className={`${pathname === '/overview' && 'active' }`}>
            <small>Overview</small>
            <i className="fa fa-angle-right"/>
          </Link>
          <Link to={'/settings'} className={`${pathname === '/settings' && 'active' }`}>
            <small>Settings</small>
            <i className="fa fa-angle-right"/>
          </Link>
          <Link to={'/tests'} className={`${pathname === '/tests' && 'active' }`}>
            <small>Tests</small>
            <i className="fa fa-angle-right"/>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default withRouter(Sidebar);
