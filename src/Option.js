import React from 'react';
import './Option.css';
import { decode } from 'html-entities';
import { nanoid } from 'nanoid';

export const Option = (props) => {
    let styles = {
        backgroundColor: ""
    }
    // let selectedColor = props.optionData.selected ? "#d6dbf5" : "inherit"
    // let correctColor = props.optionData.correct === false ? "#f8bcbc" : "#94d7a2"
    if (props.optionData.selected) {
        if (props.optionData.correct === true) {
            styles.backgroundColor = "#94d7a2";
        } else if (props.optionData.correct === false) {
            styles.backgroundColor = "#f8bcbc";
        } else if (props.optionData.correct === null) {
            styles.backgroundColor = "#d6dbf5";
        }
    } else if (props.optionData.correct) {
        console.log('hey')
        styles.backgroundColor = "#94d7a2";
    } else {
        styles.backgroundColor = "inherit";
    }
    return (
        <li 
            key={nanoid()}
            className='option'
            style={styles}
            onClick={(event) => props.handleOptionSelect(props.questionId, props.optionData.id, event)}
                >
                {decode(props.optionData.answer)}
        </li>
    )
}
