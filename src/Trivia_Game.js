import React from "react";
import { MainMenu } from "./MainMenu";
import { Trivia } from "./Trivia";

export const Trivia_Game = () => {
    let [gameStart, setgameStart] = React.useState(false);
    let [shouldGetTriviaData, setShouldGetTriviaData] = React.useState(true);
    let [triviaData, setTriviaData] = React.useState([]);
    let [answersChecked, setAnswersChecked] = React.useState(false);
    let [correctAnswerCount, setCorrectAnswerCount] = React.useState(0);

    const handleClick = (event) => {
        setgameStart(prevGameStart => !prevGameStart);    
        if (event.target.textContent === "Back to Main Menu") {
            setShouldGetTriviaData(prevShouldGetTriviaData => !prevShouldGetTriviaData);
        }
    }
    
    const handleOptionSelect = (questionId, optionId) => {
        if (!answersChecked) {
            setTriviaData(prevTriviaData => {
                return prevTriviaData.map(question => {
                    if (question.questionId === questionId) {
                        let updatedOptions = question.potential_answers.map(option => {
                            if (option.id === optionId) {
                                return {
                                    ...option,
                                    selected: !option.selected,
                                }
                            } else if (option.id !== optionId && option.selected) {
                                return {
                                    ...option,
                                    selected: !option.selected
                                }
                            } else {
                                return option;
                            }
                        });
                        return {
                            ...question,
                            potential_answers: updatedOptions,
                            questionAnswered: true,
                        }
                    } else {
                        return question;
                    }
                })
            })
        }
        // Add setQuestionCount to check if all questions have been answered?
    }

    const handleCheckAnswers = () => {
        let correctAnswerCount;
        setAnswersChecked(prevAnswersChecked => !prevAnswersChecked);
        setTriviaData(prevTriviaData => {
            return prevTriviaData.map(question => {
                let updatedAnswers = question.potential_answers.map(option => {
                    return {
                        ...option,
                        correct: option.answer === question.correct_answer
                    }
                });
                return {
                    ...question,
                    potential_answers: updatedAnswers
                };
            });
        });

    }


    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(response => response.json())
            .then(data => data.results)
            .then(resultsData => {
                let modifiedResults = resultsData.map((questionObject, index) => {
                    let randomIndex = Math.floor(Math.random() * questionObject.incorrect_answers.length);
                    let potential_answers = [...questionObject.incorrect_answers];
                    potential_answers.splice(randomIndex, 0, questionObject.correct_answer);
                    let options = potential_answers.map((answer, index) => {
                        return {
                            answer: answer,
                            id: index,
                            selected: false,
                            correct: null
                        }
                    })
                    return {
                        ...questionObject,
                        potential_answers: options,
                        questionId: index,
                        questionAnswered: false
                    }
                });
                return modifiedResults;
            })
            .then(modifiedResults => setTriviaData(modifiedResults));
            
        }, [shouldGetTriviaData]);  
    
    React.useEffect(() => {
        console.log(triviaData);
    })
        
    return (
        gameStart === false ? 
            <MainMenu 
                handleClick={handleClick} /> :
            <Trivia 
                handleClick={handleClick}
                triviaData={triviaData}
                handleOptionSelect={handleOptionSelect}
                handleCheckAnswers={handleCheckAnswers}
                answersChecked={answersChecked}
            />
    )
}