import React from 'react';
import colage from "../../../public/image/colage.png";

const HelloPart = () => {
    return (
        <div>
            <div className='FirstPage flex flex-column justify-center px-10 text-5xl'>
                <h1>Наш веб-сервис позволит студентам легко искать себе
                    команду для создания проекта.
                    Создайте свой профиль, указывайте свои достижения
                    и находите команду по душе!
                </h1>
            </div>

            <div className='colage'>
                <img src={colage}  alt=''/>
            </div>
        </div>
    );
};

export default HelloPart;