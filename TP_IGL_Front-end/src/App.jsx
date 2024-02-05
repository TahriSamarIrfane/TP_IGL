import React from 'react';
import NavBar from './components/NavBar.jsx';
import HomeGuests from './components/HomeGuests.jsx';
import HomeUsers from './components/HomeUsers.jsx';
import Footer from './components/Footer.jsx';
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import Result from './components/Result.jsx';
import MyCollection from './components/MyCollection.jsx';
import Article from './components/Article.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarGuest from './components/NavBarGeust.jsx';
import Admin from './components/Admin.jsx';
import ProfileAdminMod from './components/ProfileAdminMod.jsx';
import ProfileUser from './components/ProfileUser.jsx';
import FooterGeust from './components/FooterGeust.jsx';
import SendCode from './components/SendCode.jsx';
import MDP_oublie from './components/MDP_oublie.jsx';
import Moderateur from './components/Moderateur.jsx';
import ModérerArticle from './components/ModérerArticle.jsx';



function App() {
  return (
    <Router>
    <Routes>

      {/*Guest */}
        <Route 
        path="/"
        element={
        <>
        <NavBarGuest/>
        <HomeGuests />
        <FooterGeust/>
        </>
        } />

        
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/*User */}
        <Route 
        path="/user"
        element={
          <>
        <NavBar />
        <HomeUsers />
        <Footer/>
      </>
        } />
        <Route path="/MDP_oublie" element={<MDP_oublie />} />
        <Route path="/SendCode" element={<SendCode/>} />
        <Route path="/Moderateur" element={<Moderateur />} />
        <Route path="/ModererArticle" element={<ModérerArticle />} />
        <Route path="/ModererArticle/:id" element={<ModérerArticle />} />
        <Route path="/HomeGuests" element={<HomeGuests />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Article/:id" element={<Article />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/ProfileAdminMod" element={<ProfileAdminMod />} />
        <Route path="/ProfileUser" element={<ProfileUser />} />
        <Route path="/MyCollection"
         element={
          <>
         <MyCollection />
         <Footer/>
         </>} />
    </Routes>
    </Router>
  );
}

export default App;
