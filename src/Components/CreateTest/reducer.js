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
            options: [...state.options, ["", ""]],
            answers: [...state.answers, [null]]
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
        const newAnswers = [...state.answers]
        newAnswers.splice(qNo, 1)
        return {
            ...state,
            questions: newQArray,
            options: newOpArray, 
            answers: newAnswers
        }
    }
    else if (action.type === "REMOVE_OPTION") {
        const { qNo, opNo } = action.payLoad
        const newOpArray = [...state.options]
        const specificQOp = [...newOpArray[qNo]]
        const newAnswers = [...state.answers]
        specificQOp.splice(opNo, 1)
        newOpArray[qNo] = specificQOp
        if (newAnswers[qNo] === opNo) {
            newAnswers[qNo] = null
        }
        return {
            ...state,
            options: newOpArray,
            answers: newAnswers
        }
    }
    else if (action.type === "UPDATE_ANSWER") {
        const { qNo, opNo } = action.payLoad
        const newArray = [...state.answers]
        newArray[qNo] = opNo
        return {
            ...state,
            answers: newArray
        }
    }
    throw new Error('no matching action type');
}

export default reducer;