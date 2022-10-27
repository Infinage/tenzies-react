import React from "react";

const Die = (props) => {

    return (
        <div className={'die-face' + (props.selected ? ' die-selected': '')} onClick={props.toggleSelect}>
            <h1 className="die-face--value">{props.value}</h1>
        </div>
    );
}

export default Die;