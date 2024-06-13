//REACT
import { BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import React from 'react';

//IMAGES

//PAGES
import Profile from './pages/Profile.tsx';
import Notes from './pages/Notes.tsx';
import Login from './pages/Login.tsx';
import SecurityAccount from './pages/SecurityAccount.tsx';
import Home from './pages/Home.tsx';


//COMPONENTS
import Header from './components/layout/Header.tsx';
import ButtonNavigationBar from "./components/items/BottomNavigationBar.tsx";

const App = () => {
  return (
    
    <Router>
      {/* <Header search /> */}
      <Header/>
      <section className={' text-sm pb-20 '} >
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/notes" element={<Notes/>}/>
          <Route path="/securityAccount" element={<SecurityAccount/>}/>
        </Routes>
      </section>
    </Router>
  );
}

export default App
