import React, {Component} from 'react';
import colage from "../../public/image/colage.png";
import plusProfileAvatar from "../../public/image/plusRoles.png";
import UserMinimalisticProfile from "./External/UserMinimalisticProfile";
import TgIco from "../../public/image/TelegramIco.png";
import VkIco from "../../public/image/Vector(1).png";
import Slider from "./widgets/Slider/Slider";
import Editor from "../../public/image/Editor.png";
import plusRoles from "../../public/image/plusRoles.png";
import noAvatar from "../../public/image/noAvatar.png";
import axios from "axios";
import _ from "lodash";
import Popup from "reactjs-popup";

class TeamProfile extends Component {
    state = {
        flag: false,
        dropdownState: false,
        rolesArr: this.props.roles,
        rolesArrForReact: [],
        worksExampleArr: [],
        editTeamNameFlag: false,
        name: this.props.title,
        about: this.props.about,
        vk: this.props.vkLink,
        tg: this.props.tgLink,
        teamProfileAvatarAs64: this.props.avatar,
        arrForUsersId: this.props.participants,
        participanties: [],
        loading: false,
    }

    saveProfileChanges = () => {
        const url = 'http://localhost:8000/teams/' + `${this.props.id}` + '/'
        axios.patch(url, {
            title: this.state.name,
            about: this.state.about,
            vk: this.state.vk,
            telegram: this.state.tg,
            groups: this.state.rolesArr,
            participants: this.state.arrForUsersId
        })
            .catch((err) => console.log(err))
    }

    deleteParticipantie = (id) => {
        const temp = [...this.state.arrForUsersId]
        const index = temp.indexOf(id)
        temp.splice(index, 1)
        this.setState({
            arrForUsersId: temp
        })
    }

    componentDidMount() {
        const temp = this.state.rolesArr.map(e => this.CheckRolesByNumber(e))
        this.setState({
            rolesArrForReact: temp
        })
        this.fillParticipantsById(this.state.arrForUsersId)
        this.setState({
            loading: true
        })
    }

    fillParticipantsById = async (idArr) => {
        for (const id of idArr)
        {
            await new Promise(r => setTimeout(r, 400));
            const url = 'http://localhost:8000/users/' + `${id}`
            axios.get(url)
                .then(res => {
                    let userData = res.data
                    const tempForIdArr = [...this.state.arrForUsersId]
                    const temp = [...this.state.participanties];
                    if (!(temp.some(e => _.isEqual(e, userData))))
                        temp.push(userData);
                    this.setState({
                        participanties: temp,
                        arrForUsersId: tempForIdArr
                    });
                })
                .catch(err => console.log(err))
        }

    }

    getUserDataByLogin = (login) => {
        let userData;
        const tempForUsersId = [...this.state.arrForUsersId];
        const temp = [...this.state.participanties];
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
                    participanties: temp,
                    arrForUsersId: tempForUsersId
                });
            })
            .catch(err => console.log(err))
    }


    CheckRolesByNumber = (number) => {
        if(number === 1) return "гейм-дизайнер"
        else if(number === 2) return "разработчик"
        else if(number === 3) return "дизайнер"
        else if(number === 4) return "тимлид"
        else if(number === 5) return "аналитик"
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
        const tempForReact = temp.map((e) => this.CheckRolesByNumber(e))
        this.setState({
            rolesArr: temp,
            rolesArrForReact: tempForReact
        })
    }

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
        temp.push(role)

        tempForReact.push(this.CheckRolesByNumber(role));
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


    render() {

        {
            const rolesList = this.state.rolesArrForReact.map((role, pos) =>
                <button onClick={() => this.deleteRole(pos)} className='roleContainer' key={pos}>
                    {role}
                </button>);

            const teamMembersList = this.state.participanties.map((user) => {
                const roles = user.additional_info.groups.map(e => this.CheckRolesByNumber(e))

                return ( this.state.loading &&
                    <UserMinimalisticProfile
                        key={user.id}
                        Link={`http://localhost:3000/user/${user.username}/`}
                        idUser={user.id}
                        name={user.additional_info.name}
                        about={user.additional_info.about}
                        rolesArr={roles}
                        avatar={user.additional_info.image}
                        isDeletable={this.state.flag}
                        deleteParticipantie={this.deleteParticipantie}/>
                );
            })

            return (
                <div>
                    {this.state.flag &&
                        <div className='mb-44'>
                            <div className='colage'>
                                <img className='w-full' src={colage} alt=''/>
                            </div>

                            <div className='avatarDiv flex mt-12 mx-5 justify-center'>

                                <div className='text-center my-auto mx-24'>
                                    {this.state.teamProfileAvatarAs64.length > 1 &&
                                        <img src={`data:image/jpeg;base64,${this.state.teamProfileAvatarAs64}`}/>}
                                    {this.state.teamProfileAvatarAs64.length < 1 &&
                                        <img src={noAvatar}/>}
                                </div>

                            </div>

                            <div className='text-center redactProfile'>
                                <div className='flex flex-col w-2/6 text-center m-auto'>
                                    <button
                                        onClick={() => {this.switchRedactorMode();this.saveProfileChanges()}}
                                        className='buttonRedact'>
                                        Сохранить изменения
                                    </button>
                                </div>
                            </div>

                            <div className='profileName flex text-5xl font-light text-left mb-12 ml-12'>
                                {this.state.editTeamNameFlag &&
                                    <textarea
                                        className='nameInput'
                                        value={this.state.name}
                                        onInput={() => this.auto_grow(document.querySelector('.nameInput'))}
                                        onChange={(e) => this.setState({name: e.target.value})}/>}
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
                                    onChange={(e) => this.setState({about: e.target.value})}/>
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
                                    <div className='dropdown z-50'>
                                        <ul className='roleContainer_list absolute top-20 '>
                                            <button onClick={() => this.addRole("гейм-дизайнер")}
                                                    className='role_list w-full'>гейм-дизайнер
                                            </button>
                                            <button onClick={() => this.addRole("разработчик")}
                                                    className='role_list w-full'>разработчик
                                            </button>
                                            <button onClick={() => this.addRole("дизайнер")}
                                                    className='role_list w-full'>дизайнер
                                            </button>
                                            <button onClick={() => this.addRole("тимлид")}
                                                    className='role_list w-full'>тимлид
                                            </button>
                                            <button onClick={() => this.addRole("аналитик")}
                                                    className='role_list w-full'>аналитик
                                            </button>
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

                            <div className='flex mb-4 ml-12'>
                                <h1 className='text-4xl font-light'>
                                    Добавить фото примера работ
                                </h1>

                                <div className='plusProfileAvatar h-fit'>
                                    <input
                                        className='absolute cursor-pointer avatarInput w-6 opacity-0'
                                        type="file"
                                        name="myImage"
                                        onChange={this.addImageToWorksExampleArr}/>
                                    <img className='' src={plusProfileAvatar}/>
                                </div>
                            </div>

                            {this.state.worksExampleArr.length > 0 && <Slider Arr={this.state.worksExampleArr}/>}


                            <div className='linksEdit flex align-items-lg-end mt-20 w-1/3'>
                                <div className='text-5xl font-light mx-12 text-center mb-12'>
                                    <h1>Контакты:</h1>
                                </div>

                                <div className='flex flex-col'>
                                    <div className='mb-12 flex'>
                                        <a>
                                            <img className='mr-32' src={TgIco}/>
                                        </a>

                                        <input
                                            className='tgLink text-3xl font-light'
                                            placeholder='Вставьте ссылку'
                                            value={this.state.tg}
                                            onChange={(e) => this.setState({tg: e.target.value})}/>
                                    </div>

                                    <div className='flex'>
                                        <a>
                                            <img className='mr-32' src={VkIco}/>
                                        </a>

                                        <input
                                            className='tgLink text-3xl font-light'
                                            placeholder='Вставьте ссылку'
                                            value={this.state.vk}
                                            onChange={(e) => this.setState({vk: e.target.value})}/>
                                    </div>
                                </div>
                            </div>
                        </div>}

                    {!this.state.flag &&
                        <div className='mb-44'>
                            <div className='colage'>
                                <img className='w-full' src={colage} alt=''/>
                            </div>

                            <div className='avatarDiv flex mt-12 mx-5 justify-center'>

                                <div className='text-center my-auto mx-24'>
                                    {this.state.teamProfileAvatarAs64.length > 1 &&
                                        <img src={`data:image/jpeg;base64,${this.state.teamProfileAvatarAs64}`}/>}
                                    {this.state.teamProfileAvatarAs64.length < 1 &&
                                        <img src={noAvatar}/>}
                                </div>

                            </div>

                            <div className='text-center redactProfile'>
                                <button onClick={this.switchRedactorMode} className='buttonRedact'>Редактировать
                                    профиль
                                </button>
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

                            {this.state.worksExampleArr.length > 0 && <Slider Arr={this.state.worksExampleArr}/>}

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
}

export default TeamProfile;