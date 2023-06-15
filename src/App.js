import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom";

import Header from "./components/layout/Header.js";
import Footer from "./components/layout/Footer.js";
import FirstPage from "./components/FirstPage"
import RegisterPage from "./components/RegisterPage";
import Profile from "./components/Profile";
import LogOutPage from "./components/LogOutPage";
import TeamRegister from "./components/TeamRegister";
import TeamProfile from "./components/TeamProfile";
import Finder from "./components/Finder";

import styles from './styles/HomeModule.css';
import "./styles/index.css";
import "./styles/layout/header.css";
import "./styles/layout/footer.css";
import "./styles/pages/FirstPage.css";
import "./styles/pages/LoginPage.css"
import "./styles/pages/Profile/Profile.css"
import "./styles/pages/Profile/ProfileEditor.css"
import "./styles/pages/LogOutPage.css"
import "./styles/pages/TeamRegister.css"
import "./styles/External/UserMinimalisticProfile.css"
import "./styles/pages/Finder/Finder.css"
import "./styles/pages/Finder/TeamFinder.css"
import "./styles/pages/Finder/UserFinder.css"

function App() {

  return (
          <div className={styles.container}>

              <main className={styles.main}>
                  <Header/>

                  <Routes>
                      <Route path="/" element={ <FirstPage/> }/>
                      <Route path="/register" element={ <RegisterPage/> }/>
                      <Route path="/user" element={ <Profile/> }/>
                      <Route path="/exit" element={ <LogOutPage/> }/>
                      <Route path="/teamRegister" element={ <TeamRegister/> }/>
                      <Route path="/team" element={ <TeamProfile/> }/>
                      <Route path="/search" element={ <Finder/> }/>
                  </Routes>

                  <Footer/>
              </main>

          </div>
  );
}

export default App;
