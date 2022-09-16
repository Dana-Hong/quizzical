import React from "react";
import { MainMenu } from "./MainMenu";
import { Trivia } from "./Trivia";

export const Trivia_Game = () => {
    let [gameStart, setgameStart] = React.useState(false);
    let [shouldGetTriviaData, setShouldGetTriviaData] = React.useState(true);
    let [triviaData, setTriviaData] = React.useState([]);
    let [answersChecked, setAnswersChecked] = React.useState(false);
    let [correctAnswerCount, setCorrectAnswerCount] = React.useState(0);
    let [questionConstraints, setQuestionConstraints] = React.useState(
        {
            amount: "5",
            category: "9",
            difficulty: "easy",
            type: "multiple"
        }
    );
    let [fetchRequestFinished, setFetchRequestFinished] = React.useState(false);

    const handleClick = (event) => {
        if (fetchRequestFinished) {
            setgameStart(prevGameStart => !prevGameStart);    
            if (event.target.textContent === "Back to Main Menu") {
                setShouldGetTriviaData(prevShouldGetTriviaData => !prevShouldGetTriviaData);
                setAnswersChecked(false);
                setFetchRequestFinished(false);
                setQuestionConstraints({
                    amount: "5",
                    category: "9",
                    difficulty: "easy",
                    type: "multiple"
                });
            }
        }
    }

    const handleOnChange = (event) => {
        setQuestionConstraints(prevQuestionContraints => {
            return {
                ...prevQuestionContraints,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleOptionSelect = (questionId, optionId) => {
        if (!answersChecked) {
            setTriviaData(prevTriviaData => {
                return prevTriviaData.map(question => {
                    let selectedOption;
                    if (question.questionId === questionId) {
                        let updatedOptions = question.potential_answers.map(option => {
                            if (option.id === optionId) {
                                selectedOption = option.answer;
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
                            selectedOption: selectedOption
                        }
                    } else {
                        return question;
                    }
                })
            });
        }
    }

    const handleCheckAnswers = () => {
        setAnswersChecked(true);
        setCorrectAnswerCount(() => {
            return triviaData.filter(question => question.correct_answer === question.selectedOption).length;
        });
        setTriviaData(prevTriviaData => {
            return prevTriviaData.map(question => {
                const updatedAnswers = question.potential_answers.map(option => {
                    return {
                        ...option,
                        correct: option.answer === question.correct_answer
                    }
                });
                return {
                    ...question,
                    potential_answers: updatedAnswers,
                };
            });
        });

    }

    const getRandomNumberFloor = (range) => {
        return Math.floor(Math.random() * range);
    }

    React.useEffect(() => {
        const {amount, category, difficulty, type} = questionConstraints;
        fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
            .then(response => {
                if (!response.ok) {
                    throw Error();
                }
                return response.json();
            })
            .then(data => {
                if (data.response_code === 2) {
                    throw Error();
                }
                const modifiedResults = data.results.map((question, index) => {
                    const randomIndex = getRandomNumberFloor(question.incorrect_answers.length);
                    let potential_answers = [...question.incorrect_answers];
                    potential_answers.splice(randomIndex, 0, question.correct_answer);
                    const options = potential_answers.map((answer, index) => {
                        return {
                            answer: answer,
                            id: index,
                            selected: false,
                            correct: null
                        }
                    });
                    return {
                        ...question,
                        potential_answers: options,
                        questionId: index,
                        questionAnswered: false
                    }
                });
                return modifiedResults;
            })
            .then(modifiedResults => setTriviaData(modifiedResults))
            .then(setFetchRequestFinished(true))
            .catch(err => {
                console.log("Something went wrong");
            });         
            
    }, [shouldGetTriviaData, questionConstraints]);  
    
    React.useEffect(() => {
        // console.log(triviaData, correctAnswerCount);
        console.log(questionConstraints);
    })
        
    return (
        gameStart === false ? 
            <MainMenu 
                handleClick={handleClick} 
                handleOnChange={handleOnChange}
                questionConstraints={questionConstraints}
            /> :
            <Trivia 
                handleClick={handleClick}
                triviaData={triviaData}
                handleOptionSelect={handleOptionSelect}
                handleCheckAnswers={handleCheckAnswers}
                answersChecked={answersChecked}
                correctAnswerCount={correctAnswerCount}
            />
    )
}