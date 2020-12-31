import React, { useState } from "react";
import Question from "../Question/Question.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import questionnaire from "../../questionnaire";
import { Row, Col } from "reactstrap";

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState(() => {
        return questionnaire.reduce((acc, q) => {
            const { id } = q;
            acc[id] = null;
            return acc
        }, {})
    });
    const handleOptionSelect = (qId, opId) => setAnswers({ ...answers, [qId]: opId });
    const qSelect = (id) => setIndex(id);

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
                        className="btn btn-outline-danger">
                        Mark for Review
                    </button>
                    <button type="button"
                        className="btn btn-dark"
                        onClick={() => handleOptionSelect(questionnaire[index].id, null)}>
                        Clear Selection
                    </button>
                    <span className="ml-max">
                        <button type="button"
                            className="btn btn-light"
                            onClick={() => index - 1 >= 0 && setIndex(index - 1)}>
                            Previous
                        </button>
                        <button type="button"
                            className="btn btn-dark"
                            onClick={() => index + 1 <= questionnaire.length - 1 && setIndex(index + 1)}>
                            Next
                        </button>
                    </span>
                </Col>
                <Col xs="3">
                    <Navigation totalQuestions={questionnaire.length} qSelect={qSelect} />
                </Col>
            </Row>
        </section>
    );
};
export default Quiz;
