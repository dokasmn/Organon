import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//REACT
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
import Welcome from "./pages/Welcome.tsx";
import Class from "./pages/Class.tsx";
import Subject from "./pages/Subject.tsx";

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
          <Route path="/conteudo" element={<Contents/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/notas" element={<Notes/>}/>
          <Route path="/segurança-conta" element={<SecurityAccount/>}/>
          <Route path="/criar-conteudo" element={<CreateContent/>}/>
          <Route path="/registrar" element={<Register/>}/>
          <Route path="/perfil" element={<Profile/>}/>
          <Route path="/desativar-conta" element={<CloseAccount/>}/>
          <Route path="/bem-vindo" element={<Welcome/>}/>
          <Route path="/conteudo/:conteudo" element={<Class/>}/>
          <Route path="/materia/:materia" element={<Subject/>}/>
        </Routes>
      </section>
    </Router>
  );
}

export default App
