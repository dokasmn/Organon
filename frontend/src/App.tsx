//REACT
import { BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import React from 'react';

//IMAGES

//PAGES
import Contents from './pages/Contents.tsx';
import Notes from './pages/Notes.tsx';
import Login from './pages/Login.tsx';
import SecurityAccount from './pages/SecurityAccount.tsx';
import Home from './pages/Home.tsx';
import CreateContent from "./pages/CreateContent.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";

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
          <Route path="/securityAccount" element={<SecurityAccount/>}/>
          <Route path="/create-content" element={<CreateContent/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </section>
    </Router>
  );
}

export default App
