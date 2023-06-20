import React, {Component} from 'react';
import colage from "../../public/image/colage.png";
import character from "../../public/image/character_man.png"
import arrow from "../../public/image/Vector.svg"
import plusRoles from "../../public/image/plusRoles.png";
import UserMinimalisticProfile from "./External/UserMinimalisticProfile";
import axios from "axios";

class Finder extends Component {
    state = {
        teamFinderFlag: false,
        userFinderFlag: false,
        dropdownState: false,
        teamRolesArr: [],
        rolesArrForTeamReact: [],
        userRolesArr: [],
        rolesArrForUsersReact: [],
        loading: false,
        users: [],
        teams: [],
    }

    componentDidMount() {
        let userData;
        let teamData;
        axios.get('http://localhost:8000/users/')
            .then(res => {
                userData = res.data
                this.setState({
                    users: userData
                });
            })
            .catch(err => console.log(err))
            .then(() => {
                axios.get('http://localhost:8000/teams/')
                    .then(res => {
                        teamData = res.data
                        this.setState({
                            teams: teamData
                        });
                    })
                    .catch(err => console.log(err))
            })
            .finally(() => {
                this.setState({
                    loading: true
                });
            })
    }

    CheckRolesByNumber = (number) => {
        if(number === 1) return "гейм-дизайнер"
        else if(number === 2) return "разработчик"
        else if(number === 3) return "дизайнер"
        else if(number === 4) return "тимлид"
        else if(number === 5) return "аналитик"
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
        const tempForReact = temp.map((e) => this.CheckRolesByNumber(e))
        this.setState({
            teamRolesArr: temp,
            rolesArrForTeamReact: tempForReact
        })
    }

    userDeleteRole = (pos) => {
        const temp = [...this.state.userRolesArr];
        temp.splice(pos, 1)
        const tempForReact = temp.map((e) => this.CheckRolesByNumber(e))
        this.setState({
            userRolesArr: temp,
            rolesArrForUsersReact: tempForReact
        })
    }

    addTeamRole = (name) => {
        const tempForReact = [...this.state.rolesArrForTeamReact]
        const temp = [...this.state.teamRolesArr]
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
            teamRolesArr: temp,
            rolesArrForTeamReact: tempForReact
        })
    }

    addUserRole = (name) => {
        const tempForReact = [...this.state.rolesArrForUsersReact]
        const temp = [...this.state.userRolesArr]
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
            userRolesArr: temp,
            rolesArrForUsersReact: tempForReact
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

        const teamRolesList = this.state.rolesArrForTeamReact.map((role, pos) =>
            <button onClick={() => this.teamDeleteRole(pos)} className='roleContainer' key={pos}>
                {role}
            </button>);

        const userRolesList = this.state.rolesArrForUsersReact.map((role, pos) =>
            <button onClick={() => this.userDeleteRole(pos)} className='roleContainer' key={pos}>
                {role}
            </button>);

        const teamsExamples = this.state.teams.map((team) => {
            const roles = team.groups.map(e => this.CheckRolesByNumber(e))
            return(
                this.checkIfAnyElementInArr(this.state.teamRolesArr, team.groups) &&

                <UserMinimalisticProfile
                    key={team.id}
                    Link={`http://localhost:3000/team/${team.id}/`}
                    name={team.title}
                    about={team.about}
                    ifFind={team.isFind}
                    avatar={team.image}
                    rolesArr={roles}/>
            )
            }
        );

        const usersExamples = this.state.users.map((user) => {
            const roles = user.additional_info.groups.map(e => this.CheckRolesByNumber(e))

            return(
                this.checkIfAnyElementInArr(this.state.userRolesArr, user.additional_info.groups) &&

                <UserMinimalisticProfile
                    key={user.id}
                    Link={`http://localhost:3000/user/${user.username}/`}
                    name={user.additional_info.name}
                    about={user.additional_info.about}
                    avatar={user.additional_info.image}
                    rolesArr={roles}/>
                )
            }
        );



        return (
            <div>
                    <div className=''>
                        <div className='colage'>
                            <img className='w-full' src={colage} alt=''/>
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
                                            <button className='ml-5 mt-2' onBlur={this.hide}
                                                    onClick={this.handleDropdownClick}>
                                                <img src={plusRoles}/>
                                            </button>}
                                    </div>

                                    <div className='roles juswtify-left flex mx-auto mb-10'>
                                        {teamRolesList}
                                        {this.state.dropdownState && (
                                            <div className='dropdown z-50'>
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
                                            <button className='ml-5 mt-2' onBlur={this.hide}
                                                    onClick={this.handleDropdownClick}>
                                                <img src={plusRoles}/>
                                            </button>}
                                    </div>

                                    <div className='roles juswtify-left flex mx-auto mb-10'>
                                        {userRolesList}
                                        {this.state.dropdownState && (
                                            <div className='dropdown z-50'>
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
            </div>

        );
    }
}

export default Finder;