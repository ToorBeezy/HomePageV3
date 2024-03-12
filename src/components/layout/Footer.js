import React, {Component} from 'react';
import mapIcon from '/public/image/footer_map_icon.png';
import mailIcon from '/public/image/footer_mail_icon.png';
import instIcon from '/public/image/footer_instagram_icon.png';


class Footer extends Component {
    state = {
        name: "",
    }

    render() {
        return (
            <footer className='footer'>
                <div className='footer_container'>
                    <div className='text-center justify-center text-white text-3xl p-14'>
                        <div className='footer_logo cursor-default p-7'>
                            MUAI
                        </div>

                        <div className='p-7'>
                            <ul className="footer_nav_menu flex font-light w-full justify-center items-center gap-20">
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
                        </div>

                        <div className='footer_contacts p-7 pb-0'>
                            <ul className="flex font-light w-full justify-center items-center cursor-default gap-20">
                                <li>
                                    <div className='flex items-center'>
                                        <img src={mapIcon} className='pr-3 h-full' alt=''/>
                                        <p>Java, Indonesia</p>
                                    </div>
                                </li>
                                <li>
                                    <div className='flex items-center'>
                                        <img src={mailIcon} className='pr-3 h-full' alt=''/>
                                        <p>Yourmail@mail.com</p>
                                    </div>
                                </li>

                                <li>
                                    <div className='flex items-center'>
                                        <img src={instIcon} className='pr-3 h-full' alt=''/>
                                        <p>Your Instagram</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="hr-line"/>

                    <div className='footer_subscribe mt-14 p-24 flex items-center justify-between'>
                        <div className='text-5xl text-white'>
                            <p>Join to get free updates every week.</p>
                        </div>

                        <div className='footer_email_container h-full flex justify-between items-center'>
                            <div className='pr-3 w-full'>
                                <input
                                    className='footer_email_input py-3 w-full text-5xl text-white'
                                    type='text'
                                    placeholder="Email Address"
                                    value={this.state.name}
                                    onChange={(e) => this.setState({name:e.target.value})}/>
                            </div>

                            <button className='footer_subscribe_button text-white text-2xl'>
                                <p className='px-8 cursor-pointer hover:scale-105'>
                                    Subscribe
                                </p>
                            </button>

                        </div>
                    </div>

                    <div className='footer_rights text-white flex justify-between pt-14 pb-24 text-2xl'>
                        <div>
                            <p>©2023 MUAI</p>
                        </div>

                        <div>
                            <p>All Rights Reserved</p>
                        </div>

                        <div className='cursor-pointer'>
                            <a>Privacy Policy | Terms Of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;