import React from 'react';
import './Trivia.css';
import { Question } from './Question';

export const Trivia = (props) => {
    let styles = {
        color: props.answersChecked ? "rgba(41, 50, 100, 1)" : "inherit"
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
        <section className='trivia-page'>
            <div className='trivia-questions-container'>
                {questionElements}
            </div>
            <p 
                className='trivia-end-game-message'
                style={styles}
                >
                    {props.answersChecked? `You scored ${props.correctAnswerCount} / ${props.triviaData.length} answers correct` : ''}    
            </p>
            <div className='trivia-buttons-container'>
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
        </section>
    )
}
