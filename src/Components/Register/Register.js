import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Register.css'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState()

  const navigate = useNavigate()
  let result = false
  let RegisteredUsersArr = []
  let LoggedInUser = []
  let user
  let existUser = JSON.parse(localStorage.getItem('LoggedInUsers'))

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

    if (RegisteredUsersArr.length > 0) {
      let regUserObj = RegisteredUsersArr.find(el => el.username == username)
      if (regUserObj?.username === username && regUserObj?.password === password) {
        alert("You already Registered and Logged In succesfully")
        logInUser()
        navigate('/')
      } else if (regUserObj?.username === username && regUserObj?.password !== password) {
        alert("Please enter correct Password")
      } else {
        registerNewUser()
      }
    } else {
      registerNewUser()
    }
  }

  function validateEmail() {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    result = pattern.test(username);
    if (result === true) {
      alert("Email is valid")
    } else {
      alert("Please enter correct Email")
    }
  }

  function registerNewUser() {
    validateEmail()
    if (result && password.length >= 6) {
      logInUser()
      // Push the new data in the array
      RegisteredUsersArr.push({ username: username.trim(), password: password.trim() })
      alert(username.trim() + " - Succesfully Registered")
      // Re-serialize the array back into a string and store it in localStorage
      localStorage.setItem('RegisteredUsers', JSON.stringify(RegisteredUsersArr))
    } else if (result) {
      alert("Password should be >= 6 characters")
    }
  }

  function logInUser() {
    // Push the new user in the LoggedIn array
    LoggedInUser.push({ username: username.trim(), password: password.trim() });
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('LoggedInUsers', JSON.stringify(LoggedInUser));
    navigate('/')
  }

  function LogOutUser() {
    LoggedInUser.length = 0;
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('LoggedInUsers', JSON.stringify(LoggedInUser));
  }


  return (
    <div className="registerComponent">
      <h1>YOUR PASSWORD MANAGER</h1>
      <hr></hr>
      <h1>| REGISTER |</h1>
      {user
        ? <div>
          <h1>Hi, {user}.
            <br></br> You are already logged in ;)</h1>
          <Link to="/">
            <h1>&#8592;Back to DASHBOARD</h1>
          </Link>
          <Link to='/registration'>
            <button className="dashboardComponent__LogoutButton"
              onClick={LogOutUser}>Log out</button>
          </Link>
        </div >
        : <div className="grid">
          <form className="form register">
            <div className="form__field">
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="form__input"
                placeholder="Email" />
            </div>
            <div className="form__field">
              <input onChange={(e) => setPassword(e.target.value)}
                type="password" className="form__input" placeholder="Password" />
            </div>
            <div className="form__field">
              <input onClick={clickHandler} type="button" value="Sign In" />
            </div>
          </form>
          <Link to='/login'>
            <h3>Log in if already Registered</h3>
          </Link>
        </div>
      }
    </div>
  )
}