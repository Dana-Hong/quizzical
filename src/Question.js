import React from 'react';
import './Question.css';
import { Option } from './Option';
import { decode } from 'html-entities';
import { nanoid } from 'nanoid';

export const Question = (props) => {
    let styles = {
        color: props.answersChecked && !props.questionData.questionAnswered ? "red" : "inherit"
    }
    const optionElements = props.questionData.potential_answers.map(option => {
        return (
            <Option
                key={nanoid()}
                handleOptionSelect={props.handleOptionSelect}
                optionData={option}
                questionId={props.questionData.questionId}
            />)
    })
    
    return (
        <div className='question-container'>
            <h3 
                className='question'
                style={styles}
                >
                    {`${decode(props.questionData.question)}`}
            </h3>
            <div className='question-option-list'>
                {optionElements}
            </div>

        </div>
    )
}
