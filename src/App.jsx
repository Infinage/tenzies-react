import React from "react";
import Confetti from 'react-confetti'

import Die from "./components/Die";

const App = () => {

    const rollDie = () => {
        return Math.floor(Math.random() * 6) + 1;
    }

    const toggleSelect = (id) => {
        if (!isGameWon) {
            const selectedDieValue = dice.find(d => d.selected == true)?.value;

            setDice(prevDice => [
                ...prevDice.slice(0, id), 
                {...prevDice.at(id), selected: !selectedDieValue || selectedDieValue == prevDice.at(id).value? !prevDice.at(id)['selected']: prevDice.at(id)['selected']}, 
                ...prevDice.slice(id + 1)
            ]);
        }
    }

    const rollDice = () => {
        setDice(prevDice => {
            return prevDice.map(die => die.selected ? die: {...die, value: rollDie()})
        });
    } 

    const resetDice = () => {
        return Array(10).fill(null).map((ele, index) => ({id: index, value: rollDie(), selected: false}))
    }

    const resetGame = () => {
        setDice(resetDice());
        setIsGameWon(false);
    }

    const [dice, setDice] = React.useState(resetDice());

    const [isGameWon, setIsGameWon] = React.useState(false);

    React.useEffect(() => {
        const result = dice.every(val => val.value === dice[0].value && val.selected);
        setIsGameWon(result);
    }, [dice])

    return (
        <main>
            {isGameWon && <Confetti />}
            <div className="info">
                <h1 className="info--h1"><a href="https://github.com/Infinage/tenzies-react">Tenzies</a></h1>
                <p className="info--p">Roll until all dice are the same. Click each die to freeze / unfreeze it at its current value between rolls.</p>
            </div>

            <div className="die-container">
                {dice.map(({id, value, selected}) => <Die key={id} index={id} value={value} selected={selected} toggleSelect={toggleSelect} />)}
            </div>

            <div>
                { isGameWon? 
                  <button className="roll-button" style={{backgroundColor: "#e0a800"}} onClick={resetGame}>Reset Game</button>: 
                  <button className="roll-button" style={{backgroundColor: "#5035FF"}} onClick={rollDice}>Roll</button>
                }
            </div>
        </main>
    );
}

export default App;