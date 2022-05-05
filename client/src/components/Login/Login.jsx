import axios from "axios";
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import "./Login.style.css";

const Login = () => {
  const { myStorage, setLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const loginSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("/api/users/login", user);
      const currUserObj = {
        name: res.data.username,
        email: res.data.email,
        id: res.data._id,
      };
      myStorage.setItem("user", JSON.stringify(currUserObj));
      setLoggedIn(true);
      alert("You have successfully logged in.");
      setTimeout(() => {
        navigate(`/${res.data._id}`);
      }, 2000);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="login-wrap">
      <div className="login">
        <div className="login-img">
          <img
            src="https://cdn.dribbble.com/users/7356202/screenshots/16711839/media/c0db7e2e28f5e48e21e8d1ec317b8b04.png?compress=1&resize=1200x900&vertical=top"
            alt="sushi"
          />
        </div>
        <form className="login-form" onSubmit={loginSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              ref={emailRef}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              ref={passwordRef}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
