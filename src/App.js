import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard';
import AccountPage from './Components/AccountPage/AccountPage';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' exact element={<Dashboard />} />
          <Route path='/registration' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/accountPage:id' element={<AccountPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
