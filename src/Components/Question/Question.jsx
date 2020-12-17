import React from 'react';
import "./Question.css";

const Question = ({ questionInfo, handleOptionSelect }) => {
    const { id, text, options, selectedChoice} = questionInfo;
    return (
        <div>
            <h4>{text}</h4>
            <Answers qId={id} 
            options={options} 
            selectedChoice={selectedChoice} 
            handleOptionSelect={handleOptionSelect}/>
        </div>
    );
};

const Answers = ({ qId, options, selectedChoice, handleOptionSelect }) => {
    const fliteredOptions = Object.keys(options).map((opId) => {
        const opValue = options[opId];
        return <div key={opId + 1}>
            <span className= { "btn" + (Number(opId) === selectedChoice ? " selected":"")}
            onClick={() => handleOptionSelect(qId, opId)}>
            {opValue}
            </span>
        </div>  
    })
    return fliteredOptions;
};

export default Question;
