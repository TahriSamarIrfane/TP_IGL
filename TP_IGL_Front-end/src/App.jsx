import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import NavBar from './components/NavBar'
import HomeGuests from './components/HomeGuests';
import HomeUsers from './components/HomeUsers';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
    <div>
    <NavBar/>
    <HomeUsers/>
    <HomeGuests/>
    <Footer/>
    </div>
    </Router>
  )
}

export default App;

