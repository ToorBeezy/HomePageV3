import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/layout/Header.js";
import Footer from "./components/layout/Footer.js";
import FirstPage from "./components/FirstPage"
import LoginPage from "./components/LoginPage";
import Profile from "./components/Profile";

import "./styles/index.css";
import "./styles/layout/header.css";
import "./styles/layout/footer.css";
import "./styles/FirstPage.css";
import "./styles/LoginPage.css"
import "./styles/Profile.css"
import "./styles/ProfileEditor.css"
import { BrowserRouter as Router } from "react-router-dom";

import styles from './styles/HomeModule.css';

function App() {

  return (
      <Router>
          <div className={styles.container}>

              <main className={styles.main}>
                  <Header/>
                  {/*<FirstPage/>*/}
                  {/*<LoginPage/>*/}
                  <Profile/>
                  <Footer/>
              </main>

          </div>
      </Router>

  );
}

export default App;
