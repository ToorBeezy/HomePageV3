import React, {Component} from 'react';
import HelloPart from "./External/HelloPart";
import plusProfileAvatar from "../../public/image/plusRoles.png";
import {data} from "../Shared/ProfileRoles";
import TgIco from "../../public/image/TelegramIco.png";
import VkIco from "../../public/image/Vector(1).png";
import Slider from "./widgets/Slider/Slider";

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            rolesArr: data,
            worksExampleArr: [],
            login: "",
            password: "",
            registerName: "",
            registerProfileAvatar: null,
            registerWorkExample: null,
        }
    }

    auto_grow_register = (element) => {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    onImageChange_register = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                registerProfileAvatar: URL.createObjectURL(img)
            });
        }
    };

    addImageToWorksExampleArr = event => {
        if (event.target.files && event.target.files[0]) {
            const temp = [...this.state.worksExampleArr]
            let tempImg = event.target.files[0]
            let image = {
                title: this.state.worksExampleArr.length + 1,
                src: URL.createObjectURL(tempImg)
            }
            temp.push(image)
            this.setState({
                worksExampleArr: temp
            })
        }
    }





    render() {

        const rolesList = this.state.rolesArr.map((role, pos) =>
            <button className='pickRoleContainer' key={role.id}>
                {role.name}
            </button>);

        return (
            <div className='justify-center mb-36'>
                <HelloPart/>

                <div className='mx-auto w-max '>
                    <a className="registerButton">
                        РЕГИСТРАЦИЯ
                    </a>
                </div>

                <div className='my-16 mx-8'>
                    <div className='mb-8'>
                        <h1 className='text-4xl font-light mb-4'>
                            Введите логин
                        </h1>
                        <input
                            className='teamNameInput text-5xl leading-10 font-light w-1/2'
                            type='text'
                            value={this.state.login}
                            onChange={(e) => this.setState({login:e.target.value})}/>
                    </div>

                    <div className='mb-8'>
                        <h1 className='text-4xl font-light mb-4'>
                            Введите пароль
                        </h1>
                        <input
                            className='teamNameInput text-5xl leading-10 font-light w-1/2'
                            type='password'
                            value={this.state.password}
                            onChange={(e) => this.setState({password:e.target.value})}/>
                    </div>

                    <div className='mb-8'>
                        <h1 className='text-4xl font-light mb-4'>
                            Введите ваше ФИО
                        </h1>
                        <input
                            className='teamNameInput text-5xl leading-10 font-light w-1/2'
                            type='text'
                            value={this.state.registerName}
                            onChange={(e) => this.setState({registerName:e.target.value})}/>
                    </div>

                    <div className='flex mb-4'>
                        <h1 className='text-4xl font-light'>
                            Добавить фотографию профиля
                        </h1>
                        <div className='plusProfileAvatar h-fit'>
                            <input
                                className='absolute cursor-pointer avatarInput w-6 opacity-0'
                                type="file"
                                name="myImage"
                                onChange={this.onImageChange_register} />
                            <img src={plusProfileAvatar}/>
                        </div>
                    </div>
                    <img src={this.state.registerProfileAvatar} />
                </div>

                <div className='flex flex-col text-center mb-20 mx-auto w-full'>
                    <div className='pickRolesText mx-auto px-5 mb-10'>
                        <h1>
                            Укажите роль/роли, которые вы хотите занимать в проекте
                        </h1>
                    </div>

                    <div className='w-full font-light'>
                        {rolesList}
                    </div>
                </div>

                <div className='flex flex-col justify-left ml-12 mb-12'>
                    <div className='text-5xl font-light text-left'>
                        <h1>
                            Укажите информацию о вас:
                        </h1>
                    </div>

                    <div className='my-3 text-3xl w-5/6'>
                        <textarea
                            className='aboutInput w-full'
                            value={this.state.teamAbout}
                            onInput={() => this.auto_grow_register(document.querySelector('.aboutInput'))}
                            onChange={(e) => this.setState({teamAbout:e.target.value})}/>
                    </div>
                </div>

                <div className='flex mb-4 ml-12'>
                    <h1 className='text-4xl font-light'>
                        Добавить фото примера работ
                    </h1>

                    <div className='plusProfileAvatar h-fit'>
                        <input
                            className='absolute cursor-pointer avatarInput w-6 opacity-0'
                            type="file"
                            name="myImage"
                            onChange={this.addImageToWorksExampleArr} />
                        <img className='' src={plusProfileAvatar}/>
                    </div>
                </div>

                {this.state.worksExampleArr.length > 0 && <Slider Arr = {this.state.worksExampleArr}/>}

                <div className='ml-12 mb-24'>
                    <div className='mb-12 text-5xl font-light'>
                        <h1>
                            Контакты:
                        </h1>
                    </div>
                    <div className='ml-12 flex flex-col'>
                        <div className='mb-12 flex'>
                            <a>
                                <img className='teamRegister_tgImg'  src={TgIco}/>
                            </a>

                            <input
                                className='tgLink text-3xl font-light'
                                placeholder='Вставьте ссылку'
                                value={this.state.tg}
                                onChange={(e) => this.setState({tg:e.target.value})}/>
                        </div>

                        <div className='flex'>
                            <a>
                                <img className='mr-16' src={VkIco}/>
                            </a>

                            <input
                                className='tgLink text-3xl font-light'
                                placeholder='Вставьте ссылку'
                                value={this.state.vk}
                                onChange={(e) => this.setState({vk:e.target.value})}/>
                        </div>
                    </div>
                </div>

                <div className='mx-auto w-max'>
                    <a className="register_okButton">
                        ГОТОВО
                    </a>
                </div>
            </div>
        );
    }
}

export default LoginPage;