import React, {Component} from 'react';
import plusProfileAvatar from '../../public/image/plusRoles.png'
import HelloPart from "./External/HelloPart";
import {data} from "../Shared/ProfileRoles";
import TgIco from "../../public/image/TelegramIco.png";
import VkIco from "../../public/image/Vector(1).png";
import Slider from "./widgets/Slider/Slider";
import UserMinimalisticProfile from "./External/UserMinimalisticProfile";
import {Link} from "react-router-dom";

class TeamRegister extends Component {
    state = {
        teamName: "",
        worksExampleArr: [],
        teamMembersArr: [],
        teamAvatar: null,
        workExample: null,
        rolesArr: data,
        teamAbout: "",
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

        const rolesList = this.state.rolesArr.map((role) =>
            <button className='pickRoleContainer' key={role.id}>
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