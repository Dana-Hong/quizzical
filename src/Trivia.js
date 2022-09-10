import React from 'react';
import './Trivia.css';
import { Question } from './Question';
import yellow_blob from './yellow_blob.png';
import blue_blob from './blue_blob.png';

export const Trivia = (props) => {
    let styles = {
        color: props.answersChecked ? "rgba(41, 50, 100, 1)" : "white"
    }
    const questionElements = props.triviaData.map((questionData, index) => {
        return (
            <Question
                key={index}
                questionData={questionData}
                handleOptionSelect={props.handleOptionSelect}
                answersChecked={props.answersChecked}
            />)
    })

    return (
        <div className='trivia-page'>
            <img src={yellow_blob} className='yellow-blob' alt='yellow-blob' />
            <img src={blue_blob} className='blue-blob' alt='blue-blob' />
            <div className='trivia-questions-container'>
                {questionElements}
            </div>
            <div 
                className='trivia-end-game-message'
                style={styles}
                >
                    {`You scored ${props.correctAnswerCount} / ${props.triviaData.length} answers correct`}
            </div>
            <div className='trivia-button-container'>
                <button
                    className='trivia-check-answers-button'
                    onClick={props.handleCheckAnswers}
                    >
                        Check Answers
                </button>
                <button
                    className='trivia-back-to-main-button'
                    onClick={props.handleClick}
                    >
                        Back to Main Menu
                </button>
            </div>
        </div>
    )
}
