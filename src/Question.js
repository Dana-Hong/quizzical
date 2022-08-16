import React from 'react';
import './Question.css';

export const Question = () => {
    return (
        <div className='question-container'>
            <h3 className='question-question'>Which best selling tow of 1983 caused hysteria, resulting in riots breaking in stores?</h3>
            <ul className='question-option-list'>
                <li className='question-option'>Option 1</li>
                <li className='question-option'>Option 2</li>
                <li className='question-option'>Option 3</li>
                <li className='question-option'>Option 4</li>
            </ul>
            <hr></hr>

        </div>
    )
}
