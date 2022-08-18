import React from "react";
import { MainMenu } from "./MainMenu";
import { Trivia } from "./Trivia";

export const Trivia_Game = () => {
    let [gameStart, setgameStart] = React.useState(false);
    console.log(gameStart);

    const handleClick = () => {
        setgameStart(prevGameStart => !prevGameStart);

    }

    return (
        gameStart === false ? 
            <MainMenu 
                handleClick={handleClick} /> :
            <Trivia 
                handleClick={handleClick}/>
    )
}