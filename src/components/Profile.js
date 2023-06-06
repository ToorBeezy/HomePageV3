import React from 'react';
import wmnPic from '../../public/image/image 6.png'
import manPic from '../../public/image/image 5.png'
import avatar from '../../public/image/Ellipse 1.png'

const Profile = () => {
    return (
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
                <button className='buttonRedact'>Редактировать профиль</button>
            </div>

            <div className='text-center flex justify-between mx-auto mb-12'>
                <div className='profileName text-5xl font-light text-left ml-auto mr-24'>
                    <h1>Kurochkina Darya Nikolaevna</h1>
                </div>
                <div className='roles justify-left flex mx-auto'>
                    <div>
                        <a>
                            Дизайнер
                        </a>
                    </div>

                    <div>
                        <a>
                            Разработчик
                        </a>
                    </div>

                    <div>
                        <a>
                            Гейм-дизайнер
                        </a>
                    </div>

                    <div>
                        <a>
                            Тимлид
                        </a>
                    </div>
                </div>
            </div>
            <div className='text-center flex justify-left ml-12'>
                <div className='text-5xl font-light text-left'>
                    <h1>
                        Обо мне:
                    </h1>
                </div>
                <div>
                    <h2>

                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Profile;