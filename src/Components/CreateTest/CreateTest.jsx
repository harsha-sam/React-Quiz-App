import React, { useReducer } from 'react';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

const defaultState = {
    testName: "",
    subject: "",
    questions: [""],
    options: [["", ""]]
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
            questions: [...state.questions, action.payLoad.text],
            options: [...state.options, ["", ""]]
        }
    }
    else if (action.type === "SET_OPTION") {
        const { qNo, text } = action.payLoad
        const newArray = [...state.options]
        newArray[qNo] = [...newArray[qNo], text]
        return {
            ...state,
            options: newArray
        }
    }
    else if (action.type === "UPDATE_QUESTION") {
        const { qNo, text } = action.payLoad
        const newArray = [...state.questions]
        newArray[qNo] = text
        return {
            ...state,
            questions: newArray
        }
    }
    else if (action.type === "UPDATE_OPTIONS") {
        const { qNo, text, opNo } = action.payLoad
        const newArray = [...state.options]
        newArray[qNo][opNo] = text
        return {
            ...state,
            options: newArray
        }
    }
    else if (action.type === "REMOVE_QUESTION") {
        const { qNo } = action.payLoad
        const newQArray = [...state.questions]
        newQArray.splice(qNo, 1)
        const newOpArray = [...state.options]
        newOpArray.splice(qNo, 1)
        return {
            ...state,
            questions: newQArray,
            options: newOpArray
        }
    }
    throw new Error('no matching action type');
}

function CreateTest() {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const handleAddQClick = () => {
        dispatch({ type: "SET_QUESTION", payLoad: { text: "" } })
    }

    const handleAddOpClick = (e, qNo) => {
        dispatch({ type: "SET_OPTION", payLoad: { qNo, text: "" } })
    }
    const handleQuestionUpdate = (qNo, text) => {
        dispatch({ type: "UPDATE_QUESTION", payLoad: { qNo, text } })
    }

    const handleOptionUpdate = (qNo, opNo, text) => {
        dispatch({ type: "UPDATE_OPTIONS", payLoad: { text, opNo, qNo } })
    }

    const handleRemoveQuestion = (qNo) => {
        if(state.questions.length > 1){
            dispatch({ type: "REMOVE_QUESTION", payLoad: { qNo } })
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }

    return (
        <main>
            <h2>Create New Form</h2>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <div className="box w-50">
                        <div className="mb-3">
                            <label htmlFor="testName"
                                className="form-label">
                                Name of the test
                            </label>
                            <input type="text"
                                id="testName"
                                name="testName"
                                className="form-control w-50"
                                onChange={(e) => dispatch({
                                    type: "TEST_NAME_CHANGE",
                                    payLoad: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subject"
                                className="form-label">
                                Subject
                            </label>
                            <input type="text"
                                id="subject"
                                name="subject"
                                className="form-control w-50"
                                onChange={(e) => dispatch({
                                    type: "SUBJECT_CHANGE",
                                    payLoad: e.target.value
                                })}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        {state.questions.map((q, index) => {
                            return <QuestionTemplate key={index} qNo={index} text={q}
                                options={state.options[index]}
                                handleQuestionUpdate={handleQuestionUpdate}
                                handleOptionUpdate={handleOptionUpdate}
                                handleAddOpClick={handleAddOpClick}
                                handleRemoveQuestion={handleRemoveQuestion}
                            />
                        })}
                        <AddCircleRoundedIcon className="icon"
                            onClick={handleAddQClick} />
                    </div>
                    <button type="submit"
                        className="btn btn-success mt-4">
                        Submit
                    </button>
                </form>
            </div>
        </main>
    )
}


const QuestionTemplate = ({ qNo, text, handleQuestionUpdate, options, handleOptionUpdate, handleAddOpClick, handleRemoveQuestion }) => {
    return (
        <div className="box w-75">
            <div>
                <input type="text"
                    className="form-control form-control-inline mb-3 w-75"
                    value={`${text}`}
                    onChange={(e) => handleQuestionUpdate(qNo, e.target.value)}
                    placeholder={`${qNo + 1}. Enter your question here`}
                    required
                />
                <CancelRoundedIcon className="icon ml-4"
                    onClick={() => handleRemoveQuestion(qNo)}
                />
            </div>
            <div className="mb-3">
                {
                    options.map((op, opId) => {
                        return <OptionTemplate key={opId} opNo={opId}
                            text={op}
                            qNo={qNo}
                            handleOptionUpdate={handleOptionUpdate} />
                    })
                }
            </div>
            <p className={`btn btn-sm btn-primary ${options.length === 6 && "disabled"}`}
                onClick={(e) => { options.length < 6 && handleAddOpClick(e, qNo) }}>
                Add an option
            </p>
        </div>
    )
}

const OptionTemplate = (({ qNo, opNo, text, handleOptionUpdate }) => {
    return <div className="mb-3">
        <input type="radio"
            disabled />
        <input type="text" value={`${text}`}
            onChange={(e) => handleOptionUpdate(qNo, opNo, e.target.value)}
            className="form-control form-control-inline ml-2"
            placeholder={`${opNo + 1}. Option`}
            required
        />
    </div>
})
export default CreateTest
