import React from 'react';

const Question = ({ question, answer, handleOptionSelect }) => {
    const { id, text, options } = question;

    return (
        <div className="box">
            <h4 className="mb-4">{`${id}. ${text}`}</h4>
            {
                Object.keys(options).map((opId) => {
                    return <div key={String(id) + String(opId)}>
                        <input type="radio"
                            id={String(id) + String(opId)}
                            name={id}
                            checked={answer === opId}
                            onChange={() => handleOptionSelect(id, opId)} />
                        <label htmlFor={String(id) + String(opId)}> {options[opId]}</label>
                    </div>
                })
            }
        </div>
    );
};


export default Question;
