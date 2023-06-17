import React, {Component} from 'react';
import axios from "axios";
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
import LoginPage from "./components/LoginPage";

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

class App extends Component{
    state = {
        users: [],
        id: "1",
        username: "Vladislav",
        about: "Я умею смеяться и веселиться",
        vkLink: "/vk/123",
        tgLink: "/tg/123",
        loading: false,
    }
    componentDidMount() {
        let userData
        axios.get('http://localhost:8000/users/')
            .then(res => {
                userData = res.data
                if(userData[0].username === "Lancelot") userData.shift()
                this.setState({
                    users: userData
                });
            })
            .catch(err => console.log(err))
            .finally(() => {
                this.setState({
                loading: true
            });
            })
    }


    render(){

        const usersList = this.state.users.map(user => {
            return( this.state.loading &&
                    <Route key={user.id} path={`/user/${user.id - 1}`}
                           element={
                               <Profile
                                   username={user.username}
                                   about={user.additional_info.about}
                                   vkLink={user.additional_info.vk}
                                   tgLink={user.additional_info.telegram}
                                   roles={user.group_names}/>
                           }/>)
            }
        )

        return (

            <div className={styles.container}>
                {this.state.loading && <main className={styles.main}>
                    <Header/>

                        <Routes>
                            <Route path="/" element={ <FirstPage/> }/>
                            <Route path="/register" element={ <RegisterPage/> }/>
                            {usersList}
                            <Route path="/exit" element={ <LogOutPage/> }/>
                            <Route path="/teamRegister" element={ <TeamRegister/> }/>
                            <Route path="/team" element={ <TeamProfile/> }/>
                            <Route path="/search" element={ <Finder/> }/>
                            <Route path="/login" element={ <LoginPage/> }/>
                        </Routes>

                    <Footer/>
                </main>}
            </div>
        );
    }
}

export default App;
