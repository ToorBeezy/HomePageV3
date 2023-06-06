import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <header className="w-full top-0 lg:py-2 lg:px-3 p-0 z-50">
                <div className="container h-full max-w-full">
                    <nav className="flex justify-between">
                        <a className="logo mr-0" href="/">
                            <a className="lg:p-0 p-1.5 lg:pl-3 pl-5 z-40">
                                IntFolio
                            </a>
                        </a>

                        <ul className="menu-left hidden lg:flex items-center z-10 pr-10">
                            <li className='ml-0'>
                                <a href="/a1">
                                    <a>Мой профиль</a>
                                </a>
                            </li>
                            <li>
                                <a href="/a2">
                                    <a>Поиск</a>
                                </a>
                            </li>
                            <li className='mr-30'>
                                <a href="/a3">
                                    <a>Выход</a>
                                </a>
                            </li>
                        </ul>


                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;