import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Admin from './components/Admin.jsx'
import ProfileUser from './components/ProfileUser.jsx'
import ProfileAdminMod from './components/ProfileAdminMod.jsx'
import Moderateur from './components/Moderateur.jsx'
import SignUp from './components/SignUp.jsx'
import Article from './components/Article.jsx'
import ModérerArticle from './components/ModérerArticle.jsx'
import MDP_oublie from './components/MDP_oublie.jsx'
import SendCode from './components/SendCode.jsx'
import Result from './components/Result.jsx'
import HomeGuests from './components/HomeGuests.jsx'
import SignIn from './components/SignIn.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProfileAdminMod/>
  </React.StrictMode>,
)