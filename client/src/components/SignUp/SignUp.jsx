import React from 'react'
import './Signup.style.css'

const SignUp = () => {
  return (
    <div className='signup-wrap'>
      <div className='signup'>
        <div className='signup-img'>
          <img src='https://cdn.dribbble.com/users/91923/screenshots/17572643/media/0dc1c04da2ff0c90df8066a71ccaa573.jpg?compress=1&resize=1200x900&vertical=top' alt='sushi'/>
        </div>
        <form className='signup-form'>
          <label>
            Name
            <input type='text' name='name' id='name' placeholder='Your Name'/>
          </label>
          <label>
            Email
            <input type='email' name='email' id='email' placeholder='Your Email'/>
          </label>
          <label>
            Password
            <input type='password' name='password' id='password' placeholder='Set Your Password'/>
          </label>
          <label>
            Confirm Password
            <input type='text' name='confirm' id='confirm' placeholder='Confirm Your Password'/>
          </label>
          <button>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp