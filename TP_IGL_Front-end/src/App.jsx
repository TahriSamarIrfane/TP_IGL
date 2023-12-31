import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import NavBar from './components/NavBar'
import HomeGuests from './components/HomeGuests';
import HomeUsers from './components/HomeUsers';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import MyCollection from './components/MyCollection';

import { IoClose } from "react-icons/io5";

function App() {
  return (
    <Router>
    <div>
    <NavBar/>
    <MyCollection/>
    <Footer/>
    </div>
    </Router>
  )
}

export default App;

/*   <NavBar/>
<HomeUsers/>
<HomeGuests/>
    <SignUp/>
    <SignIn/>
<Footer/>*/