import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import NavBar from './components/NavBar'
import HomeGuests from './components/HomeGuests';
import HomeUsers from './components/HomeUsers';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Result from './components/Result';

import { IoClose } from "react-icons/io5";
import MyCollection from './components/MyCollection';
import Article from './components/Article';

function App() {
  return (
    <Router>
    <div>
    <NavBar/>
    <HomeUsers/>
    <Footer/>
        </div>
    </Router>
  )
}

export default App;

/*   <NavBar/>
<HomeUsers/>
<HomeGuests/>
<Result/>
    <SignUp/>
    <SignIn/>
     <Article/>
    <MyCollection/>
<Footer/>*/