import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component {
    state = {
        checkIfUserLogged: true,
    }

    render() {
        return (
            <header className="w-full top-0 lg:py-2 lg:px-3 p-0 z-50">
                <div className="container h-full max-w-full">
                    <nav className="flex justify-between">
                        <Link className="logo mr-0" to="/">
                            <a className="lg:p-0 p-1.5 lg:pl-3 pl-5 z-40">
                                IntFolio
                            </a>
                        </Link>

                        <ul className="menu-left hidden lg:flex items-center z-10 pr-10">
                            <li className='ml-0'>
                                <Link to="/user">
                                    <a>Мой профиль</a>
                                </Link>
                            </li>
                            <li>
                                <Link to="/search">
                                    <a>Поиск</a>
                                </Link>
                            </li>
                            {this.state.checkIfUserLogged &&
                                <li>
                                    <Link to="/teamRegister">
                                        <a>Создать команду</a>
                                    </Link>
                                </li>}
                            <li className='mr-30'>
                                <Link to="/exit">
                                    <a>Выход</a>
                                </Link>
                            </li>
                        </ul>


                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;