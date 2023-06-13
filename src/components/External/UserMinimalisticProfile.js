import React from 'react';
import avatar from "../../../public/image/avatarExample.jpeg"

const UserMinimalisticProfile = ({name, about, rolesArr}) => {

    let rolesList = rolesArr.map(role =>
        <div className='minProfile_roles cursor-default' key={role.id}>
            {role.name}
        </div>);

    return (
        <div className='m-8 mb-16 flex'>
            <div className='minProfile_avatar pr-20'>
                <img className='minProfile_avatarImg' src={avatar}/>
            </div>

            <div className='minProfile_infoContainer flex flex-col'>
                <div className='minProfile_Name'>
                    <h1 className='text-4xl font-light'>
                        {name}
                    </h1>
                </div>

                <div className='pt-4'>
                    <h1 className='minProfile_aboutText text-3xl font-light'>
                        {about}
                    </h1>
                </div>
            </div>

            <div className='flex ml-10 minProfile_rolesContainer'>
                {rolesList}
            </div>
        </div>
    );
};

export default UserMinimalisticProfile;