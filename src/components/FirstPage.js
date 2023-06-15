import React, {Component} from 'react';
import HelloPart from "./External/HelloPart";
import {Link} from "react-router-dom";

class FirstPage extends Component {
    render() {
        return (
            <div className='justify-center mb-44'>
                <HelloPart/>
                <div className='comingText text-6xl font-light pt-12'>
                    <h1>Присоединяйся к нам!</h1>
                </div>
                <div className='logIn'>
                    <ul className="ulLogin hidden lg:flex flex-column items-center z-10 pr-10">
                        <Link className='ulLoginButton' to='/register'>
                            <a>РЕГИСТРАЦИЯ</a>
                        </Link>

                        <Link className='ulLoginButton' to='/login'>
                            <a>ВХОД</a>
                        </Link>
                    </ul>
                </div>
            </div>

        );
    }
}

export default FirstPage;