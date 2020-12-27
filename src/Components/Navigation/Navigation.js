import React from 'react';
import './Navigation.css';
import { AiFillClockCircle } from 'react-icons/ai';

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
    return <section>
        <div className="box mb-3 mt-4">
            <AiFillClockCircle/> 30:00
        </div>
        <div className="box mb-4">
            { boxes }
            <br />
            <div className="legend bg-info"></div> Attempted
            <br />
            <div className="legend bg-danger"></div> Flagged
            <br />
            <div className="legend bg-white"></div> Not Attempted
            <br /> 
        </div>
        <button className="btn btn-success btn-block mt-4">Submit</button>
    </section>;
}
export default Navigation;