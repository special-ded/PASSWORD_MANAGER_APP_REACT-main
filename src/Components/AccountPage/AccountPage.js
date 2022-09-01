import React, { useEffect, useState } from "react"
import './AccountPage.css'
import { Link } from "react-router-dom"
import hiddenPNG from '../../images/hidden.png'
import notHiddenPNG from '../../images/view.png'


export default function AccountPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidePW, setHidePW] = useState(true)

  let currentAccount
  let currentAccountID
  let currentAccountEmailAndPasswordInUserDATA
  let currentUserDATA
  let LoggedInUsers
  let eyePNG = hidePW ? hiddenPNG : notHiddenPNG

  function getCurrentAcc() {
    currentAccount = JSON.parse(localStorage.getItem('CurrentAccount'))
    currentAccountID = currentAccount[0]
  }
  getCurrentAcc()

  function getcurrentUserDATA() {
    //Get CurrentUser
    LoggedInUsers = JSON.parse(localStorage.getItem('LoggedInUsers'))
    //Saved DATA of current user
    currentUserDATA = JSON.parse(localStorage.getItem(LoggedInUsers[0].username))
  }
  getcurrentUserDATA()

  currentAccountEmailAndPasswordInUserDATA = currentUserDATA.find(el => el.id === currentAccountID)
  let userDATAIndex = currentUserDATA.indexOf(currentAccountEmailAndPasswordInUserDATA)
  function setDefaultEmailAndPW() {
    setEmail(currentAccountEmailAndPasswordInUserDATA.email)
    setPassword(currentAccountEmailAndPasswordInUserDATA.password)
  }
  useEffect(() => {
    setDefaultEmailAndPW()
  }, [])


  function pushEmailAndPasswordToLocalSt() {
    currentAccountEmailAndPasswordInUserDATA.email = (email.trim() === '')
      ? currentAccountEmailAndPasswordInUserDATA.email
      : email.trim()
    currentAccountEmailAndPasswordInUserDATA.password = (password.trim() === '')
      ? currentAccountEmailAndPasswordInUserDATA.password
      : password.trim()
    currentUserDATA[userDATAIndex] = currentAccountEmailAndPasswordInUserDATA
    localStorage.setItem(LoggedInUsers[0].username, JSON.stringify(currentUserDATA));
  }

  function clickHandler(e) {
    e.preventDefault()
    pushEmailAndPasswordToLocalSt()
  }

  return (
    <div className="AccountPageComponent">
      <h1>YOUR PASSWORD MANAGER</h1>
      <hr></hr>
      <Link to="/">
        <h1>&#8592;Back to DASHBOARD</h1>
      </Link>
      <h1>AccountPage</h1>
      <br></br>
      <h1>Change your<p style={{ color: "black" }}>{currentAccount[1]} </p> </h1>
      <h1>Email and Password</h1>
      <div className="grid">
        <form className="loginComponent__form login">
          <div className="form__field">
            <input onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              className="form__input"
              value={email}
              placeholder="Email"
            />
          </div>
          <div className="form__field">
            <input onChange={(e) => hidePW ? setPassword(password) : setPassword(e.target.value)}
              type="text"
              name="text"
              className="form__input"
              value={hidePW ? "********" : password}
              placeholder="Password"
            />
            <img src={eyePNG}
              className="form__inputHidePW"
              onClick={() => setHidePW((prev) => !prev)} />
          </div>
          <div className="form__field">
            <input onClick={(e) => clickHandler(e)} type="button" value="Save" />
          </div>
        </form>
      </div>
    </div >
  )
}