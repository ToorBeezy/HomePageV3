import React, {Component} from 'react';

class Header extends Component {

    render() {
        return (
            <header>
                <div className="container__ min-h-fit max-w-full">
                    <nav className="flex justify-between items-center">
                        <button className="p-3 text-5xl mr-0">
                            <p className="header_logo-text">
                                MUAI
                            </p>
                        </button>

                        <ul className="lg:flex hidden w-full justify-center items-center header_nav_menu">
                            <li>
                                <button>
                                    <a>Home</a>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <a>Princing</a>
                                </button>
                            </li>

                            <li>
                                <button>
                                    <a>About</a>
                                </button>
                            </li>

                            <li>
                                <button>
                                    <a>Contact</a>
                                </button>
                            </li>
                        </ul>

                        <button className="header_get_started_button">
                            <p className="text-2xl p-1 text-white font-light whitespace-nowrap">
                                Get started
                            </p>
                        </button>
                    </nav>
                </div>
            </header>);
    }
}

export default Header;