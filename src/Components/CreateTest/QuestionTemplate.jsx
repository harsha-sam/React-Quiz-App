import { useContext } from "react";
import { TestContext } from "./CreateTest.jsx";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DeleteIcon from "@material-ui/icons/Delete";

const QuestionTemplate = ({ qNo, text, options }) => {
    const {
        handleQuestionUpdate,
        handleRemoveQuestion,
        handleAddOpClick,
    } = useContext(TestContext);
    return (
        <div className="box w-75">
            <div className="row mb-4">
                <TextareaAutosize
                    className="form-control col-10 ml-3"
                    rowsMax={4}
                    value={`${text}`}
                    onChange={(e) => handleQuestionUpdate(qNo, e.target.value)}
                    placeholder={`${qNo + 1}. Enter your question here`}
                    required
                />
                <span title="Delete">
                    <RemoveCircleIcon
                        className="icon mt-2 ml-4"
                        onClick={() => handleRemoveQuestion(qNo)}
                    />
                </span>
            </div>
            <div className="mb-3">
                {options.map((op, opId) => {
                    return <OptionTemplate key={opId} opNo={opId} text={op} qNo={qNo} />;
                })}
            </div>
            <button
                className={`btn btn-sm btn-primary ${options.length === 6 && "disabled"
                    }`}
                onClick={(e) => {
                    options.length < 6 && handleAddOpClick(e, qNo);
                }}
            >
                Add an option
            </button>
        </div>
    );
};

const OptionTemplate = ({ qNo, opNo, text }) => {
    const { handleOptionUpdate, handleRemoveOption, answers, handleAnswerSelect } = useContext(TestContext);
    return (
        <div className="mb-3">
            <input type="radio"
                name={qNo}
                checked={answers[qNo] === opNo && true}
                onChange={() => handleAnswerSelect(qNo, opNo)}
                required
            />
            <input
                type="text"
                value={`${text}`}
                onChange={(e) => handleOptionUpdate(qNo, opNo, e.target.value)}
                className="form-control form-control-inline ml-2"
                placeholder={`${opNo + 1}. Option`}
                required
            />
            <span title="Remove">
                <DeleteIcon
                    className="icon ml-4"
                    onClick={() => handleRemoveOption(qNo, opNo)}
                />
            </span>
        </div>
    );
};

export default QuestionTemplate;
