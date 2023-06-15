import React, {Component} from 'react';
import colage from "../../public/image/colage.png";
import character from "../../public/image/character_man.png"
import arrow from "../../public/image/Vector.svg"
import {data} from "../Shared/ProfileRoles";
import plusRoles from "../../public/image/plusRoles.png";
import UserMinimalisticProfile from "./External/UserMinimalisticProfile";
import {teamsExample} from "../Shared/teamsExample";

class Finder extends Component {
    state = {
        teamFinderFlag: false,
        userFinderFlag: false,
        dropdownState: false,
        teamRolesArr: data,
        userRolesArr: data,
    }

    checkIfAnyElementInArr = (arr1, arr2) => {
        return arr1.some(r => arr2.includes(r));
    };


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

    teamDeleteRole = (pos) => {
        const temp = [...this.state.teamRolesArr];
        temp.splice(pos, 1)
        this.setState({
            teamRolesArr: temp
        })
    }

    userDeleteRole = (pos) => {
        const temp = [...this.state.userRolesArr];
        temp.splice(pos, 1)
        this.setState({
            userRolesArr: temp
        })
    }

    addTeamRole = (name) => {
        const temp = [...this.state.teamRolesArr]
        let role;
        if((name === "гейм-дизайнер") && (!temp.some(e => e.name === "гейм-дизайнер")))
            role = {
                id: this.state.teamRolesArr.length + 1,
                name: "гейм-дизайнер"
            }
        else if((name === "разработчик") && (!temp.some(e => e.name === "разработчик")))
            role = {
                id: this.state.teamRolesArr.length + 1,
                name: "разработчик"
            }
        else if((name === "дизайнер") && (!temp.some(e => e.name === "дизайнер")))
            role = {
                id: this.state.teamRolesArr.length + 1,
                name: "дизайнер"
            }
        else if((name === "тимлид") && (!temp.some(e => e.name === "тимлид")))
            role = {
                id: this.state.teamRolesArr.length + 1,
                name: "тимлид"
            }
        else if((name === "аналитик") && (!temp.some(e => e.name === "аналитик")))
            role = {
                id: this.state.teamRolesArr.length + 1,
                name: "аналитик"
            }
        else{
            return
        }

        temp.push(role);
        this.setState({
            teamRolesArr: temp
        })
    }

    addUserRole = (name) => {
        const temp = [...this.state.userRolesArr]
        let role;
        if((name === "гейм-дизайнер") && (!temp.some(e => e.name === "гейм-дизайнер")))
            role = {
                id: this.state.userRolesArr.length + 1,
                name: "гейм-дизайнер"
            }
        else if((name === "разработчик") && (!temp.some(e => e.name === "разработчик")))
            role = {
                id: this.state.userRolesArr.length + 1,
                name: "разработчик"
            }
        else if((name === "дизайнер") && (!temp.some(e => e.name === "дизайнер")))
            role = {
                id: this.state.userRolesArr.length + 1,
                name: "дизайнер"
            }
        else if((name === "тимлид") && (!temp.some(e => e.name === "тимлид")))
            role = {
                id: this.state.userRolesArr.length + 1,
                name: "тимлид"
            }
        else if((name === "аналитик") && (!temp.some(e => e.name === "аналитик")))
            role = {
                id: this.state.userRolesArr.length + 1,
                name: "аналитик"
            }
        else{
            return
        }

        temp.push(role);
        this.setState({
            userRolesArr: temp
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

        const teamRolesList = this.state.teamRolesArr.map((role, pos) =>
            <button onClick={() => this.teamDeleteRole(pos)} className='roleContainer' key={role.id}>
                {role.name}
            </button>);

        const userRolesList = this.state.userRolesArr.map((role, pos) =>
            <button onClick={() => this.userDeleteRole(pos)} className='roleContainer' key={role.id}>
                {role.name}
            </button>);

        const teamsExamples = teamsExample.map((team) => {
            const namesOfTeam = team.roles.map(teamRole => teamRole.name);
            const namesOfTemp = this.state.teamRolesArr.map(teamRole => teamRole.name);

            return(
                this.checkIfAnyElementInArr(namesOfTemp, namesOfTeam) &&

                <UserMinimalisticProfile
                    key={team.id}
                    name={team.name}
                    about={team.about}
                    rolesArr={team.roles}
                    ifFind={team.ifFind}/>
            )
            }
        );

        const usersExamples = teamsExample.map((user) => {
                const namesOfTeam = user.roles.map(teamRole => teamRole.name);
                const namesOfTemp = this.state.userRolesArr.map(userRole => userRole.name);

                return(
                    this.checkIfAnyElementInArr(namesOfTemp, namesOfTeam) &&

                    <UserMinimalisticProfile
                        key={user.id}
                        name={user.name}
                        about={user.about}
                        rolesArr={user.roles}/>
                )
            }
        );



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
                        <div className='flex flex-col text-center mb-96'>
                            <div className='flex'>
                                <button
                                    onClick={() => {
                                        this.setState(state => {
                                            return {
                                                teamFinderFlag: false
                                            }
                                        })
                                    }}
                                    className='teamFinder_backArrow'>

                                    <img src={arrow}/>
                                </button>

                                <div className='teamFinderText font-light mx-auto mb-12'>
                                    <h1>
                                        Поиск команды
                                    </h1>
                                </div>
                            </div>

                            <div className='text-4xl flex mx-auto text-center font-light mb-6'>
                                <h1>
                                    Укажите, какие у вас роли
                                </h1>
                                {this.state.teamRolesArr.length < 5 &&
                                    <button className='ml-5 mt-2' onBlur={this.hide} onClick={this.handleDropdownClick}>
                                        <img src={plusRoles}/>
                                    </button>}
                            </div>

                            <div className='roles juswtify-left flex mx-auto mb-10'>
                                {teamRolesList}
                                {this.state.dropdownState && (
                                    <div className='dropdown'>
                                        <ul className='roleContainer_list absolute top-0'>
                                            <button onClick={() => this.addTeamRole("гейм-дизайнер")}
                                                    className='role_list w-full'>гейм-дизайнер
                                            </button>
                                            <button onClick={() => this.addTeamRole("разработчик")}
                                                    className='role_list w-full'>разработчик
                                            </button>
                                            <button onClick={() => this.addTeamRole("дизайнер")}
                                                    className='role_list w-full'>дизайнер
                                            </button>
                                            <button onClick={() => this.addTeamRole("тимлид")}
                                                    className='role_list w-full'>тимлид
                                            </button>
                                            <button onClick={() => this.addTeamRole("аналитик")}
                                                    className='role_list w-full'>аналитик
                                            </button>
                                        </ul>
                                    </div>
                                )}

                            </div>

                            <div>
                                {teamsExamples}
                            </div>
                        </div>
                    </div>}

                {this.state.userFinderFlag &&
                    <div>
                        <div className='flex flex-col text-center mb-96'>
                            <div className='flex'>
                                <button
                                    onClick={() => {
                                        this.setState(state => {
                                            return {
                                                userFinderFlag: false
                                            }
                                        })
                                    }}
                                    className='teamFinder_backArrow'>
                                    <img src={arrow}/>

                                </button>

                                <div className='teamFinderText font-light mx-auto mb-12'>
                                    <h1>
                                        Поиск пользователя
                                    </h1>
                                </div>
                            </div>

                            <div className='text-4xl flex mx-auto text-center font-light mb-6'>
                                <h1>
                                    Укажите, кого вы ищете
                                </h1>
                                {this.state.userRolesArr.length < 5 &&
                                    <button className='ml-5 mt-2' onBlur={this.hide} onClick={this.handleDropdownClick}>
                                        <img src={plusRoles}/>
                                    </button>}
                            </div>

                            <div className='roles juswtify-left flex mx-auto mb-10'>
                                {userRolesList}
                                {this.state.dropdownState && (
                                    <div className='dropdown'>
                                        <ul className='roleContainer_list absolute top-0'>
                                            <button onClick={() => this.addUserRole("гейм-дизайнер")}
                                                    className='role_list w-full'>гейм-дизайнер
                                            </button>
                                            <button onClick={() => this.addUserRole("разработчик")}
                                                    className='role_list w-full'>разработчик
                                            </button>
                                            <button onClick={() => this.addUserRole("дизайнер")}
                                                    className='role_list w-full'>дизайнер
                                            </button>
                                            <button onClick={() => this.addUserRole("тимлид")}
                                                    className='role_list w-full'>тимлид
                                            </button>
                                            <button onClick={() => this.addUserRole("аналитик")}
                                                    className='role_list w-full'>аналитик
                                            </button>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div>
                                {usersExamples}
                            </div>
                        </div>
                    </div>}


            </div>
        );
    }
}

export default Finder;