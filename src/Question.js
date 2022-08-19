import React from 'react';
import './Question.css';
import { decode } from 'html-entities';
import { nanoid } from 'nanoid'

export const Question = (props) => {

    let randomIndex = Math.floor(Math.random() * props.data.incorrect_answers.length);
    let options = [...props.data.incorrect_answers]
    options.splice(randomIndex, 0, props.data.correct_answer);
    
    const optionElements = options.map(option => <li key={nanoid()} className='question-option'>{decode(option)}</li>)
    
    return (
        <div className='question-container'>
            <h3 className='question-question'>{decode(props.data.question)}</h3>
            <ul className='question-option-list'>
                {optionElements}
            </ul>
            <hr></hr>

        </div>
    )
}
