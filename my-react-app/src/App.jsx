
import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './components/home'; 
import SignIn from './components/SignIn'; 
import SignUp from './components/SignUp';
import Explore from './components/explore'; 
import About from './components/About';

function App() {
  return (
    <Router> 
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/signIn" element={<SignIn />} />
        <Route path='/signUp' element= {<SignUp/>} />
        <Route path="/explore" element={<Explore />} /> 
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
