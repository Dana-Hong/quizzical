import React from "react";
import { MainMenu } from "./MainMenu";
import { Trivia } from "./Trivia";

export const Trivia_Game = () => {
    let [gameStart, setgameStart] = React.useState(false);
    let [shouldGetTriviaData, setShouldGetTriviaData] = React.useState(true);
    let [triviaData, setTriviaData] = React.useState([]);

    const handleClick = (event) => {
        setgameStart(prevGameStart => !prevGameStart);    
        if (event.target.textContent === "Start quiz") {
            setShouldGetTriviaData(prevShouldGetTriviaData => !prevShouldGetTriviaData);
        }
    }

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(response => response.json())
            .then(data => setTriviaData(data.results));
            
        console.log(triviaData)

        }, [shouldGetTriviaData])
        

    return (
        gameStart === false ? 
            <MainMenu 
                handleClick={handleClick} /> :
            <Trivia 
                handleClick={handleClick} triviaData={triviaData}/>
    )
}