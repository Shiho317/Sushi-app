import React from 'react'
import './Login.style.css'

const Login = () => {
  return (
    <div className='login-wrap'>
      <div className='login'>
        <div className='login-img'>
          <img src='https://cdn.dribbble.com/users/7356202/screenshots/16711839/media/c0db7e2e28f5e48e21e8d1ec317b8b04.png?compress=1&resize=1200x900&vertical=top' alt='sushi'/>
        </div>
        <form className='login-form'>
          <label>
            Email
            <input type='email' name='email' id='email' placeholder='Your Email'/>
          </label>
          <label>
            Password
            <input type='password' name='password' id='password' placeholder='Your Password'/>
          </label>
          <button>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login