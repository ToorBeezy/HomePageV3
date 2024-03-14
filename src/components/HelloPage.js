import React, {Component} from 'react';
import firstPoster from '/public/image/right_container_first_image.jpeg'
import secondPoster from '/public/image/right_container_second_image.jpeg'

class HelloPage extends Component {
    state= {
        name: "",
    }

    render() {
        return (
            <div className='justify-center'>
                <div className='container__ flex'>
                    <div className='hello_page_left_container p-3 w-1/2'>
                        <div className='hello_page_left_container_text_container pb-12'>
                            <div className='text-6xl text-black pb-12 tracking-wider leading-normal'>
                                <p>
                                    Simplify your work
                                    with AI tool
                                </p>
                            </div>

                            <div className='text-2xl tracking-wider text-gray-400 leading-normal'>
                                <p>
                                    Unleash the power of AI within Brainwave. Upgrade your productivity with Brainwave, the open AI chat app.
                                </p>
                            </div>
                        </div>

                        <div className='hello_page_left_container_buttons_container flex gap-8'>
                            <button className='text-white'>
                                <p className='hover:scale-105 cursor-pointer text-xl'>
                                    Get Started Free
                                </p>
                            </button>

                            <button className='bg-white'>
                                <p className='hover:scale-105 cursor-pointer text-xl'>
                                    EXplore
                                </p>
                            </button>
                        </div>

                        <div className='hello_page_left_container_subscribe_container'>
                            <div className='hello_page_left_container_subscribe_container_subscribe mt-10 p-16 items-center justify-between'>
                                <div className='text-5xl text-white pb-24'>
                                    <p>Join to get free updates every week.</p>
                                </div>

                                <div className='hello_page_left_container_email_container flex justify-between items-center'>
                                    <div className='pr-3 w-full'>
                                        <input
                                            className='footer_email_input py-3 w-full text-3xl text-white cursor-default'
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
                        </div>
                    </div>

                    <div className='hello_page_absolute_number absolute text-7xl text-center bg-black text-white'>
                        <p>01</p>
                    </div>

                    <div className='w-1/2'>
                        <div className='flex'>
                            <div className='pr-4 text-white'>
                                <div className='hello_page_right_container_top_container mb-3'>
                                    <p className='text-7xl pb-2'>
                                        200+
                                    </p>

                                    <p className='text-2xl'>
                                        User
                                    </p>
                                </div>

                                <div className='hello_page_right_container_bottom_container'>
                                    <p className='text-5xl pb-2 whitespace-nowrap'>
                                        Trend AI
                                    </p>

                                    <p className='text-2xl'>
                                        1 Rank
                                    </p>
                                </div>
                            </div>

                            <div className='hello_page_right_container_first_poster'>
                                <img src={firstPoster} alt=''/>
                            </div>
                        </div>

                        <div className='hello_page_right_container_second_poster pt-8'>
                            <img src={secondPoster} alt=''/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default HelloPage;