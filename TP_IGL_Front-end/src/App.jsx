import React from 'react';
import NavBar from './components/NavBar';
import HomeGuests from './components/HomeGuests';
import HomeUsers from './components/HomeUsers';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Result from './components/Result';
import MyCollection from './components/MyCollection';
import Article from './components/Article';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarGuest from './components/NavBarGeust';
import Admin from './components/Admin';
import ProfileAdminMod from './components/ProfileAdminMod';
import ProfileUser from './components/ProfileUser';
import FooterGeust from './components/FooterGeust';




function App() {
  return (
    <Router>
    <Routes>

      {/*Guest */}
        <Route 
        path="/Guests"
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

        <Route path="/HomeGuests" element={<HomeGuests />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Article" element={<Article />} />
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

/*


function App() {
  return (
    <div>
    <SignIn/>
    <SignUp/>
    </div>
  
  )
}

/*   <NavBar/>
<HomeUsers/>
<HomeGuests/>
<Result/>
    <SignUp/>
    <SignIn/>
     <Article/>
    <MyCollection/>
<Footer/>*/