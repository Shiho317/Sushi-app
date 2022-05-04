import axios from 'axios';
import React, { useRef } from 'react'
import './Signup.style.css'

const SignUp = () => {

  const usernameRef = useRef(null);
  const useremailRef = useRef(null);
  const userpasswordRef = useRef(null);
  const userconfirmRef = useRef(null);

  const signupSubmit = async(e) => {
    e.preventDefault();

    if(userpasswordRef.current.value === userconfirmRef.current.value){
      const newUser = {
        username: usernameRef.current.value,
        email: useremailRef.current.value,
        password: userpasswordRef.current.value
      }
      try {
        await axios.post('/api/users/signup', newUser);
        // usernameRef.current.value = '';
        // useremailRef.current.value = '';
        // userpasswordRef.current.value = '';
        alert("You have successfully created account.");
        setTimeout(() => {
          window.location.href = '/login'
        },1000)
      } catch (error) {
        console.log(error);
        alert("Something went wrong!")
      }
    }else{
      alert('Your confirm passowrd was not match with password.')
    }
  }

  return (
    <div className='signup-wrap'>
      <div className='signup'>
        <div className='signup-img'>
          <img src='https://cdn.dribbble.com/users/91923/screenshots/17572643/media/0dc1c04da2ff0c90df8066a71ccaa573.jpg?compress=1&resize=1200x900&vertical=top' alt='sushi'/>
        </div>
        <form className='signup-form' onSubmit={signupSubmit}>
          <label>
            Name
            <input 
              type='text' 
              name='name' 
              id='name' 
              placeholder='Your Name' 
              ref={usernameRef}
              required/>
          </label>
          <label>
            Email
            <input 
              type='email' 
              name='email' 
              id='email' 
              placeholder='Your Email' 
              ref={useremailRef}
              required/>
          </label>
          <label>
            Password
            <input 
              type='password' 
              name='password' 
              id='password' 
              placeholder='Set Your Password' 
              ref={userpasswordRef}
              required/>
          </label>
          <label>
            Confirm Password
            <input 
              type='text' 
              name='confirm' 
              id='confirm' 
              placeholder='Confirm Your Password' 
              ref={userconfirmRef}
              required/>
          </label>
          <button type='submit'>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp