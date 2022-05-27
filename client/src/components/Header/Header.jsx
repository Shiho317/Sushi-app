import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import "./Header.style.css";
import headerLogo from "../../images/header-logo.svg";

const Header = () => {
  const { setLoggedIn, userObj, myStorage } = useContext(AppContext);
  const navigate = useNavigate();
  const currentUser = JSON.parse(userObj);

  const loggedOut = () => {
    myStorage.removeItem("user");
    setLoggedIn(false);
    alert("You have successfully logged out.");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div className="header">
      <Link to='/' className="header-logo">
        <img src={headerLogo} alt="logo" />
      </Link>
      <nav className="header-nav">
        <ul>
          <li>
            {currentUser !== null ? (
              <Link to="/" onClick={loggedOut}>
                LOGOUT
              </Link>
            ) : (
              <Link to="/login">LOGIN</Link>
            )}
          </li>
          <li>
            {currentUser !== null ? (
              <Link to={`/favourite/${currentUser.id}`}>SUKI</Link>
            ) : (
              <Link to="/signup">SIGNUP</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
