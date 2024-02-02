import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Admin from './components/Admin.jsx'
import ProfileUser from './components/ProfileUser.jsx'
import ProfileAdminMod from './components/ProfileAdminMod.jsx'
import Moderateur from './components/Moderateur.jsx'
import SignIn from './components/SignIn.jsx'
import Article from './components/Article.jsx'
import ModérerArticle from './components/ModérerArticle.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
