import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/layout/Header.js";
import Footer from "./components/layout/Footer.js";
import HelloPage from "./components/HelloPage"
import ReviewPage from "./components/ReviewPage";

import styles from './styles/HomeModule.css';
import "./styles/index.css";
import "./styles/layout/header.css";
import "./styles/layout/footer.css";
import "./styles/pages/HelloPage.css";
import "./styles/pages/ReviewPage.css";

class App extends Component{

    render(){


        return (

            <div className={styles.container}>
                <main className={styles.main}>
                    <Header/>
                    <HelloPage/>
                    <ReviewPage/>
                    <Footer/>
                </main>
            </div>

        );
    }
}

export default App;
