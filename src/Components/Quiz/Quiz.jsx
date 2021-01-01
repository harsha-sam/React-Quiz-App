import React, { useState } from "react";
import Question from "../Question/Question.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import questionnaire from "../../questionnaire";
import { Row, Col } from "reactstrap";

const defaultStateInit = () => {
    return questionnaire.reduce((acc, q) => {
        const { id } = q;
        acc[id] = null;
        return acc
    }, {})
}

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState(defaultStateInit);
    const [status, setStatus] = useState(defaultStateInit);
    const handleOptionSelect = (qId, opId) => setAnswers({ ...answers, [qId]: opId });
    const qSelect = (qId) => {
        const currId = questionnaire[index].id;
        if (answers[currId] && status[currId] !== "flag"){
            setStatus({ ...status,  [currId]: "saved"});
        }
        setIndex(qId);
    }
    const handleMarkForReview = (qId) => {
        if (status[qId] === "flag"){
            setStatus({...status, [qId]: null});
        }
        else{
            setStatus({...status, [qId]: 'flag'});
        }
    }
    const handleClearSelection = (qId) => {
        if (status[qId] === "saved"){
            setStatus({...status, [qId]: null});
        }
        handleOptionSelect(qId, null);
    }
    const handlePrev = () => {
        const qId = questionnaire[index].id;
        if (answers[qId] && status[qId] !== "flag"){
            setStatus({ ...status,  [qId]: "saved"});
        }
        setIndex((curr) => curr - 1)
    }
    const handleNext = () => {
        const qId = questionnaire[index].id;
        if (answers[qId] && status[qId] !== "flag"){
            setStatus({ ...status,  [qId]: "saved"});
        }
        setIndex((curr) => curr + 1)
    }
    return (
        <section>
            <Row>
                <Col xs="9">
                    <Question
                        className="mb-3"
                        question={questionnaire[index]}
                        handleOptionSelect={handleOptionSelect}
                        answer={answers[questionnaire[index].id]}
                    />
                    <button type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleMarkForReview(questionnaire[index].id)}>
                        {
                            status[questionnaire[index].id] === "flag"
                            ? "Unmark"
                            : "Mark for Review"
                        }
                    </button>
                    <button type="button"
                        className="btn btn-dark"
                        onClick={() => handleClearSelection(questionnaire[index].id)}>
                        Clear Selection
                    </button>
                    <span className="ml-max">
                        {
                            index - 1 < 0 ?
                            <button type="button"
                                className="btn btn-light"
                                disabled>
                                Previous
                            </button>
                            :
                            <button type="button"
                                className="btn btn-light"
                                onClick={handlePrev}>
                                Previous
                            </button>
                        }
                        {
                            index + 1 > questionnaire.length - 1?
                            <button type="button"
                                className="btn btn-dark"
                                disabled>
                                Next
                            </button>
                            :
                            <button type="button"
                                className="btn btn-dark"
                                onClick={handleNext}>
                                Next
                            </button>
                        }
                    </span>
                </Col>
                <Col xs="3">
                    <Navigation totalQuestions={questionnaire.length} 
                    qSelect={qSelect} 
                    status={status} 
                    />
                </Col>
            </Row>
        </section>
    );
};
export default Quiz;
