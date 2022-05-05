import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import "./Header.style.css";
import headerLogo from "../../images/header-logo.svg";

const Header = () => {
  const { loggedIn, setLoggedIn, userObj, myStorage } = useContext(AppContext);
  const navigate = useNavigate();
  const currentUser = JSON.parse(userObj);

  const loggedOut = () => {
    const currUserObj = {
      name: "",
      email: "",
      id: "",
    };
    myStorage.setItem("user", JSON.stringify(currUserObj));
    setLoggedIn(false);
    alert("You have successfully logged out.");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="header">
      <div className="header-logo">
        <img src={headerLogo} alt="logo" />
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            {loggedIn ? (
              <Link to="/" onClick={loggedOut}>
                LOGOUT
              </Link>
            ) : (
              <Link to="/login">LOGIN</Link>
            )}
          </li>
          <li>
            {loggedIn ? (
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
