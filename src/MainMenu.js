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
                    name="game-options">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
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
