import React, {Component} from 'react';
import colage from '../../public/image/colage.png';
import HelloPart from "./External/HelloPart";

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