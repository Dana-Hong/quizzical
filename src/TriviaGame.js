import React from "react";
import { MainMenu } from "./MainMenu";
import { Trivia } from "./Trivia";
import { ErrorPage } from "./ErrorPage";

export const TriviaGame = () => {
    const [gameStart, setgameStart] = React.useState(false);
    const [shouldGetTriviaData, setShouldGetTriviaData] = React.useState(true);
    const [triviaData, setTriviaData] = React.useState([]);
    const [answersChecked, setAnswersChecked] = React.useState(false);
    const [correctAnswerCount, setCorrectAnswerCount] = React.useState(0);
    const [errorOccured, setErrorOccured] = React.useState(false);
    const [questionConstraints, setQuestionConstraints] = React.useState(
        {
            amount: "5",
            category: "9",
            difficulty: "easy",
            type: "multiple"
        }
    );
    const [fetchRequestFinished, setFetchRequestFinished] = React.useState(false);

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
            const {name, value} = event.target;
            return {
                ...prevQuestionContraints,
                [name]: value,
            }
        })
    }

    const handleOptionSelect = (questionId, optionId) => {
        if (!answersChecked) {
            setTriviaData(prevTriviaData => {
                return prevTriviaData.map(question => {
                    let selectedOption;
                    if (question.questionId === questionId) {
                        let updatedOptions = question.potentialAnswers.map(option => {
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
                            potentialAnswers: updatedOptions,
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
            return triviaData.filter(question => question.correctAnswer === question.selectedOption).length;
        });
        setTriviaData(prevTriviaData => {
            return prevTriviaData.map(question => {
                const updatedAnswers = question.potentialAnswers.map(option => {
                    return {
                        ...option,
                        correct: option.answer === question.correctAnswer
                    }
                });
                return {
                    ...question,
                    potentialAnswers: updatedAnswers,
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
                if (data.response_code === 2 || data.response_code === 1) {
                    throw Error();
                }
                const modifiedResults = data.results.map((question, index) => {
                    const randomIndex = getRandomNumberFloor(question.incorrect_answers.length);
                    let potentialAnswers = [...question.incorrect_answers];
                    potentialAnswers.splice(randomIndex, 0, question.correct_answer);
                    const options = potentialAnswers.map((answer, index) => {
                        return {
                            answer: answer,
                            id: index,
                            selected: false,
                            correct: null
                        }
                    });
                    return {
                        question: question.question,
                        correctAnswer: question.correct_answer,
                        potentialAnswers: options,
                        questionId: index,
                        questionAnswered: false
                    }
                });
                return modifiedResults;
            })
            .then(modifiedResults => setTriviaData(modifiedResults))
            .then(setFetchRequestFinished(true))
            .catch(err => {
                setErrorOccured(true);
            });         

    }, [shouldGetTriviaData, questionConstraints]);  
    
    React.useEffect(() => {
        console.log(questionConstraints);
    })
        
    if (errorOccured) {
        return (
            <ErrorPage />
        )
    } else {
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
}