import React from 'react';
import './Navigation.css';

const Navigation = ({ qSelect, totalQuestions }) => {
    const boxes = [];
    for (let i = 1; i <= totalQuestions; i++) {
        boxes.push(
        <button
        key={i}
        className="qbox"
        onClick={() => qSelect(i - 1)}>
        {i}
        </button>)
    }
    return <div className="box">
        { boxes }
        <div>
            <div className="legend bg-success"></div> Attempted
            <br />
            <div className="legend bg-danger"></div> Flagged
            <br />
            <div className="legend bg-white"></div> Not Attempted
            <br /> 
        </div>
    </div>;
}
export default Navigation;