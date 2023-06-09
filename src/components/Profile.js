import React, {Component} from 'react';
import wmnPic from '../../public/image/image 6.png'
import manPic from '../../public/image/image 5.png'
import avatar from '../../public/image/Ellipse 1.png'
import wrkExample from '../../public/image/RedGuy.png'
import VkIco from '../../public/image/Vector(1).png'
import TgIco from '../../public/image/TelegramIco.png'
import Editor from '../../public/image/Editor.png';
import plusRoles from '../../public/image/plusRoles.png'
import {data} from "../Shared/ProfileRoles";

class Profile extends Component {
    state = {
        flag: false,
        dropdownState: false,
        rolesArr: data
    }

    switchRedactor = () => {
        this.setState(state => {
            return{
                flag: !state.flag
            }
        })
    };

    handleDropdownClick = () =>{
        this.setState(state => {
            return{
                dropdownState: !state.dropdownState
            }
        })
    }



    deleteRole = (pos) => {
        const temp = [...this.state.rolesArr];
        temp.splice(pos, 1)
        this.setState({
            rolesArr: temp
        })
    }

    addRole = (name) => {
        const temp = [...this.state.rolesArr]
        let role ={
            id: 0,
            name: ""
        }
        if((name === "Гейм-дизайнер") && (!temp.some(e => e.name === "Гейм-дизайнер")))
            role = {
                id: this.state.rolesArr.length + 1,
                name: "Гейм-дизайнер"
            }
        else if((name === "Разработчик") && (!temp.some(e => e.name === "Разработчик")))
            role = {
                id: this.state.rolesArr.length + 1,
                name: "Разработчик"
            }
        else if((name === "Дизайнер") && (!temp.some(e => e.name === "Дизайнер")))
            role = {
                id: this.state.rolesArr.length + 1,
                name: "Дизайнер"
            }
        else if((name === "Тимлид") && (!temp.some(e => e.name === "Тимлид")))
            role = {
                id: this.state.rolesArr.length + 1,
                name: "Тимлид"
            }
        else{
            return
        }

        temp.push(role);
        this.setState({
            rolesArr: temp
        })
    }

    render() {

        const rolesList = this.state.rolesArr.map((role, pos) =>
            <button onClick={() => this.deleteRole(pos)} className='roleContainer' key={role.id}>
                <a className='role'>
                    {role.name}
                </a>
            </button>);


        return (
            <div>
                {this.state.flag &&
                    <div className='profile pb-36'>
                        <div className='avatarDiv flex mt-16 mx-5 justify-center'>
                            <div>
                                <img src={wmnPic}/>
                            </div>

                            <div className='text-center my-auto mx-24'>
                                <img src={avatar}/>
                            </div>

                            <div>
                                <img src={manPic}/>
                            </div>
                        </div>

                        <div className='text-center redactProfile'>
                            <div className='flex flex-col w-2/6 text-center m-auto'>
                                <button onClick={this.switchRedactor} className='buttonRedact mb-0'>Сохранить изменения</button>
                                <button onClick={this.switchRedactor} className='buttonRedact'>Отмена</button>
                            </div>
                        </div>

                        <div className='text-center flex justify-between mx-auto mb-12'>
                            <div className='profileName flex text-5xl font-light text-left ml-12'>
                                <h1>Kurochkina Darya Nikolaevna</h1>
                                <button className='pl-24'>
                                    <img src={Editor}/>
                                </button>
                            </div>

                            <div className='roles juswtify-left flex mx-auto'>
                                {rolesList}
                                {this.state.dropdownState && (
                                    <div className='dropdown'>
                                        <ul className='roleContainer_list absolute top-20 right-0'>
                                            <button onClick={() => this.addRole("Гейм-дизайнер")} className='role_list w-full'>Гейм-дизайнер</button>
                                            <button onClick={() => this.addRole("Разработчик")} className='role_list w-full'>Разработчик</button>
                                            <button onClick={() => this.addRole("Дизайнер")} className='role_list w-full'>Дизайнер</button>
                                            <button onClick={() => this.addRole("Тимлид")} className='role_list w-full'>Тимлид</button>
                                        </ul>
                                    </div>
                                )}
                                <button onClick={this.handleDropdownClick}>
                                    <img src={plusRoles}/>
                                </button>

                            </div>
                        </div>

                        <div className='flex flex-col justify-left ml-12'>
                            <div className='text-5xl font-light text-left'>
                                <h1>
                                    Обо мне:
                                </h1>
                            </div>

                            <div className='ml-5 my-5 text-3xl w-5/6'>
                                <h2>
                                    Я умею смеяться и веселиться<p/>
                                    В прошлом семестре по предмету опд получила 97 баллов
                                </h2>
                            </div>
                        </div>

                        <div className='flex flex-col justify-left ml-12 mb-5'>
                            <h1 className='text-5xl font-light text-left'>Мои работы:</h1>
                        </div>

                        <div className='myWorks mb-20'>
                            <div className='wrksContainer flex justify-center text-center m-auto'>
                                <div className='wrkExample'>
                                    <img src={wrkExample}/>
                                </div>

                                <div className='wrkExample'>
                                    <img src={wrkExample}/>
                                </div>

                                <div className='wrkExample'>
                                    <img src={wrkExample}/>
                                </div>

                                <div className='wrkExample'>
                                    <img src={wrkExample}/>
                                </div>

                            </div>
                        </div>

                        <div className='flex kontakts align-items-lg-end w-1/3 m-auto'>
                            <div className='text-5xl font-light mx-12'>
                                <h1>Контакты:</h1>
                            </div>

                            <div className='flex'>
                                <a className='mr-12' href='tg'>
                                    <img src={TgIco}/>

                                </a>

                                <a href='vk'>
                                    <img src={VkIco}/>
                                </a>
                            </div>
                        </div>
                    </div>}

                {!this.state.flag &&
                    <div className='pb-36'>
                        <div className='avatarDiv flex mt-16 mx-5 justify-center'>
                            <div>
                                <img src={wmnPic}/>
                            </div>

                            <div className='text-center my-auto mx-24'>
                                <img src={avatar}/>
                            </div>

                            <div>
                                <img src={manPic}/>
                            </div>
                        </div>

                        <div className='text-center redactProfile'>
                            <button onClick={this.switchRedactor} className='buttonRedact'>Редактировать профиль</button>
                        </div>

                        <div className='flex mb-12'>
                            <div className='profileName text-5xl font-light text-left ml-12 mr-24'>
                                <h1>Kurochkina Darya Nikolaevna</h1>
                            </div>

                            <div className='roles justify-left flex mx-auto'>
                                {rolesList}
                            </div>
                        </div>

                        <div className='flex flex-col justify-left ml-12'>
                            <div className='text-5xl font-light text-left'>
                                <h1>
                                    Обо мне:
                                </h1>
                            </div>

                            <div className='ml-5 my-5 text-3xl w-5/6'>
                                <h2>
                                    Я умею смеяться и веселиться<p/>
                                    В прошлом семестре по предмету опд получила 97 баллов
                                </h2>
                            </div>
                        </div>

                        <div className='flex flex-col justify-left ml-12 mb-5'>
                            <h1 className='text-5xl font-light text-left'>Мои работы:</h1>
                        </div>

                        <div className='myWorks mb-20'>
                            <div className='wrksContainer flex justify-center text-center m-auto'>
                                <div className='wrkExample'>
                                    <img src={wrkExample}/>
                                </div>

                                <div className='wrkExample'>
                                    <img src={wrkExample}/>
                                </div>

                                <div className='wrkExample'>
                                    <img src={wrkExample}/>
                                </div>

                                <div className='wrkExample'>
                                    <img src={wrkExample}/>
                                </div>

                            </div>
                        </div>

                        <div className='flex kontakts align-items-lg-end w-1/3 m-auto'>
                            <div className='text-5xl font-light mx-12'>
                                <h1>Контакты:</h1>
                            </div>

                            <div className='flex'>
                                <a className='mr-12' href='tg'>
                                    <img src={TgIco}/>

                                </a>

                                <a href='vk'>
                                    <img src={VkIco}/>
                                </a>
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
};
export default Profile;