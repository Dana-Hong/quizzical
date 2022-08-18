import React from "react";
import { MainMenu } from "./MainMenu";
import { Trivia } from "./Trivia";

export const Trivia_Game = () => {
    let [gameStart, setgameStart] = React.useState(false);
    let [getTriviaData, setGetTriviaData] = React.useState(true);
    let [triviaData, setTriviaData] = React.useState([]);

    const handleClick = (event) => {
        setgameStart(prevGameStart => !prevGameStart);    
        if (event.target.textContent === "Start quiz") {
            setGetTriviaData(prevGetTriviaData => !prevGetTriviaData);
        }
    }

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(response => response.json())
            .then(data => setTriviaData(data));
        
        console.log(triviaData);
    }, [getTriviaData])


    return (
        gameStart === false ? 
            <MainMenu 
                handleClick={handleClick} /> :
            <Trivia 
                handleClick={handleClick}/>
    )
}