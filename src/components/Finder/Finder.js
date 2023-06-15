import React, {Component} from 'react';
import colage from "../../../public/image/colage.png";
import character from "../../../public/image/character_man.png"
import arrow from "../../../public/image/Vector.svg"
import {data} from "../../Shared/ProfileRoles";
import plusRoles from "../../../public/image/plusRoles.png";
import UserMinimalisticProfile from "../External/UserMinimalisticProfile";

class Finder extends Component {
    state = {
        teamFinderFlag: true,
        dropdownState: false,
        userFinderFlag: false,
        rolesArr: data,
        name: "Zakarev Alexey Vasilyevich",
        about: "Я умею смеяться и веселиться V прошлом семестре по предмету опд получила 97 баллов",

    }

    switchTeamFinderFlag = () => {
        this.setState(state => {
            return{
                teamFinderFlag: !state.teamFinderFlag
            }
        })
    };

    switchUserFinderFlag = () => {
        this.setState(state => {
            return{
                userFinderFlag: !state.userFinderFlag
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

    deleteRole = (pos) => {
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
            <div className=''>
                <div className='colage'>
                    <img className='w-full' src={colage}  alt=''/>
                </div>

                {!this.state.teamFinderFlag && !this.state.userFinderFlag &&
                    <div>
                        <div className='finderContainer m-2'>
                            <div className='finderMain flex flex-col text-center'>
                                <div className='finderText mx-auto mt-32 mb-12'>
                                    <h1>
                                        Кого вы хотите найти?
                                    </h1>
                                </div>

                                <div className='flex justify-center text-center gap-20'>
                                    <button
                                        className='chooseWhoFind flex-col flex justify-center'
                                        onClick={this.switchUserFinderFlag}>
                                        <h1 className='text-3xl font-light'>
                                            Участника
                                        </h1>

                                        <div className='pl-10'>
                                            <img className='chooseImg ' src={character}/>
                                        </div>
                                    </button>

                                    <button
                                        className='chooseWhoFind cursor-pointer flex-col flex justify-center'
                                        onClick={this.switchTeamFinderFlag}>
                                        <h1 className='cursor-default text-3xl font-light'>
                                            Команду
                                        </h1>

                                        <div className='pl-10'>
                                            <img className='chooseImg ' src={character}/>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {this.state.teamFinderFlag &&
                    <div>
                        <div className='flex flex-col text-center'>
                            <div className='flex'>
                                <button
                                    onClick={() => {
                                        this.setState(state => {
                                            return {
                                                teamFinderFlag: false
                                            }
                                        })
                                    }}
                                    className='teamFinder_backArrow'
                                >
                                    <img src={arrow}/>

                                </button>

                                <div className='teamFinderText font-light mx-auto mb-12'>
                                    <h1>
                                        Поиск команды
                                    </h1>
                                </div>
                            </div>

                            <div className='text-4xl font-light mb-6'>
                                <h1>
                                    Укажите, какие у вас роли
                                </h1>
                            </div>

                            <div className='roles juswtify-left flex mx-auto'>
                                {rolesList}
                                {this.state.dropdownState && (
                                    <div className='dropdown'>
                                        <ul className='roleContainer_list absolute top-20 right-0'>
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
                                {this.state.rolesArr.length < 5 &&
                                    <button onBlur={this.hide} onClick={this.handleDropdownClick}>
                                        <img src={plusRoles}/>
                                    </button>}
                            </div>

                            <div>
                                <UserMinimalisticProfile
                                    name={this.state.name}
                                    about={this.state.about}
                                    rolesArr={this.state.rolesArr}
                                    ifFind={true}/>
                                <UserMinimalisticProfile
                                    name={this.state.name}
                                    about={this.state.about}
                                    rolesArr={this.state.rolesArr}
                                    ifFind={true}/>
                                <UserMinimalisticProfile
                                    name={this.state.name}
                                    about={this.state.about}
                                    rolesArr={this.state.rolesArr}
                                    ifFind={true}/>
                            </div>
                        </div>
                    </div>}



            </div>
        );
    }
}

export default Finder;