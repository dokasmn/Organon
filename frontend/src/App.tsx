import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Responsive from "./components/items/section/Responsive.tsx";

// PAGES
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

import Header from './components/layout/Header.tsx';
import PopupLog from "./components/popups/PopUpLog.tsx";
import PrivateRoute from "./components/routes/PrivateRoute.tsx";

// COMPONENTS
import Loading from "./components/items/utils/Loading.tsx";
import AddTeacher from "./pages/AddTeacher.tsx";

// CONTEXTS
import { LoadingProvider } from "./contexts/LoadingContext.tsx";
import { PopupLogProvider } from "./contexts/PopUpLogContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

const App = () => { 
  return (
    <AuthProvider>
      <LoadingProvider>
        <PopupLogProvider>      
          <PopupLog/>
          <Loading/>
          <Router>
            <Responsive style="text-sm sm:text-base">
              <Header/>
              <section className="md:flex">
                <SideBar/>
                <Responsive style="w-full md:relative overflow-hidden md:mx-5 md:block">
                  <Routes>
                    <Route path="/" element={<PrivateRoute component={Home}/>}/>
                    <Route path="/home" element={<PrivateRoute component={Home}/>}/>
                    <Route path="/perfil/conteudo" element={<PrivateRoute component={Contents}/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/perfil/anotacoes" element={<PrivateRoute component={Notes}/>}/>
                    <Route path="/perfil/seguranca-conta" element={<PrivateRoute component={SecurityAccount}/>}/>
                    <Route path="/perfil/conteudo/criar-conteudo" element={<PrivateRoute component={CreateContent}/>} />
                    <Route path="/perfil/conteudo/criar-conteudo/:conteudo" element={<PrivateRoute component={CreateContent}/>} />
                    <Route path="/registrar" element={<Register />} />
                    <Route path="/perfil" element={<PrivateRoute component={Profile}/>} />
                    <Route path="/perfil/desativar-conta" element={<PrivateRoute component={CloseAccount}/>} />
                    <Route path="/bem-vindo" element={<PrivateRoute component={Welcome}/>} />
                    <Route path="/materia/:materia/:conteudo" element={<PrivateRoute component={Class}/>}/>
                    <Route path="/materia/:materia" element={<PrivateRoute component={Subject}/>}/>
                    <Route path="/adicionar_professor" element={<PrivateRoute component={AddTeacher}/>}/>
                  </Routes>
                </Responsive>
              </section>
            </Responsive>
          </Router>
        </PopupLogProvider>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
