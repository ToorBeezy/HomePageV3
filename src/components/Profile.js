import React, {Component} from 'react';
import wmnPic from '../../public/image/image 6.png'
import manPic from '../../public/image/image 5.png'
import avatar from '../../public/image/Ellipse 1.png'
import VkIco from '../../public/image/Vector(1).png'
import TgIco from '../../public/image/TelegramIco.png'
import Editor from '../../public/image/Editor.png';
import plusRoles from '../../public/image/plusRoles.png'
import Slider from "./widgets/Slider/Slider";
import plusProfileAvatar from "../../public/image/plusRoles.png";

class Profile extends Component {
    state = {
        flag: false,
        dropdownState: false,
        rolesArr: this.props.roles,
        worksExampleArr: [],
        editNameFlag: false,
        name: this.props.username,
        about: this.props.about,
        vk: this.props.vkLink,
        tg: this.props.tgLink,
    }

    switchNameRedactor = () => {
        this.setState(state => {
            return{
                editNameFlag: !state.editNameFlag
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

    handleDropdownClick = () =>{
        this.setState(state => {
            return{
                dropdownState: true
            }
        })
    }

    auto_grow = (element) => {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
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

    render() {

        const rolesList = this.state.rolesArr.map((role, pos) =>
            <button onClick={() => this.deleteRole(pos)} className='roleContainer' key={role.id}>
                {role.name}
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
                                <button onClick={this.switchRedactorMode} className='buttonRedact'>Сохранить изменения</button>
                            </div>
                        </div>

                        <div className='text-center flex justify-between mx-auto mb-12'>
                            <div className='profileName flex text-5xl font-light text-left ml-12'>
                                {this.state.editNameFlag &&
                                    <textarea
                                        className='nameInput'
                                        type='text'
                                        value={this.state.name}
                                        onInput={() => this.auto_grow(document.querySelector('.nameInput'))}
                                        onChange={(e) => this.setState({name:e.target.value})}/>}
                                {!this.state.editNameFlag && <h1 className='redactorOfName'>{this.state.name}</h1>}
                                <button onClick={this.switchNameRedactor}>
                                    <img className='max-w-fit' src={Editor}/>
                                </button>
                            </div>

                            <div className='roles juswtify-left flex mx-auto'>
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
                                    <button onBlur={this.hide} onClick={this.handleDropdownClick}>
                                        <img src={plusRoles}/>
                                    </button>}

                            </div>
                        </div>

                        <div className='flex flex-col justify-left ml-12'>
                            <div className='text-5xl font-light text-left'>
                                <h1>
                                    Обо мне:
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
                            <button onClick={this.switchRedactorMode} className='buttonRedact'>Редактировать профиль</button>
                        </div>

                        <div className='flex mb-12'>
                            <div className='profileName text-5xl font-light text-left ml-12'>
                                <h1>{this.state.name}</h1>
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
                                    {this.state.about}
                                </h2>
                            </div>
                        </div>

                        <div className='flex flex-col justify-left ml-12 mb-5'>
                            <h1 className='text-5xl font-light text-left'>Мои работы:</h1>
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
};
export default Profile;