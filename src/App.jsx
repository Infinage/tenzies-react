import React from "react";

import Die from "./components/Die";

const App = () => {

    const rollDice = () => {
        return Math.floor(Math.random() * 6) + 1;
    }

    const toggleSelect = () => {

    }

    const [dice, setDice] = React.useState(Array(10).fill(null).map(() => ({value: rollDice(), selected: false})));

    return (
        <main>
            <div className="info">
                <h1 className="info--h1">Tenzies</h1>
                <p className="info--p">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>

            <div className="die-container">
                {dice.map(({value, selected}) => <Die value={value} selected={selected} toggleSelect={toggleSelect} />)}
            </div>

            <div>
                <button className="roll-button">Roll</button>
            </div>
        </main>
    );
}

export default App;