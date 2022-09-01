import React, { useState, useEffect } from "react";
import './Login.css'
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState()
  const navigate = useNavigate();
  let user
  let existUser = JSON.parse(localStorage.getItem('LoggedInUsers'))
  let RegisteredUsersArr = []
  let LoggedInUser = []

  useEffect(() => {
    if (existUser === null) {
      navigate('/registration')
    } else {
      user = (JSON.parse(localStorage.getItem('LoggedInUsers')))[0]?.username
    }
  }, []);

  function clickHandler() {
    // Parse the serialized data back into an aray of objects
    RegisteredUsersArr = JSON.parse(localStorage.getItem('RegisteredUsers')) || []

    function logInUser() {
      // Push the new user in the LoggedIn array
      LoggedInUser.push({ username: username.trim(), password: password.trim() });
      // Re-serialize the array back into a string and store it in localStorage
      localStorage.setItem('LoggedInUsers', JSON.stringify(LoggedInUser));
    }

    if (RegisteredUsersArr.length > 0) {
      let registeredUserObj = RegisteredUsersArr.find(el => el.username === username.trim())
      if (registeredUserObj?.username === username.trim() &&
        registeredUserObj?.password === password.trim()) {
        alert("You succesfully Logged In")
        logInUser()
        navigate('/')
      } else if (registeredUserObj?.username === username.trim() &&
        registeredUserObj?.password !== password.trim()) {
        alert("Please enter correct Password")
      } else {
        alert("You are not Registered!")
        navigate('/registration')
      }
    } else {
      alert("You are not Registered!")
      navigate('/registration')
    }
  }

  function LogOutUser() {
    LoggedInUser.length = 0;
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('LoggedInUsers', JSON.stringify(LoggedInUser));
  }

  return (
    <div className="loginComponent">
      <h1>YOUR PASSWORD MANAGER</h1>
      <hr className="hr"></hr>
      <h1>| LOG IN |</h1>
      {user
        ? <div>
          <h1>Hi, {user}.
            <br></br> You are already logged in ;)</h1>
          <Link to="/">
            <h1>&#8592;Back to DASHBOARD</h1>
          </Link>
          <Link to='/login'>
            <button className="dashboardComponent__LogoutButton"
              onClick={LogOutUser}>Log out</button>
          </Link>
        </div >
        : <div className="grid">
          <form className="loginComponent__form login">
            <div className="form__field">
              <input onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                className="form__input"
                placeholder="Email" />
            </div>
            <div className="form__field">
              <input onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                className="form__input" placeholder="Password" />
            </div>
            <div className="form__field">
              <input onClick={clickHandler} type="button" value="Log In" />
            </div>
          </form>
          <Link to='/registration'>
            <h3>Not Registered?  Click here</h3>
          </Link>
        </div>

      }

    </div>
  )
}