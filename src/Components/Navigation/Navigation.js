import React from 'react';
import './Navigation.css';

const Navigation = ({ qSelect, totalQuestions }) => {
    const boxes = [];
    for (let i = 1; i <= totalQuestions; i++) {
        boxes.push(
        <button className="box" 
        key={i}
        onClick={() => qSelect(i - 1)}>
        {i}
        </button>)
    }
    return boxes;
}
export default Navigation;