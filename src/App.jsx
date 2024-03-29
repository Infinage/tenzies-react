import React from "react";
import Confetti from 'react-confetti';
import useSound from 'use-sound';
import Die from "./components/Die";
import AboutUsModal from  "./components/AboutUsModal";
import { useWindowSize } from "@react-hook/window-size";

import victorySfx from "./assets/victory.mp3";
import rollSfx from "./assets/dice-roll.mp3";
import popSfx from "./assets/poit.mp3";
import clickSfx from "./assets/click.mp3";

const resetDice = () => {
    return Array(10).fill(null).map((ele, index) => ({id: index, value: rollDie(), selected: false}))
}

const rollDie = () => {
    return Math.floor(Math.random() * 6) + 1;
}

const App = () => {

    const [dice, setDice] = React.useState(resetDice());
    const [isGameWon, setIsGameWon] = React.useState(false);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [deviceSupportsPWA, setdeviceSupportsPWA] = React.useState(false);
    const [promptInstall, setPromptInstall] = React.useState(null);

    const [playVictorySfx] = useSound(victorySfx);
    const [playRollSfx] = useSound(rollSfx);
    const [playPopSfx] = useSound(popSfx);
    const [playClickSfx] = useSound(clickSfx)


    const [width, height] = useWindowSize();

    const toggleSelect = (id) => {

        if (!isGameWon) {

            // Values that are already selected
            const selectedDieValue = dice.find(d => d.selected == true)?.value;

            if (!selectedDieValue || selectedDieValue == dice.at(id).value){
                // Play pop SFX when tile is being toggled
                playPopSfx();
            }

            setDice(prevDice => [
                ...prevDice.slice(0, id), 
                {...prevDice.at(id), selected: !selectedDieValue || selectedDieValue == prevDice.at(id).value? !prevDice.at(id)['selected']: prevDice.at(id)['selected']}, 
                ...prevDice.slice(id + 1)
            ]);
        }
    }

    const rollDice = () => {
        
        // On die roll, play a click SFX
        playClickSfx();

        setDice(prevDice => {
            return prevDice.map(die => die.selected ? die: {...die, value: rollDie()})
        });
    } 

    const resetGame = () => {

        // Play dice roll SFX whenever the die is being reset
        playRollSfx();

        setDice(resetDice());
        setIsGameWon(false);
    }

    React.useEffect(() => {

        const result = dice.every(val => val.value === dice[0].value && val.selected);
        setIsGameWon(result);

        if (result) {
            playVictorySfx();
            if (Math.random() < 0.25) setModalIsOpen(true);
        }

    }, [dice])

    React.useEffect(() => {
        const handler = e => {
            e.preventDefault();
            setdeviceSupportsPWA(true);
            setPromptInstall(e);
        };

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, [])

    return (
        <main>
            {isGameWon && <Confetti height={height} width={width} />}
            <AboutUsModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} isPWASupported={deviceSupportsPWA} promptInstall={promptInstall} />
            <div className="info">
                <h1 className="info--h1">Tenzies</h1>
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