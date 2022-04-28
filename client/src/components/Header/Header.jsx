import React from 'react'
import { Link } from 'react-router-dom';
import './Header.style.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='header-logo'>
      </div>
      <nav className='header-nav'>
        <ul>
          <li>
            <Link to='/login'>
              LOGIN
            </Link>
          </li>
          <li>
            <Link to='/signup'>
              SIGNUP
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header