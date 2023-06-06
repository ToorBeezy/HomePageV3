import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import colage from "../../public/image/colage.png";

const LoginPage = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );

    const [userName, setUserName] = useState(localStorage.getItem('userName'));

    const [isAdmin, setIsAdmin] = useState(
        localStorage.getItem('userName') === 'admin'
    );
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLogIn = (e) => {
        e.preventDefault();

        if (login === 'admin') {
            if (password === '123456') setIsAdmin(true);
            else {
                alert('Введите правильный логин или пароль!');
                return false
            }
        }

        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userName', login);

        setUserName(login);
        setIsLoggedIn(true);
        navigate('/');

    }
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

            <form className="loginForm justify-center flex flex-column text-center" onSubmit={handleLogIn}>
                <div className='input pb-12'>
                    <input
                        className="loginFormInput"
                        type="text"
                        placeholder="Логин"
                        onChange={handleLoginChange}
                        value={login}
                        required
                    />
                </div>
                <div className='input'>
                    <input
                        className="loginFormInput"
                        type="password"
                        placeholder="Пароль"
                        onChange={handlePasswordChange}
                        value={password}
                        required
                    />
                </div>
                <div>
                    <button className="loginButton" type="submit">
                        Войти
                    </button>
                </div>
            </form>

        </div>
    );
};

export default LoginPage;