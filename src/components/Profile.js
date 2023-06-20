import React, {Component} from 'react';
import wmnPic from '../../public/image/image 6.png'
import manPic from '../../public/image/image 5.png'
import VkIco from '../../public/image/Vector(1).png'
import TgIco from '../../public/image/TelegramIco.png'
import Editor from '../../public/image/Editor.png';
import plusRoles from '../../public/image/plusRoles.png'
import Slider from "./widgets/Slider/Slider";
import plusProfileAvatar from "../../public/image/plusRoles.png";
import noAvatar from "../../public/image/noAvatar.png";
import axios from "axios";

class Profile extends Component {
    state = {
        flag: false,
        dropdownState: false,
        rolesArr: this.props.roles,
        worksExampleArr: [],
        worksExampleArrForReact: [],
        editNameFlag: false,
        name: this.props.username,
        about: this.props.about,
        vk: this.props.vkLink,
        tg: this.props.tgLink,
        profileAvatarAs64: this.props.avatar,
        rolesArrForReact: [],
        loading: false,
        newWorkImg: [],
        // worksExampleArrForImagesId: [],
    }

    urlToFile = async (url, filename, mimeType) => {
        const res = await fetch(url);
        const buf = await res.arrayBuffer();
        return new File([buf], filename, { type: mimeType });
    };

    componentDidMount() {
        const temp = this.state.rolesArr.map(e => this.CheckRolesByNumber(e))
        const tempForWorksReact = []
        this.setState({
            rolesArrForReact: temp
        })
        axios.get(`http://localhost:8000/userimages/${this.props.login}`)
            .then(res => {
                const userImagesData = res.data
                userImagesData.forEach(e =>
                    (async () => {
                        const file = await this.urlToFile(
                            `data:image/png;base64,${e.image}`,
                            "image.png",
                            "image/png"
                        );
                        // tempForWorkImagesId.push(e.id)
                        tempForWorksReact.push({src: URL.createObjectURL(file)})
                    })()
                )
            })
        this.setState({
            worksExampleArrForReact: tempForWorksReact,
            loading: true,
            // worksExampleArrForImagesId: tempForWorkImagesId
        })

    }



    CheckRolesByNumber = (number) => {
        if(number === 1) return "гейм-дизайнер"
        else if(number === 2) return "разработчик"
        else if(number === 3) return "дизайнер"
        else if(number === 4) return "тимлид"
        else if(number === 5) return "аналитик"
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

    onImageChange_register = event => {
        let img = event.target.files[0];
        this.encodeImageFileAsURL(img)
    };

    saveProfileChanges = () => {
        const url = 'http://localhost:8000/add_info/' + `${this.props.id}` + '/'
        axios.patch(url, {
            image: this.state.profileAvatarAs64,
            name: this.state.name,
            about: this.state.about,
            vk: this.state.vk,
            telegram: this.state.tg,
            user: this.props.id,
            groups: this.state.rolesArr
        })
            .catch((err) => console.log(err))
        this.state.newWorkImg.forEach(e => {
            axios.post(`http://localhost:8000/images/`, {
                image: e,
                owner: this.props.id
            })
        })
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

    encodeImageFilesArrAsUrlForWorksExamples = (element) => {
        const temp = [...this.state.worksExampleArr]
        const tempForNewImg = [...this.state.newWorkImg]
        let reader = new FileReader();
        reader.readAsDataURL(element)
        reader.onloadend = () => {
            temp.push(reader.result.split(',')[1])
            tempForNewImg.push(reader.result.split(',')[1])
            this.setState({
                newWorkImg: tempForNewImg,
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

        const rolesList = this.state.rolesArrForReact.map((role, pos) =>
            <button onClick={() => this.deleteRole(pos)} className='roleContainer' key={pos}>
                {role}
            </button>);


        return (

        <>
            {this.state.loading &&<div>
                {this.state.flag &&
                    <div className='profile pb-36'>
                        <div className='avatarDiv flex mt-16 mx-5 justify-center'>
                            <div>
                                <img src={wmnPic}/>
                            </div>

                            <input
                                className='absolute cursor-pointer avatarInput_ForProfiles w-6 opacity-0'
                                type="file"
                                name="myImage"
                                accept="image/png, image/jpeg"
                                onChange={this.onImageChange_register} />

                            <div className='text-center my-auto mx-24'>
                                {this.state.profileAvatarAs64.length > 1 &&
                                    <img className='noAvatar' src={`data:image/jpeg;base64,${this.state.profileAvatarAs64}`}/>}
                                {this.state.profileAvatarAs64.length < 1 &&
                                    <img className='noAvatar' src={noAvatar}/>}
                            </div>

                            <div>
                                <img src={manPic}/>
                            </div>
                        </div>

                        <div className='text-center redactProfile'>
                            <div className='flex flex-col w-2/6 text-center m-auto'>
                                <button onClick={() => {this.switchRedactorMode(); this.saveProfileChanges()}} className='buttonRedact'>Сохранить изменения</button>
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

                        {this.state.worksExampleArrForReact.length > 0 && <Slider Arr = {this.state.worksExampleArrForReact}/>}


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
                                {this.state.profileAvatarAs64.length > 1 &&
                                    <img className='noAvatar' src={`data:image/jpeg;base64,${this.state.profileAvatarAs64}`}/>}
                                {this.state.profileAvatarAs64.length < 1 &&
                                    <img className='noAvatar' src={noAvatar}/>}
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

                        {this.state.worksExampleArrForReact.length > 0 && <Slider Arr = {this.state.worksExampleArrForReact}/>}

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
            </div>}
        </>
        );
    }
};
export default Profile;