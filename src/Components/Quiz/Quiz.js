import React, { useState } from "react";
import Question from "../Question/Question";
import Navigation from "../Navigation/Navigation";
import questionnaire from "../../questionnaire";

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState(() => {
        return questionnaire.reduce((acc, q) => {
            const { id } = q;
            acc[id] = null;
            return acc
        }, {})
    });

    const handleOptionSelect = (qId, opId) => {
        setAnswers({ ...answers, [qId]: opId })
    };

    const handleClearSelection = (qId) => {
        setAnswers({ ...answers, [qId]: null })
    };

    const qSelect = (id) => setIndex(id);

    return (
        <section>
            <Question
                question={questionnaire[index]}
                handleOptionSelect={handleOptionSelect}
                answer={answers[questionnaire[index].id]}
            />
            <button type="button"
                className="prev-btn"
                onClick={() => index - 1 >= 0 && setIndex(index - 1)}>
                Previous
            </button>
            <button type="button"
                className="next-btn"
                onClick={() => index + 1 <= questionnaire.length - 1 && setIndex(index + 1)}>
                Next
            </button>
            <button type="button"
                className="next-btn"
                onClick={() => handleClearSelection(questionnaire[index].id)}>
                Clear Selection
            </button>
            <Navigation totalQuestions={questionnaire.length} qSelect={qSelect} />
        </section>
    );
};
export default Quiz;
