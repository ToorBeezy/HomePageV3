import React, {Component} from 'react';
import colage from '../../public/image/colage.png';

class FirstPage extends Component {
    render() {
        return (
            <div className='justify-center mb-44'>
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
                <div className='comingText text-6xl font-light pt-12'>
                    <h1>Присоединяйся к нам!</h1>
                </div>
                <div className='logIn'>
                    <ul className="ulLogin hidden lg:flex flex-column items-center z-10 pr-10">
                        <button>
                            <a>РЕГИСТРАЦИЯ</a>
                        </button>

                        <button>
                            <a>ВХОД</a>
                        </button>
                    </ul>
                </div>
            </div>

        );
    }
}

export default FirstPage;