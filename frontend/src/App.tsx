import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//REACT
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, { useState } from 'react';
import Responsive from "./components/items/section/Responsive.tsx";

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
import SideBar from "./components/layout/SideBar.tsx";

//COMPONENTS
import Header from './components/layout/Header.tsx';
import PopupLog from "./components/popups/PopUpLog.tsx";

//HOOKS
import usePopUpLog from "./hooks/usePopUpLog.tsx";

const App = () => {

  const { showPopup, setShowPopup, popupType, popupTitle, popupMessage } = usePopUpLog()

  return (
    <Router>
      <Responsive style="text-sm sm:text-base">
        <Header/>
        <section className="md:flex" >  
          {showPopup && (
            <PopupLog
              type={popupType}
              title={popupTitle}
              message={popupMessage}
              onClose={() => setShowPopup(false)}
            />
          )}
          <SideBar/>
          <Responsive style="w-full md:relative overflow-hidden md:mx-5 md:block">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="perfil/conteudo" element={<Contents/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/notas" element={<Notes/>}/>
              <Route path="perfil/seguranca-conta" element={<SecurityAccount/>}/>
              <Route path="perfil/conteudo/criar-conteudo" element={<CreateContent/>}/>
              <Route path="/registrar" element={<Register/>}/>
              <Route path="/perfil" element={<Profile/>}/>
              <Route path="perfil/desativar-conta" element={<CloseAccount/>}/>
              <Route path="/bem-vindo" element={<Welcome/>}/>
              <Route path="/materia/:materia/:conteudo" element={<Class/>}/>
              <Route path="/materia/:materia" element={<Subject/>}/>
            </Routes>
          </Responsive>

        </section>
      </Responsive>
    </Router>
  );
}

export default App
