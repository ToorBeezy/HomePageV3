import React from 'react';
import avatar from "../../../public/image/avatarExample.jpeg"

const UserMinimalisticProfile = ({name, about, rolesArr, ifFind = false}) => {

    let rolesList = rolesArr.map(role =>
        <div className='minProfile_roles cursor-default' key={role.id}>
            {role.name}
        </div>);

    return (
        <div className='m-8 mb-16 flex'>
            <div className='minProfile_avatar mr-20'>
                <a href='/id/123'>
                    <img className='minProfile_avatarImg' src={avatar}/>
                </a>
            </div>

            <div className='minProfile_infoContainer flex flex-col'>
                <div className='minProfile_Name'>
                    <h1 className='text-4xl cursor-default font-light'>
                        {name}
                    </h1>
                </div>

                <div className='pt-4'>
                    <h1 className='minProfile_aboutText cursor-default text-3xl font-light'>
                        {about}
                    </h1>
                </div>
            </div>

            <div className='flex flex-col'>
                {ifFind &&
                    <h1 className='text-2xl pb-2 text-left pl-12 cursor-default'>Мы ищем:</h1>
                }
                <div className='flex ml-10 minProfile_rolesContainer'>
                    {rolesList}
                </div>
            </div>


        </div>
    );
};

export default UserMinimalisticProfile;