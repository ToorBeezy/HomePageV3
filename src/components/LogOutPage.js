import React, {Component} from 'react';
import {Link} from "react-router-dom";

class LogOutPage extends Component {

    render() {

        return (
            <div className='logOutPage h-screen flex flex-col text-center mx-auto'>
                <div className='my-16'>
                    <h1 className='text-5xl'>
                        Вы уверены, что хотите выйти?
                    </h1>
                </div>

                <div className='flex flex-col text-center mx-auto'>
                    <Link to='/' className="logOutButton" type="submit">
                        ДА
                    </Link>

                    <Link to='/' className="logOutButton" type="submit">
                        НЕТ
                    </Link>
                </div>
            </div>
        );
    }
}

export default LogOutPage;