import React, {Component, useState} from 'react';
import noAvatar from '../../../public/image/noAvatar.png'
import deleteUser from "../../../public/image/remove-user.png"
import deleteDone from "../../../public/image/checkmark.png"
import {Link} from "react-router-dom";

class UserMinimalisticProfile extends Component {
    state = {
        deleted: true
    }

    render() {
        let rolesList = this.props.rolesArr.map(role =>
            <div className='minProfile_roles cursor-default'>
                {role}
            </div>);

        return (
            <div className='minProfile m-8 mb-16 flex'>
                <div className='minProfile_avatarImg mr-20'>
                    <Link to={this.props.Link}>
                        {this.props.avatar.length > 1 &&
                            <img className='noAvatar' src={`data:image/jpeg;base64,${this.props.avatar}`}/>}
                        {this.props.avatar.length < 1 &&
                            <img className='noAvatar' src={noAvatar}/>}
                    </Link>
                </div>

                <div className='minProfile_infoContainer flex flex-col'>
                    <div className='minProfile_Name'>
                        <h1 className='text-4xl cursor-default font-light'>
                            {this.props.name}
                        </h1>
                    </div>

                    <div className='pt-4'>
                        <h1 className='minProfile_aboutText cursor-default text-3xl font-light'>
                            {this.props.about}
                        </h1>
                    </div>
                </div>

                <div className='flex flex-col'>
                    {this.props.ifFind &&
                        <h1 className='text-2xl pb-2 text-left pl-12 cursor-default'>Мы ищем:</h1>
                    }
                    <div className='flex ml-10 minProfile_rolesContainer'>
                        {rolesList}
                    </div>
                    {this.props.isDeletable &&
                        <div className='deleteUserButton flex ml-auto text-center'>
                            <button onClick={() => {this.props.deleteParticipantie(this.props.idUser); this.setState({deleted: !this.state.deleted})}}>
                                {this.state.deleted &&
                                    <img src={deleteUser}/>}
                                {!this.state.deleted &&
                                    <img src={deleteDone}/>}
                            </button>
                        </div>}
                </div>
            </div>
        );
    }
}

export default UserMinimalisticProfile;