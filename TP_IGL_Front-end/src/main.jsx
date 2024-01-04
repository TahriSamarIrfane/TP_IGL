import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Admin from './components/Admin.jsx'
import ProfileUser from './components/ProfileUser.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProfileUser/>
  </React.StrictMode>,
)
