import React, { useState } from 'react';
import Question from '../Question/Question';
import questionnaire from "../../questionnaire.js"

const Quiz = () => {
    const [currQIndex, setCurrQIndex] = useState(0);
    const [questionInfo, setQuestionInfo] = useState(questionnaire);

    const handleOptionSelect = (qId, opId) => {
        setQuestionInfo((prevState) => {
            prevState[qId - 1]['selectedChoice'] = Number(opId);
            return prevState;
        })
        // console.log("Changed State", questionInfo);
    }

    const nextQuestion = () => { 
        currQIndex + 1 <= questionInfo.length - 1 && setCurrQIndex(currQIndex + 1)
    }
    const prevQuestion = () => { 
        currQIndex - 1 >= 0 && setCurrQIndex(currQIndex - 1)
    }

    // console.log("render", questionInfo);
    return(
        <main>
            <Question questionInfo={questionInfo[currQIndex]} handleOptionSelect={handleOptionSelect}/>
            <button type="button" 
            className="prev-btn"
            onClick={prevQuestion}>
                Previous
            </button>
            <button type="button" 
            className="next-btn"
            onClick={nextQuestion}>
                Next 
            </button>
        </main>
    )
}
export default Quiz