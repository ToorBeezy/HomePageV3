import React, {Component} from 'react';
import HelloPart from "./External/HelloPart";
import plusProfileAvatar from "../../public/image/plusRoles.png";
import TgIco from "../../public/image/TelegramIco.png";
import VkIco from "../../public/image/Vector(1).png";
import Slider from "./widgets/Slider/Slider";
import plusRoles from "../../public/image/plusRoles.png";
import axios from "axios";

class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            rolesArr: [],
            worksExampleArr: [],
            login: "",
            about: "",
            dropdownState: false,
            password: "",
            registerName: "",
            tg: "",
            vk: "",
            registerProfileAvatar: null,
            registerProfileAvatarFile: null,
            registerWorkExample: null,
        }
    }

    deleteRole = (pos) => {
        const temp = [...this.state.rolesArr];
        temp.splice(pos, 1)
        this.setState({
            rolesArr: temp
        })
    }

    auto_grow_register = (element) => {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    onImageChange_register = event => {
        let img = event.target.files[0];
        this.setState({
            registerProfileAvatar: URL.createObjectURL(img),
            registerProfileAvatarFile: img
        });
    };

    handleDropdownClick = () =>{
        this.setState(state => {
            return{
                dropdownState: true
            }
        })
    }

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

    addRole = (name) => {
        const temp = [...this.state.rolesArr]
        let role;
        if((name === "гейм-дизайнер") && (!temp.some(e => e === "гейм-дизайнер")))
            role = "гейм-дизайнер"

        else if((name === "разработчик") && (!temp.some(e => e === "разработчик")))
            role = "разработчик"

        else if((name === "дизайнер") && (!temp.some(e => e === "дизайнер")))
            role = "дизайнер"

        else if((name === "тимлид") && (!temp.some(e => e === "тимлид")))
            role = "тимлид"

        else if((name === "аналитик") && (!temp.some(e => e === "аналитик")))
            role = "аналитик"

        else{
            return
        }

        temp.push(role);
        this.setState({
            rolesArr: temp
        })
    }

    hide = (e) => {
        if(e && e.relatedTarget){
            e.relatedTarget.click();
        }
        this.setState(state => {
            return{
                dropdownState: !state.dropdownState
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const uploadData = new FormData();
        console.log(this.state.registerProfileAvatarFile)
        uploadData.append('image', this.state.registerProfileAvatarFile)
        console.log(uploadData);
        axios.post("http://localhost:8000/users/", {
            username: this.state.login,
            group_names: this.state.rolesArr,
            additional_info: {
                image: uploadData,
                name: this.state.registerName,
                about: this.state.about,
                vk: this.state.vk,
                telegram: this.state.tg ,
                user: null,
            },
            headers: {
                'content-type': 'multipart/form-data',
            },
            password: this.state.password
        }).then(res => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     let form_data = new FormData();
    //     form_data.append('username', this.state.login);
    //     form_data.append('group_names', this.state.rolesArr);
    //     form_data.append('password', this.state.password);
    //     form_data.append('additional_info.image', this.state.registerProfileAvatarFile, this.state.registerProfileAvatarFile.name);
    //     form_data.append('additional_info.name', this.state.registerName);
    //     form_data.append('additional_info.about', this.state.about);
    //     form_data.append('additional_info.vk', this.state.vk);
    //     form_data.append('additional_info.telegram', this.state.tg);
    //     form_data.append('additional_info.user', null);
    //     console.log(form_data);
    //     let url = 'http://localhost:8000/users/';
    //     axios.post(url, form_data, {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     })
    //         .then(res => {
    //             console.log(res.data);
    //         })
    //         .catch(err => console.log(err))
    // };



    render() {

        const rolesList = this.state.rolesArr.map((role, pos) =>
            <button type='button' onClick={() => this.deleteRole(pos)} className='roleContainer' key={pos}>
                {role}
            </button>);

        return (
            <div className='justify-center mb-36'>
                <HelloPart/>

                <div className='mx-auto w-max '>
                    <a className="registerButton">
                        РЕГИСТРАЦИЯ
                    </a>
                </div>

                <form onSubmit={this.handleSubmit}>
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
                                    accept="image/png, image/jpeg"
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

                        <div className='w-full flex mx-auto text-center justify-center font-light'>
                            {rolesList}
                            {this.state.dropdownState && (
                                <div className='dropdown'>
                                    <ul className='roleContainer_list absolute top-20 right-0'>
                                        <button type='button' onClick={() => this.addRole("гейм-дизайнер")} className='role_list w-full'>гейм-дизайнер</button>
                                        <button type='button' onClick={() => this.addRole("разработчик")} className='role_list w-full'>разработчик</button>
                                        <button type='button' onClick={() => this.addRole("дизайнер")} className='role_list w-full'>дизайнер</button>
                                        <button type='button' onClick={() => this.addRole("тимлид")} className='role_list w-full'>тимлид</button>
                                        <button type='button' onClick={() => this.addRole("аналитик")} className='role_list w-full'>аналитик</button>
                                    </ul>
                                </div>
                            )}
                            {this.state.rolesArr.length < 5 &&
                                <button type='button' className='ml-5 mt-2' onBlur={this.hide} onClick={this.handleDropdownClick}>
                                    <img src={plusRoles}/>
                                </button>}
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
                            value={this.state.about}
                            onInput={() => this.auto_grow_register(document.querySelector('.aboutInput'))}
                            onChange={(e) => this.setState({about:e.target.value})}/>
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
                        <input type='submit' value='ГОТОВО' className="register_okButton"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterPage;