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
                <select
                    onChange={props.handleOnChange}
                    name="number-of-questions">
                        <option value={"5"}>5</option>
                        <option value={"10"}>10</option>
                </select>
                <select
                    onChange={props.handleOnChange}
                    name="difficulty">
                        <option value={"easy"}>Easy</option>
                        <option value={"medium"}>Medium</option>
                        <option value={"hard"}>Hard</option>
                </select>
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
