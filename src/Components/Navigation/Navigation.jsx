import React from 'react';
import './Navigation.css';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';

const Navigation = ({ qSelect, totalQuestions, status }) => {
    const boxes = [];
    for (let i = 1; i <= totalQuestions; i++) {
        boxes.push(
            <button
                key={i}
                className={`qbox ${status[i]}`}
                onClick={() => qSelect(i - 1)}>
                {i}
            </button>)
    }
    return <section>
        <div className="box mb-3 mt-4">
            <TimerRoundedIcon />
        </div>
        <div className="box mb-4">
            {boxes}
            <br />
            <div className="legend bg-success"></div> Attempted
            <br />
            <div className="legend bg-danger"></div> Flagged
            <br />
        </div>
    </section>;
}
export default Navigation;