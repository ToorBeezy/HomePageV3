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
import axios from "axios";
import Popup from "reactjs-popup";
import _ from 'lodash'

class TeamRegister extends Component {
    state = {
        teamName: "",
        worksExampleArr: [],
        worksExampleArrForReact: [],
        teamMembersArr: [],
        workExample: null,
        rolesArr: [],
        rolesArrForReact: [],
        teamAbout: "",
        dropdownState: false,
        users: [],
        loading: true,
        usersForTeamMembersByLogin: [],
        loadingById: false,
        tg: "",
        vk: "",
        profileAvatarAs64: "",
        findUserByLogin: "",
        arrForUsersId: [],
        idTeam: "",
    }

    CheckRolesByNumber = (number) => {
        if(number === 1) return "гейм-дизайнер"
        else if(number === 2) return "разработчик"
        else if(number === 3) return "дизайнер"
        else if(number === 4) return "тимлид"
        else if(number === 5) return "аналитик"
    }

    getUserDataByLogin = (login) => {
        let userData;
        const tempForUsersId = [...this.state.arrForUsersId];
        const temp = [...this.state.usersForTeamMembersByLogin];
        const url = 'http://localhost:8000/usernames/' + `${login}`
        axios.get(url)
            .then(res => {
                userData = res.data
                if(userData.id !== null)
                    if(!(temp.some(e => _.isEqual(e, userData)))){
                        temp.push(userData);
                        tempForUsersId.push(userData.id)
                    }
                this.setState({
                    usersForTeamMembersByLogin: temp,
                    arrForUsersId: tempForUsersId
                });
            })
            .catch(err => console.log(err))
    }

    encodeImageFileAsURL = (element) => {
        let reader = new FileReader();
        reader.readAsDataURL(element)
        reader.onloadend = () => {
            this.setState({
                profileAvatarAs64: reader.result.split(',')[1]
            })
        }
    }

    addImagesToWorkExamples = (id) => {
        this.setState({
            idTeam: id
        })
        this.state.worksExampleArr.forEach((image) => {
            axios.post('http://localhost:8000/teamimages/', {
                image: image,
                team: id
            })
                .catch((err) => {
                    console.log(err)
                })
        })
    }

    handleSubmit = () => {
        axios.post("http://localhost:8000/teams/", {
            image: this.state.profileAvatarAs64,
            title: this.state.teamName,
            about: this.state.teamAbout,
            isFind: true,
            vk: this.state.vk,
            telegram: this.state.tg ,
            groups: this.state.rolesArr,
            participants: this.state.arrForUsersId
        }).then(res => {
            this.addImagesToWorkExamples(res.data.id)
        }).catch((err) => {
            console.log(err)
        })
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
        const tempForReact = temp.map((e) => this.CheckRolesByNumber(e))
        this.setState({
            rolesArr: temp,
            rolesArrForReact: tempForReact
        })
    }

    auto_grow = (element) => {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    onImageChange = event => {
        let img = event.target.files[0];
        this.encodeImageFileAsURL(img)
    };

    addRole = (name) => {
        const tempForReact = [...this.state.rolesArrForReact]
        const temp = [...this.state.rolesArr]
        let role;
        if((name === "гейм-дизайнер") && (!temp.some(e => e === 1)))
            role = 1

        else if((name === "разработчик") && (!temp.some(e => e === 2)))
            role = 2

        else if((name === "дизайнер") && (!temp.some(e => e === 3)))
            role = 3

        else if((name === "тимлид") && (!temp.some(e => e === 4)))
            role = 4

        else if((name === "аналитик") && (!temp.some(e => e === 5)))
            role = 5

        else{
            return
        }
        tempForReact.push(this.CheckRolesByNumber(role))


        temp.push(role);
        this.setState({
            rolesArr: temp,
            rolesArrForReact: tempForReact

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

    encodeImageFilesArrAsUrlForWorksExamples = (element) => {
        const temp = [...this.state.worksExampleArr]
        let reader = new FileReader();
        reader.readAsDataURL(element)
        reader.onloadend = () => {
            temp.push(reader.result.split(',')[1])
            this.setState({
                worksExampleArr: temp
            })
        }
    }


    addImageToWorksExampleArr = event => {
        const tempImg = event.target.files[0]
        const temp = [...this.state.worksExampleArrForReact]
        temp.push({src: URL.createObjectURL(tempImg)})
        this.setState({
            worksExampleArrForReact: temp
        })
        this.encodeImageFilesArrAsUrlForWorksExamples(tempImg)
    }

    render() {
        const rolesList = this.state.rolesArrForReact.map((role, pos) =>
            <button type='button' onClick={() => this.deleteRole(pos)} className='roleContainer' key={pos}>
                {role}
            </button>);

        const teamMembersList = this.state.usersForTeamMembersByLogin.map((user) => {
            const roles = user.additional_info.groups.map(e => this.CheckRolesByNumber(e))

            return(
                <UserMinimalisticProfile
                    key={user.id}
                    name={user.additional_info.name}
                    about={user.additional_info.about}
                    rolesArr={roles}
                    avatar={user.additional_info.image}/>
            );
        })


        return (
            <div>
                {this.state.loading &&
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
                                        accept="image/png, image/jpeg"
                                        onChange={this.onImageChange} />
                                    <img src={plusProfileAvatar}/>
                                </div>
                            </div>
                            {this.state.profileAvatarAs64.length > 1 &&
                                <img src={`data:image/jpeg;base64,${this.state.profileAvatarAs64}`}/>}
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
                                    <div className='dropdown z-50'>
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

                        {this.state.worksExampleArrForReact.length > 0 && <Slider Arr = {this.state.worksExampleArrForReact}/>}

                        <div className='flex mb-16 ml-12'>
                            <h1 className='text-4xl font-light'>
                                Добавить участников команды
                            </h1>

                            <div className='plusProfileAvatar h-fit'>
                                <Popup
                                    trigger={
                                    <button>
                                        <img src={plusProfileAvatar}/>
                                    </button>}
                                    position="right center">
                                    <div>
                                        <div>
                                            <h1 className='text-4xl cursor-default font-light'>
                                                Введите логин участника:
                                            </h1>
                                        </div>

                                        <div className='flex'>
                                            <input
                                                type='text'
                                                className='teamRegister_findUserByLoginInput text-3xl font-light'
                                                value={this.state.findUserByLogin}
                                                onChange={(e) => this.setState({findUserByLogin:e.target.value})}
                                            />
                                            <button
                                                className='teamRegister_findUserByLoginButton p-1 ml-2 text-3xl font-light'
                                                onClick={() => this.getUserDataByLogin(this.state.findUserByLogin)}>
                                                Добавить
                                            </button>
                                        </div>
                                    </div>
                                </Popup>
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
                            <button className='register_okButton' onClick={() => this.handleSubmit()}>
                                <Link to={`/team/${this.state.idTeam}`}>
                                    ГОТОВО
                                </Link>
                            </button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default TeamRegister;