import React from 'react'
import logo from '../../assets/images/logo.png'
import User from '../../assets/images/avatar.png'
import './Header.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light text-white header">
      <a className="navbar-brand">
        <img alt='logo' src={logo} className='logo'/>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>

      <div className="collapse navbar-collapse text-right" id="navbarSupportedContent">
        <ul className="nav position-right">
          <li className={`nav-item`}>
            <a className="text-white nav-link Hi-John">Hi, John</a>
          </li>
          <li className={`nav-item`}>
            <img alt='user' src={User} className="userImageTopRight"/>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
