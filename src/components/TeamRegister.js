import React, {Component} from 'react';
import plusProfileAvatar from '../../public/image/plusRoles.png'
import HelloPart from "./External/HelloPart";

class TeamRegister extends Component {
    state = {
        teamName: "",
        image: null,
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });
        }
    };


    render() {

        return (
            <div className='justify-center mb-96'>
                <HelloPart/>

                <div className='mx-auto w-max '>
                    <button className="registerButton" type="submit">
                        Создайте свою команду
                    </button>
                </div>

                <div className='mt-16 mx-8'>
                    <div className='mb-14'>
                        <h1 className='text-4xl font-light mb-4'>
                            Введите название вашей команды
                        </h1>
                        <input
                            className='teamNameInput text-5xl leading-10 font-light w-1/2'
                            type='text'
                            value={this.state.teamName}
                            onChange={(e) => this.setState({teamName:e.target.value})}/>
                    </div>

                    <div className='flex mb-4'>
                        <h1 className='text-4xl font-light'>
                            Добавить фотографию профиля команды
                        </h1>
                        <div className='plusProfileAvatar h-fit'>
                            <input
                                className='absolute avatarInput w-6 opacity-0'
                                type="file"
                                name="myImage"
                                onChange={this.onImageChange} />
                            <img className='' src={plusProfileAvatar}/>
                        </div>
                    </div>
                    <img src={this.state.image} />
                </div>

            </div>
        );
    }
}

export default TeamRegister;