import React from 'react';
import wmnPic from '../../public/image/image 6.png'
import manPic from '../../public/image/image 5.png'
import avatar from '../../public/image/Ellipse 1.png'
import wrkExample from '../../public/image/RedGuy.png'
import VkIco from '../../public/image/Vector(1).png'
import TgIco from '../../public/image/TelegramIco.png'

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

            <div className='flex flex-col justify-left ml-12'>
                <div className='text-5xl font-light text-left'>
                    <h1>
                        Обо мне:
                    </h1>
                </div>

                <div className='ml-5 my-5 text-3xl w-5/6'>
                    <h2>
                        Я умею смеяться и веселиться<p/>
                        В прошлом семестре по предмету опд получила 97 баллов
                    </h2>
                </div>
            </div>

            <div className='flex flex-col justify-left ml-12 mb-5'>
                <h1 className='text-5xl font-light text-left'>Мои работы:</h1>
            </div>

            <div className='myWorks mb-20'>
                <div className='wrksContainer flex justify-center text-center m-auto'>
                    <div className='wrkExample'>
                        <img src={wrkExample}/>
                    </div>

                    <div className='wrkExample'>
                        <img src={wrkExample}/>
                    </div>

                    <div className='wrkExample'>
                        <img src={wrkExample}/>
                    </div>

                    <div className='wrkExample'>
                        <img src={wrkExample}/>
                    </div>

                </div>
            </div>

            <div className='flex kontakts align-items-lg-end w-1/3 m-auto'>
                <div className='text-5xl font-light mx-12'>
                    <h1>Контакты:</h1>
                </div>

                <div className='flex'>
                    <a className='mr-12' href='tg'>
                        <img src={TgIco}/>

                    </a>

                    <a href='vk'>
                        <img src={VkIco}/>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Profile;