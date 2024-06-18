import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//REACT
import { BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import React from 'react';

//PAGES
import Contents from './pages/Contents.tsx';
import Notes from './pages/Notes.tsx';
import Login from './pages/Login.tsx';
import SecurityAccount from './pages/SecurityAccount.tsx';
import Home from './pages/Home.tsx';
import CreateContent from "./pages/CreateContent.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import CloseAccount from "./pages/CloseAccount.tsx";

//COMPONENTS
import Header from './components/layout/Header.tsx';

const App = () => {
  return (
    
    <Router>
      <Header/>
      <section>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/contents" element={<Contents/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/notes" element={<Notes/>}/>
          <Route path="/security-account" element={<SecurityAccount/>}/>
          <Route path="/create-content" element={<CreateContent/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/Close-account" element={<CloseAccount/>}/>
        </Routes>
      </section>
    </Router>
  );
}

export default App
