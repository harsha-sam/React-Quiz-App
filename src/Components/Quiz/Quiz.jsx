import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Question from "../Question/Question.jsx";
import QuizNavigation from "../QuizNavigation/QuizNavigation.jsx";
import { Row, Col } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const defaultStateInit = (qb) => {
    return qb.reduce((acc, q) => {
        const { id } = q;
        acc[id] = null;
        return acc;
    }, {});
};

const Quiz = ({ sId }) => {
    const [index, setIndex] = useState(0);
    const [questionnaire, setQuestionnaire] = useState([]);
    const [answers, setAnswers] = useState({});
    const [status, setStatus] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(0);
    const [modal, setModal] = useState(false);

    const { id } = useParams();
    useEffect(() => {
        fetch(`https://react-assessments.azurewebsites.net/quiz/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data === "Already test has been completed"){
                    console.log('test has been completed')
                }
                else{
                    setQuestionnaire(() => {
                        setAnswers(defaultStateInit(data));
                        setStatus(defaultStateInit(data));
                        return data;
                    })
                }
            })
    }, [id])

    const toggle = () => setModal(!modal);

    const handleQuizSubmit = () => {
        let count = 0;
        for ( let question of questionnaire ){
            const {id, correctOption} = question;
            if (correctOption === parseInt(answers[id])){
                count++;
            }
        }
        setResult(count);
        fetch(`https://react-assessments.azurewebsites.net/response`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({sId, tId: id, choices: answers, securedScore: count})
            })
            .then((res) => res.json())
            .then((res) => {
                if(res === "Successfully posted !"){
                    setShowResult(true);
                    toggle();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleOptionSelect = (qId, opId) =>
        setAnswers({ ...answers, [qId]: opId });

    const qSelect = (qId) => {
        const currId = questionnaire[index].id;
        if (answers[currId] && status[currId] !== "flag") {
            setStatus({ ...status, [currId]: "saved" });
        }
        setIndex(qId);
    };

    const handleMarkForReview = (qId) => {
        if (status[qId] === "flag") {
            setStatus({ ...status, [qId]: null });
        } else {
            setStatus({ ...status, [qId]: "flag" });
        }
    };

    const handleClearSelection = (qId) => {
        if (status[qId] === "saved") {
            setStatus({ ...status, [qId]: null });
        }
        handleOptionSelect(qId, null);
    };

    const handlePrev = () => {
        const qId = questionnaire[index].id;
        if (answers[qId] && status[qId] !== "flag") {
            setStatus({ ...status, [qId]: "saved" });
        }
        setIndex((curr) => curr - 1);
    };

    const handleNext = () => {
        const qId = questionnaire[index].id;
        if (answers[qId] && status[qId] !== "flag") {
            setStatus({ ...status, [qId]: "saved" });
        }
        setIndex((curr) => curr + 1);
    };

    const unAttemptedCount = () => {
        let count = 0;
        for (let key in answers) {
            if (!answers[key]) {
                count++;
            }
        }
        return count;
    };

    const attemptedCount = () => {
        let attempted = 0;
        for (let key in answers) {
            if (answers[key]) {
                attempted++;
            }
        }
        return attempted;
    };

    const flaggedCount = () => {
        let flagged = 0;
        for (let key in status) {
            if (status[key] === "flag") {
                flagged += 1;
            }
        }
        return flagged;
    };

    if (questionnaire.length === 0) {
        return <h2 className="text-center">loading...</h2>
    }
    else if (showResult){
        return <h2 className="text-center">Your score is {result}</h2>
    }
    else{
        const currQId = questionnaire[index].id;
        return (
            <section className="m-5">
                <Row>
                    <Col xs="9">
                        <Question
                            className="mb-3"
                            question={questionnaire[index]}
                            handleOptionSelect={handleOptionSelect}
                            answer={answers[currQId]}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleMarkForReview(currQId)}
                        >
                            {status[currQId] === "flag" ? "Unmark" : "Mark for Review"}
                        </button>
                        {answers[currQId] ? (
                            <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => handleClearSelection(currQId)}
                            >
                                Clear Selection
                            </button>
                        ) :
                            (
                                <button type="button" className="btn btn-dark" disabled>
                                    Clear Selection
                                </button>
                            )}
                        <span className="ml-max">
                            {index - 1 < 0 ? (
                                <button type="button" className="btn btn-light" disabled>
                                    Previous
                                </button>
                            ) : (
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={handlePrev}
                                    >
                                        Previous
                                    </button>
                                )}
                            {index + 1 > questionnaire.length - 1 ? (
                                <button type="button" className="btn btn-dark" disabled>
                                    Next
                                </button>
                            ) : (
                                    <button
                                        type="button"
                                        className="btn btn-dark"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>
                                )}
                        </span>
                    </Col>
                    <Col xs="3">
                        <QuizNavigation
                            totalQuestions={questionnaire.length}
                            qSelect={qSelect}
                            status={status}
                        />
                        <button className="btn btn-success btn-block mt-5" onClick={toggle}>
                            Submit
                        </button>
                    </Col>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader>Are you sure?</ModalHeader>
                        <ModalBody>
                            <p>
                                <strong>Attempted</strong>: {attemptedCount()}
                                <br />
                                <strong>Not Attempted</strong>: {unAttemptedCount()}
                                <br />
                                <strong>Marked for Review</strong>: {flaggedCount()}
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={handleQuizSubmit}>
                                Continue
                            </Button>{" "}
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </Row>
            </section>
        );
    }
};
export default Quiz;
