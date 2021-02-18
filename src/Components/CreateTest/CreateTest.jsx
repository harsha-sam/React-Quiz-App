import React, { useState, useReducer } from "react";
import reducer from "./reducer";
import QuestionTemplate from "./QuestionTemplate";
import MultipleSelect from "../MultipleSelect/MultipleSelect";
import DateAndTimePickers from "../DateAndTimePickers/DateAndTimePickers";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
    FIELD_CHANGE,
    SET_QUESTION,
    UPDATE_QUESTION,
    SET_OPTION,
    UPDATE_OPTIONS,
    REMOVE_QUESTION,
    REMOVE_OPTION,
    UPDATE_ANSWER,
    RESET_TO_DEFAULT
} from "./action";

const defaultState = {
    testName: "",
    subject: "",
    questions: [""],
    options: [["", ""]],
    answers: [null],
    year: [],
    dept: [],
    section: [],
    startDateAndTime: new Date(),
    endDateAndTime: new Date(),
};

export const TestContext = React.createContext();

const CreateTest = ({ host }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const [modal, setModal] = useState(false);
    const [isDateValid, setIsDateValid] = useState(false);
    const toggle = () => setModal(!modal);

    const handleFieldChange = (e) => {
        dispatch({
            type: FIELD_CHANGE,
            payLoad: { name: e.target.name, val: e.target.value },
        });
    };
    const handleStartDateandTimeChange = (val) => {
        setIsDateValid((val > new Date() && state.endDateAndTime > val));
        dispatch({ type: FIELD_CHANGE, payLoad: { name: "startDateAndTime", val } });
    };
    const handleEndDateandTimeChange = (val) => {
        setIsDateValid((val > state.startDateAndTime && state.startDateAndTime > new Date()));
        dispatch({ type: FIELD_CHANGE, payLoad: { name: "endDateAndTime", val } });
    };
    const handleAddQClick = () => {
        dispatch({ type: SET_QUESTION });
    };
    const handleAddOpClick = (e, qNo) => {
        e.preventDefault();
        dispatch({ type: SET_OPTION, payLoad: { qNo } });
    };
    const handleQuestionUpdate = (qNo, text) => {
        dispatch({ type: UPDATE_QUESTION, payLoad: { qNo, text } });
    };
    const handleOptionUpdate = (qNo, opNo, text) => {
        dispatch({ type: UPDATE_OPTIONS, payLoad: { text, opNo, qNo } });
    };
    const handleRemoveQuestion = (qNo) => {
        if (state.questions.length > 1) {
            dispatch({ type: REMOVE_QUESTION, payLoad: { qNo } });
        }
    };
    const handleRemoveOption = (qNo, opNo) => {
        if (state.options[qNo].length > 2) {
            dispatch({ type: REMOVE_OPTION, payLoad: { qNo, opNo } });
        }
    };
    const handleAnswerSelect = (qNo, opNo) => {
        dispatch({ type: UPDATE_ANSWER, payLoad: { qNo, opNo } });
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (isDateValid) {
            fetch("https://react-assessments.azurewebsites.net/quiz", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...state, host }),
            })
                .then((res) => res.json())
                .then((reply) => {
                    console.log(reply);
                    if(reply){
                        toggle();
                        dispatch({ type: RESET_TO_DEFAULT })
                    }
                })
                .catch((err) => {
                    console.log("Something went wrong!", err);
                });
        }
    };

    return (
        <TestContext.Provider
            value={{
                handleQuestionUpdate,
                handleRemoveQuestion,
                handleAddOpClick,
                handleOptionUpdate,
                handleRemoveOption,
                handleAnswerSelect,
                answers: state.answers,
            }}
        >
            <main className="container-fluid">
                <h2>Create New Quiz</h2>
                <div>
                    <form onSubmit={handleFormSubmit} autoComplete="off">
                        <div className="box w-75">
                            <div className="mb-3">
                                <label htmlFor="testName" className="form-label">
                                    Name of the test
                                </label>
                                <input
                                    type="text"
                                    id="testName"
                                    name="testName"
                                    className="form-control w-50"
                                    value={state.testName}
                                    onChange={handleFieldChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subject" className="form-label">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="form-control w-50"
                                    value={state.subject}
                                    onChange={handleFieldChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 display-inline">
                                <MultipleSelect
                                    labelName={"Year"}
                                    items={["1", "2", "3", "4"]}
                                    filterItems={state.year}
                                    handleChange={handleFieldChange}
                                />
                                <MultipleSelect
                                    labelName={"Dept"}
                                    items={["CSE", "ECE", "IT", "EEE", "MECH", "CE"]}
                                    filterItems={state.dept}
                                    handleChange={handleFieldChange}
                                />
                                <MultipleSelect
                                    labelName={"Section"}
                                    items={["A", "B", "C"]}
                                    filterItems={state.section}
                                    handleChange={handleFieldChange}
                                />
                            </div>
                            <div className="mb-2 display-inline">
                                <DateAndTimePickers
                                    handleChange={handleStartDateandTimeChange}
                                    label={"Pick Start Date and Time"}
                                    value={state.startDateAndTime}
                                />
                                <DateAndTimePickers
                                    handleChange={handleEndDateandTimeChange}
                                    label={"Pick End Date and Time"}
                                    value={state.endDateAndTime}
                                />
                            </div>
                            <br />
                            {!isDateValid && (
                                <small className="text-danger">
                                    Date and Time should be in future and 
                                    End Date and Time must come after the Start Date and Time
                                </small>
                            )}
                        </div>
                        <div className="mb-3">
                            {state.questions.map((q, index) => {
                                return (
                                    <QuestionTemplate
                                        key={index}
                                        qNo={index}
                                        text={q}
                                        options={state.options[index]}
                                    />
                                );
                            })}
                            <span title="Add question">
                                <AddCircleRoundedIcon
                                    className="icon"
                                    onClick={handleAddQClick}
                                />
                            </span>
                        </div>
                        <button type="submit" className="btn btn-success mt-4">
                            Submit
                        </button>
                    </form>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader>
                            <CheckCircleIcon /> Quiz sucessfully created
                        </ModalHeader>
                        <ModalFooter>
                            <Button color="light">
                                <Link onClick={toggle} to={"/quiz"}>
                                    Head over to quiz
                                </Link>{" "}
                            </Button>
                            <Button color="secondary" onClick={toggle} to={"/"}>
                                Go Back to Home
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </main>
        </TestContext.Provider>
    );
};

export default CreateTest;
