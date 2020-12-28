import React, { useReducer } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

const defaultState = {
    testName: "",
    subject: "",
    questions: [],
    options: []
}

const reducer = (state, action) => {
    console.log(state);
    if (action.type === "TEST_NAME_CHANGE") {
        return {
            ...state,
            testName: action.payLoad
        }
    }
    else if (action.type === "SUBJECT_CHANGE") {
        return {
            ...state,
            subject: action.payLoad
        }
    }
    else if (action.type === "SET_QUESTION") {
        return {
            ...state,
            questions: [...state.questions, action.payLoad],
            options: [...state.options, []]
        }
    }
    else if (action.type === "SET_OPTION") {
        const newArray = [...state.options]
        newArray[action.qId] = [...newArray[action.qId], action.payLoad]
        return {
            ...state,
            options: newArray
        }
    }
    else if (action.type === "UPDATE_QUESTION") {
        const newArray = [...state.questions]
        newArray[action.qId] = action.payLoad
        return {
            ...state,
            questions: newArray
        }
    }
    else if (action.type === "UPDATE_OPTIONS") {
        const newArray = [...state.options]
        newArray[action.qId][action.opId] = action.payLoad
        return {
            ...state,
            options: newArray
        }
    }
    throw new Error('no matching action type');
}

function CreateTest() {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const handleAddQClick = () => {
        dispatch({ type: "SET_QUESTION", payLoad: "" })
    }

    const handleAddOpClick = (e, qNo) => {
        e.preventDefault();
        dispatch({ type: "SET_OPTION", qId: qNo, payLoad: "" })
    }
    const handleQuestionUpdate = (qNo, text) => {
        dispatch({ type: "UPDATE_QUESTION", qId: qNo, payLoad: text })
    }

    const handleOptionUpdate = (qNo, opNo, text) => {
        dispatch({ type: "UPDATE_OPTIONS", qId: qNo, opId: opNo, payLoad: text })
    }

    return (
        <main>

            <h2>Create New Form</h2>

            <div>

                <form>

                    <div className="box">

                        <div className="mb-2">

                            <label htmlFor="testName">Name of the test:</label>
                            <input type="text"
                                id="testName"
                                name="testName"
                                className="ml-2"
                                onChange={(e) => dispatch({
                                    type: "TEST_NAME_CHANGE",
                                    payLoad: e.target.value
                                })}
                            />

                        </div>

                        <div className="mb-2">

                            <label htmlFor="subject">Subject:</label>
                            <input type="text"
                                id="subject"
                                name="subject"
                                className="ml-2"
                                onChange={(e) => dispatch({
                                    type: "SUBJECT_CHANGE",
                                    payLoad: e.target.value
                                })}
                            />

                        </div>

                    </div>

                    <div>

                        {state.questions.map((q, index) => {
                            return <QuestionTemplate key={ index } qNo={index} text={q}
                                options={state.options[index]}
                                handleQuestionUpdate={handleQuestionUpdate}
                                handleOptionUpdate={handleOptionUpdate}
                                handleAddOpClick={handleAddOpClick}
                            />
                        })}
                        <AiFillPlusCircle className="q-add"
                            onClick={handleAddQClick} />

                    </div>

                    <button type="submit" className="btn btn-success mt-4">
                        Submit
                    </button>

                </form>

            </div>

        </main>
    )
}


const QuestionTemplate = ({ qNo, text, handleQuestionUpdate, options, handleOptionUpdate, handleAddOpClick }) => {
    return (
        <div className="box">
            <input type="text"
                value={`${text}`}
                onChange={(e) => handleQuestionUpdate(qNo, e.target.value)}
            />
            {
                options.map((op, opId) => {
                    return <OptionTemplate key={opId} opNo={opId}
                        text={op}
                        qNo={qNo}
                        handleOptionUpdate={handleOptionUpdate} />
                })
            }
            <br />
            <button className="btn btn-sm btn-primary mt-2"
                onClick={(e) => { handleAddOpClick(e, qNo) }}>
                Add an option
            </button>
        </div>
    )
}

const OptionTemplate = (({ qNo, opNo, text, handleOptionUpdate }) => {
    return <div className="mt-3">
        <input type="radio" disabled />
        <input type="text" value={`${text}`}
            onChange={(e) => handleOptionUpdate(qNo, opNo, e.target.value)}
        />
    </div>
})
export default CreateTest
