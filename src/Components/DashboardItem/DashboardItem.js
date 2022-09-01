import React from "react"
import './DashboardItem.css'
import { Link } from "react-router-dom"
import trash from '../../images/delete.png'

export default function DashboardItem(props) {
  let LoggedInUsers
  let currentUserDATA
  let userDATAIndex

  function setCurrentAcc(id) {
    localStorage.setItem('CurrentAccount', JSON.stringify([id, props.accItem]))
  }

  function getcurrentUserDATA() {
    //Get CurrentUser
    LoggedInUsers = JSON.parse(localStorage.getItem('LoggedInUsers'))
    //Saved DATA of current user
    currentUserDATA = JSON.parse(localStorage.getItem(LoggedInUsers[0].username))
  }
  getcurrentUserDATA()

  function clickHandler(id) {
    setCurrentAcc(id)
    userDATAIndex = currentUserDATA.findIndex(el => el.id === id)
    currentUserDATA.splice(userDATAIndex, 1)
    localStorage.setItem(LoggedInUsers[0].username, JSON.stringify(currentUserDATA));
    window.location.reload(false);
  }

  return (
    <div className="DashboardItemComponent">
      <div className="DashboardItemComponent__container">
        <Link to={`/accountPage:${props.accItem}`}>
          <p value={props.accItem}
            onClick={() => setCurrentAcc(props.id)} >
            {props.accItem}</p>
        </Link>
        <img onClick={() => clickHandler(props.id)} src={trash}></img>
      </div>
    </div>
  )
}

