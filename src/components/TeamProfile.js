import React, {Component} from 'react';
import colage from "../../public/image/colage.png";
import avatar from "../../public/image/Ellipse 1.png";
import {data} from "../Shared/ProfileRoles";
import plusProfileAvatar from "../../public/image/plusRoles.png";
import UserMinimalisticProfile from "./External/UserMinimalisticProfile";
import TgIco from "../../public/image/TelegramIco.png";
import VkIco from "../../public/image/Vector(1).png";
import Slider from "./widgets/Slider/Slider";
import Editor from "../../public/image/Editor.png";
import plusRoles from "../../public/image/plusRoles.png";

class TeamProfile extends Component {
    state = {
        flag: false,
        dropdownState: false,
        rolesArr: data,
        worksExampleArr: [],
        editTeamNameFlag: false,
        vk: "",
        tg: "",
        name: "Cool Papers",
        about: "Веселая и дружная команда , ищем аналитика и тимлида",
        teamMembersArr: [],
    }

    addTeamMembersArr = event => {
        const temp = [...this.state.teamMembersArr]
        let member = {
            name: "Zakarev Alexey Vasilyevich",
            about: "Я умею смеяться и веселиться V прошлом семестре по предмету опд получила 97 баллов",
            rolesArr: this.state.rolesArr,
        }
        temp.push(member)
        this.setState({
            teamMembersArr: temp
        })
    }

    handleDropdownClick = () =>{
        this.setState(state => {
            return{
                dropdownState: !state.dropdownState
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

    switchTeamNameRedactor = () => {
        this.setState(state => {
            return{
                editTeamNameFlag: !state.editTeamNameFlag
            }
        })
    };

    switchRedactorMode = () => {
        this.setState(state => {
            return{
                flag: !state.flag,
                editNameFlag: false
            }
        })
    };

    auto_grow = (element) => {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    deleteRole = (pos) => {
        if(!this.state.flag) return
        const temp = [...this.state.rolesArr];
        temp.splice(pos, 1)
        this.setState({
            rolesArr: temp
        })
    }

    addRole = (name) => {
        const temp = [...this.state.rolesArr]
        let role = {
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


    render() {

        const rolesList = this.state.rolesArr.map((role, pos) =>
            <button onClick={() => this.deleteRole(pos)} className='roleContainer' key={role.id}>
                {role.name}
            </button>);

        const teamMembersList = this.state.teamMembersArr.map((member) =>
            <UserMinimalisticProfile
                name = {member.name}
                about = {member.about}
                rolesArr = {member.rolesArr} />);

        return (
            <div>
                {this.state.flag &&
                    <div className='mb-44'>
                        <div className='colage'>
                            <img className='w-full' src={colage}  alt=''/>
                        </div>

                        <div className='avatarDiv flex mt-12 mx-5 justify-center'>

                            <div className='text-center my-auto mx-24'>
                                <img src={avatar}/>
                            </div>

                        </div>

                        <div className='text-center redactProfile'>
                            <div className='flex flex-col w-2/6 text-center m-auto'>
                                <button onClick={this.switchRedactorMode} className='buttonRedact'>Сохранить изменения</button>
                            </div>
                        </div>

                        <div className='profileName flex text-5xl font-light text-left mb-12 ml-12'>
                            {this.state.editTeamNameFlag &&
                                <textarea
                                    className='nameInput'
                                    type='text'
                                    value={this.state.name}
                                    onInput={() => this.auto_grow(document.querySelector('.nameInput'))}
                                    onChange={(e) => this.setState({name:e.target.value})}/>}
                            {!this.state.editTeamNameFlag && <h1 className='redactorOfName'>{this.state.name}</h1>}
                            <button onClick={this.switchTeamNameRedactor}>
                                <img className='max-w-fit' src={Editor}/>
                            </button>
                        </div>

                        <div className='flex flex-col justify-left ml-12'>
                            <div className='text-5xl font-light text-left'>
                                <h1>
                                    О нас:
                                </h1>
                            </div>

                            <div className='ml-5 my-5 text-3xl w-5/6 h-fit'>
                                <textarea
                                    className='aboutInput w-full h-full'
                                    value={this.state.about}
                                    onInput={() => this.auto_grow(document.querySelector('.aboutInput'))}
                                    onChange={(e) => this.setState({about:e.target.value})}/>
                            </div>
                        </div>

                        <div className='flex flex-col justify-left ml-12 mb-8'>
                            <div className='text-5xl font-light text-left'>
                                <h1>
                                    Мы ищем:
                                </h1>
                            </div>
                        </div>

                        <div className='roles juswtify-left flex ml-8'>
                            {rolesList}
                            {this.state.dropdownState && (
                                <div className='dropdown'>
                                    <ul className='roleContainer_list absolute top-20 '>
                                        <button onClick={() => this.addRole("Гейм-дизайнер")} className='role_list w-full'>Гейм-дизайнер</button>
                                        <button onClick={() => this.addRole("Разработчик")} className='role_list w-full'>Разработчик</button>
                                        <button onClick={() => this.addRole("Дизайнер")} className='role_list w-full'>Дизайнер</button>
                                        <button onClick={() => this.addRole("Тимлид")} className='role_list w-full'>Тимлид</button>
                                    </ul>
                                </div>
                            )}
                            <button onBlur={this.hide} onClick={this.handleDropdownClick}>
                                <img src={plusRoles}/>
                            </button>
                        </div>

                        <div className='flex my-16 ml-12'>
                            <h1 className='text-4xl font-light'>
                                Добавить участника
                            </h1>

                            <div className='plusProfileAvatar h-fit'>
                                <button onClick={this.addTeamMembersArr}>
                                    <img src={plusProfileAvatar}/>
                                </button>
                            </div>
                        </div>

                        {teamMembersList}

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


                        <div className='linksEdit flex align-items-lg-end mt-20 w-1/3'>
                            <div className='text-5xl font-light mx-12 text-center mb-12'>
                                <h1>Контакты:</h1>
                            </div>

                            <div className='flex flex-col'>
                                <div className='mb-12 flex'>
                                    <a>
                                        <img className='mr-32'  src={TgIco}/>
                                    </a>

                                    <input
                                        className='tgLink text-3xl font-light'
                                        placeholder='Вставьте ссылку'
                                        value={this.state.tg}
                                        onChange={(e) => this.setState({tg:e.target.value})}/>
                                </div>

                                <div className='flex'>
                                    <a>
                                        <img className='mr-32' src={VkIco}/>
                                    </a>

                                    <input
                                        className='tgLink text-3xl font-light'
                                        placeholder='Вставьте ссылку'
                                        value={this.state.vk}
                                        onChange={(e) => this.setState({vk:e.target.value})}/>
                                </div>
                            </div>
                        </div>
                    </div>}

                {!this.state.flag &&
                    <div className='mb-44'>
                        <div className='colage'>
                            <img className='w-full' src={colage}  alt=''/>
                        </div>

                        <div className='avatarDiv flex mt-12 mx-5 justify-center'>

                            <div className='text-center my-auto mx-24'>
                                <img src={avatar}/>
                            </div>

                        </div>

                        <div className='text-center redactProfile'>
                            <button onClick={this.switchRedactorMode} className='buttonRedact'>Редактировать профиль</button>
                        </div>

                        <div className='flex mb-12'>
                            <div className='profileName text-5xl font-light text-left ml-12 mr-24'>
                                <h1>{this.state.name}</h1>
                            </div>
                        </div>

                        <div className='flex flex-col justify-left ml-12'>
                            <div className='text-5xl font-light text-left'>
                                <h1>
                                    О нас:
                                </h1>
                            </div>

                            <div className='ml-5 my-5 text-3xl w-5/6'>
                                <h2>
                                    {this.state.about}
                                </h2>
                            </div>
                        </div>

                        <div className='flex flex-col justify-left ml-12 mb-8'>
                            <div className='text-5xl font-light text-left'>
                                <h1>
                                    Мы ищем:
                                </h1>
                            </div>
                        </div>

                        <div className='roles ml-8'>
                            {rolesList}
                        </div>

                        <div className='flex my-16 ml-12'>
                            <h1 className='text-4xl'>
                                Наши участники:
                            </h1>
                        </div>

                        {teamMembersList}

                        <div className='flex flex-col justify-left ml-12 mb-5'>
                            <h1 className='text-5xl font-light text-left'>
                                Наши работы:
                            </h1>
                        </div>

                        {this.state.worksExampleArr.length > 0 && <Slider Arr = {this.state.worksExampleArr}/>}

                        <div className='flex kontakts align-items-lg-end mt-12 w-1/3 mx-auto'>
                            <div className='text-5xl font-light mx-12'>
                                <h1>Контакты:</h1>
                            </div>

                            <div className='flex'>
                                <a className='mr-12' href={this.state.tg}>
                                    <img src={TgIco}/>

                                </a>

                                <a href={this.state.vk}>
                                    <img src={VkIco}/>
                                </a>
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default TeamProfile;