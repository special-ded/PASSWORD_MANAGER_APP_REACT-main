import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardItem from "../DashboardItem/DashboardItem";
import './Dashboard.css'
import { v4 as uuid } from 'uuid'

export default function Dashboard() {
  const navigate = useNavigate()
  const [accName, setAccName] = useState('')

  let LoggedInUser = []
  // Parse the serialized data back into an aray of objects
  LoggedInUser = JSON.parse(localStorage.getItem('LoggedInUsers')) || []

  useEffect(() => {
    if (LoggedInUser.length === 0) {
      navigate('/registration')
    }
  }, []);

  let currentUserName = LoggedInUser[0]?.username
  let accountInLocalSt = []

  let id = uuid()
  function addAccountToLocalSt() {
    // Parse the serialized data back into an aray of objects
    accountInLocalSt = JSON.parse(localStorage.getItem(currentUserName)) || []

    // Push new account in Array
    accountInLocalSt.push({ id: id, name: accName, email: '', password: '' })
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem(currentUserName, JSON.stringify(accountInLocalSt))
  }

  function LogOutUser() {
    LoggedInUser.length = 0;
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('LoggedInUsers', JSON.stringify(LoggedInUser));
  }

  function setAccountName(e) {
    if (accName.trim() === '') {
      alert("Please enter Account name")
    } else {
      addAccountToLocalSt()
    }
  }

  return (
    <div className="DashboardComponent">
      <h1>YOUR PASSWORD MANAGER</h1>
      <hr></hr>
      <div className="DashboardComponent__Title">
        <h1>| Dashboard  |</h1>
        <h2>Hi, {LoggedInUser.length > 0 ? LoggedInUser[0].username : null}
          <span style={{ color: '#606468' }}>  |</span>  </h2>
      </div>

      <Link to='/login'>
        <button className="dashboardComponent__LogoutButton"
          onClick={LogOutUser}>Log out</button>
      </Link>
      < h1>Add your account</h1>
      <form className="DashboardItemComponent__form">
        <input onChange={(e) => setAccName(e.target.value)}
          type="text"
          className="DashboardItemComponent__todoInput"
          placeholder="Enter Account Name" />
        <button onClick={(e) => setAccountName(e)}
          className="DashboardItemComponent__todoButton"
          type="submit">
          <span>+</span>
        </button>
      </form>
      <div className="DashboardItemComponent__accountContainer">
        <ul className="DashboardItemComponent__accountList">
          {JSON.parse(localStorage.getItem(currentUserName))?.map(el =>
            <DashboardItem id={el.id} key={uuid()} accItem={el.name} />
          )}
        </ul>
      </div>
    </div>
  )
}
