import React from 'react';
import './MainMenu.css';
import yellow_blob from './yellow_blob.png';
import blue_blob from './blue_blob.png';

export const MainMenu = (props) => {
    return (
        <div className='main-menu'>
            <img src={yellow_blob} className='yellow-blob' alt='yellow-blob' />
            <img src={blue_blob} className='blue-blob' alt='blue-blob' />
            <div className='main-menu-content'>
                <h1>Quizzical</h1>
                <h4>An exciting trivia game!</h4>
                <div className='main-menu-options-container'>
                    <div className='main-menu-option'>
                        <h5 className='option-title'>Number of questions:</h5>
                        <input
                            className='option-select'
                            name='amount'
                            type='number'
                            min={1}
                            max={50}
                            placeholder='(Maximum of 50)'
                            onChange={props.handleOnChange}>
                        </input>
                    </div>
                    <div className='main-menu-option'>
                        <h5 className='option-title'>Category:</h5>
                        <select
                            className='option-select'
                            onChange={props.handleOnChange}
                            name='category'>
                                <option value='9'>General Knowledge</option>
                                <option value='10'>Entertainment: Books</option>
                                <option value='11'>Entertainment: Film</option>
                                <option value='12'>Entertainment: Music</option>
                                <option value='13'>Entertainment: Musicals Theatres</option>
                                <option value='14'>Entertainment: Television</option>
                                <option value='15'>Entertainment: Video Games</option>
                                <option value='16'>Entertainment: Board Games</option>
                                <option value='17'>Science: Nature</option>
                                <option value='18'>Science: Computers</option>
                                <option value='19'>Science: Mathematics</option>
                                <option value='20'>Mythology</option>
                                <option value='21'>Sports</option>
                                <option value='22'>Geography</option>
                                <option value='23'>History</option>
                                <option value='24'>Politics</option>
                                <option value='25'>Art</option>
                                <option value='26'>Celebrities</option>
                                <option value='27'>Animals</option>
                                <option value='28'>Vehicles</option>
                                <option value='29'>Entertainment: Comics</option>
                                <option value='30'>Science: Gadgets</option>
                                <option value='31'>Entertainment: Japanese Anime Manga</option>
                                <option value='32'>Entertainment: Cartoon Animations</option>
                        </select>
                    </div>
                    <div className='main-menu-option'>
                        <h5 className='option-title'>Difficulty:</h5>
                        <select
                            className='option-select'
                            onChange={props.handleOnChange}
                            name='difficulty'>
                                <option value={'easy'}>Easy</option>
                                <option value={'medium'}>Medium</option>
                                <option value={'hard'}>Hard</option>
                        </select>
                    </div>
                    <div className='main-menu-option'>
                        <h5 className='option-title'>Type:</h5>
                        <select
                        className='option-select'
                            onChange={props.handleOnChange}
                            name='type'>
                                <option value='any'>Any Type</option>
                                <option value='multiple'>Multiple Choice</option>
                                <option value='boolean'>True / False</option>
                        </select>
                    </div>
                </div>
                <button 
                    className='main-menu--start-button' 
                    onClick={props.handleClick}
                    >
                        Start quiz
                </button>
            </div>
        </div>
    )
}
