import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { AppContext } from '../../App';
import './Header.style.css';

const Header = () => {

  const { loggedIn, setLoggedIn, currentUser, myStorage } = useContext(AppContext);
  const location = useLocation()
  const pathname = location.pathname.replace('/','')

  useEffect(() => {
    if(pathname.length > 0){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
  },[])

  const loggedOut = () => {
    const currUserObj = {
      name: '',
      email: '',
      id: ''
    }
    myStorage.setItem("user", JSON.stringify(currUserObj));
    alert("You have successfully logged out.");
    setTimeout(() => {
      window.location.href = '/'
    },1000)
  }

  return (
    <div className='header'>
      <div className='header-logo'>
    </div>
      <nav className='header-nav'>
        <ul>
          <li>
            {loggedIn ? (
              <Link to='/' onClick={loggedOut}>
                LOGOUT
              </Link>
            ) : (
              <Link to='/login'>
                LOGIN
              </Link>
            )}
          </li>
          <li>
            {loggedIn ? (
              <Link to={`/favourite/${currentUser.id}`}>
                FAVOURITE
              </Link>
            ) : (
              <Link to='/signup'>
                SIGNUP
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header