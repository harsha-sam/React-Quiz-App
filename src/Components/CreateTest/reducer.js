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

const reducer = (state, action) => {
    console.log(state);
    if (action.type === RESET_TO_DEFAULT) {
        return {
            host: "600be4456fc6443652568a27",
            testName: "",
            subject: "",
            questions: [""],
            options: [["", ""]],
            answers: [null],
            year: [],
            dept: [],
            section: [],
            dateAndTime: new Date()
        }
    }
    else if (action.type === FIELD_CHANGE) {
        const { name, val } = action.payLoad;
        return {
            ...state,
            [name]: val
        }
    }
    else if (action.type === SET_QUESTION) {
        return {
            ...state,
            questions: [...state.questions, ""],
            options: [...state.options, ["", ""]],
            answers: [...state.answers, null]
        }
    }
    else if (action.type === SET_OPTION) {
        const { qNo } = action.payLoad
        const newArray = [...state.options]
        newArray[qNo] = [...newArray[qNo], ""]
        return {
            ...state,
            options: newArray
        }
    }
    else if (action.type === UPDATE_QUESTION) {
        const { qNo, text } = action.payLoad
        const newArray = [...state.questions]
        newArray[qNo] = text
        return {
            ...state,
            questions: newArray
        }
    }
    else if (action.type === UPDATE_OPTIONS) {
        const { qNo, text, opNo } = action.payLoad
        const newArray = [...state.options]
        const qOptions = [...newArray[qNo]]
        qOptions[opNo] = text
        newArray[qNo] = qOptions
        return {
            ...state,
            options: newArray
        }
    }
    else if (action.type === REMOVE_QUESTION) {
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
    else if (action.type === REMOVE_OPTION) {
        const { qNo, opNo } = action.payLoad
        const newOpArray = [...state.options]
        const specificQOp = [...newOpArray[qNo]]
        const newAnswers = [...state.answers]
        specificQOp.splice(opNo, 1)
        if (newAnswers[qNo] === opNo) {
            newAnswers[qNo] = null
        }
        newOpArray[qNo] = specificQOp
        return {
            ...state,
            options: newOpArray,
            answers: newAnswers
        }
    }
    else if (action.type === UPDATE_ANSWER) {
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