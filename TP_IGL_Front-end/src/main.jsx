import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Admin from './components/Admin.jsx'
import ProfileUser from './components/ProfileUser.jsx'
import ProfileAdminMod from './components/ProfileAdminMod.jsx'
import Moderateur from './components/Moderateur.jsx'
import HomeGuests from './components/HomeGuests.jsx'
import ContactUs from './components/contactus.jsx'
import HomeUsers from './components/HomeUsers.jsx'
import Feedback from './components/feedback.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomeUsers/>
  </React.StrictMode>,
)