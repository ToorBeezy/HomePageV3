import React, {Component} from 'react';
import plusProfileAvatar from '../../public/image/plusRoles.png'
import HelloPart from "./External/HelloPart";
import {data} from "../Shared/ProfileRoles";
import TgIco from "../../public/image/TelegramIco.png";
import VkIco from "../../public/image/Vector(1).png";
import Slider from "./widgets/Slider/Slider";
import UserMinimalisticProfile from "./External/UserMinimalisticProfile";
import {Link} from "react-router-dom";
import plusRoles from "../../public/image/plusRoles.png";

class TeamRegister extends Component {
    state = {
        teamName: "",
        worksExampleArr: [],
        teamMembersArr: [],
        teamAvatar: null,
        workExample: null,
        rolesArr: data,
        teamAbout: "",
        dropdownState: false,
    }

    handleDropdownClick = () =>{
        this.setState(state => {
            return{
                dropdownState: true
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

    auto_grow = (element) => {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                teamAvatar: URL.createObjectURL(img)
            });
        }
    };

    addRole = (name) => {
        const temp = [...this.state.rolesArr]
        let role;
        if((name === "гейм-дизайнер") && (!temp.some(e => e.name === "гейм-дизайнер")))
            role = {
                id: this.state.rolesArr.length + 1,
                name: "гейм-дизайнер"
            }
        else if((name === "разработчик") && (!temp.some(e => e.name === "разработчик")))
            role = {
                id: this.state.rolesArr.length + 1,
                name: "разработчик"
            }
        else if((name === "дизайнер") && (!temp.some(e => e.name === "дизайнер")))
            role = {
                id: this.state.rolesArr.length + 1,
                name: "дизайнер"
            }
        else if((name === "тимлид") && (!temp.some(e => e.name === "тимлид")))
            role = {
                id: this.state.rolesArr.length + 1,
                name: "тимлид"
            }
        else if((name === "аналитик") && (!temp.some(e => e.name === "аналитик")))
            role = {
                id: this.state.rolesArr.length + 1,
                name: "аналитик"
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
            <button onClick={() => this.deleteRole(pos)} className='roleContainer' key={role.id}>
                {role.name}
            </button>);

        const teamMembersList = this.state.teamMembersArr.map((member) =>
            <UserMinimalisticProfile
                name = {member.name}
                about = {member.about}
                rolesArr = {member.rolesArr} />);


        return (
            <div className='justify-center mb-36'>
                <HelloPart/>

                <div className='mx-auto w-max '>
                    <a className="registerButton">
                        Создайте свою команду
                    </a>
                </div>

                <div className='my-16 mx-8'>
                    <div className='mb-14'>
                        <h1 className='text-4xl font-light mb-4'>
                            Введите название вашей команды
                        </h1>
                        <input
                            className='teamNameInput text-5xl leading-10 font-light w-1/2'
                            type='text'
                            value={this.state.teamName}
                            onChange={(e) => this.setState({teamName:e.target.value})}/>
                    </div>

                    <div className='flex mb-4'>
                        <h1 className='text-4xl font-light'>
                            Добавить фотографию профиля команды
                        </h1>
                        <div className='plusProfileAvatar h-fit'>
                            <input
                                className='absolute cursor-pointer avatarInput w-6 opacity-0'
                                type="file"
                                name="myImage"
                                onChange={this.onImageChange} />
                            <img className='' src={plusProfileAvatar}/>
                        </div>
                    </div>
                    <img src={this.state.teamAvatar} />
                </div>

                <div className='flex flex-col text-center mb-20 mx-auto w-full'>
                    <div className='pickRolesText px-5 mx-auto mb-10'>
                        <h1>
                            Укажите, кого вы ищете в свою команду
                        </h1>
                    </div>

                    <div className='w-full flex mx-auto text-center justify-center font-light'>
                        {rolesList}
                        {this.state.dropdownState && (
                            <div className='dropdown'>
                                <ul className='roleContainer_list absolute top-20 right-0'>
                                    <button onClick={() => this.addRole("гейм-дизайнер")} className='role_list w-full'>гейм-дизайнер</button>
                                    <button onClick={() => this.addRole("разработчик")} className='role_list w-full'>разработчик</button>
                                    <button onClick={() => this.addRole("дизайнер")} className='role_list w-full'>дизайнер</button>
                                    <button onClick={() => this.addRole("тимлид")} className='role_list w-full'>тимлид</button>
                                    <button onClick={() => this.addRole("аналитик")} className='role_list w-full'>аналитик</button>
                                </ul>
                            </div>
                        )}
                        {this.state.rolesArr.length < 5 &&
                            <button className='ml-5 mt-2' onBlur={this.hide} onClick={this.handleDropdownClick}>
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
                            value={this.state.teamAbout}
                            onInput={() => this.auto_grow(document.querySelector('.aboutInput'))}
                            onChange={(e) => this.setState({teamAbout:e.target.value})}/>
                    </div>
                </div>

                <div className='flex mb-20 ml-12'>
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

                <div className='flex mb-16 ml-12'>
                    <h1 className='text-4xl font-light'>
                        Добавить участников команды
                    </h1>

                    <div className='plusProfileAvatar h-fit'>
                        <button onClick={this.addTeamMembersArr}>
                            <img src={plusProfileAvatar}/>
                        </button>
                    </div>
                </div>

                {teamMembersList}

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
                    <Link to='/team' className="register_okButton">
                        ГОТОВО
                    </Link>
                </div>
            </div>
        );
    }
}

export default TeamRegister;