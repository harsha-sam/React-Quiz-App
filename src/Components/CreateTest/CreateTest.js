import React, { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

function CreateTest() {
    const [q, setQ] = useState([]);
    return (
        <div>
            <h2>Create New Form</h2>
            <div>
                <form>
                    <div className="box">
                        <div className="mb-2">
                            <label>Name of the test:</label>
                            <input type="text" id="testName" name="testName"
                                className="ml-2"
                            />
                        </div>
                        <div>
                            <label >Subject:</label>
                            <input type="text" id="subject" name="subject"
                                className="ml-2"
                            />
                        </div>
                    </div>
                    <div>
                        {q}
                        <AiFillPlusCircle className="q-add"
                            onClick={() => setQ([...q, <QuestionTemplate qNo={q.length + 1} />])} />
                    </div>
                    <button type="submit" className="btn btn-success mt-4">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}


const QuestionTemplate = ({ qNo }) => {
    const [ops, setOps] = useState([]);
    return (
        <div className="box">
            <input type="text" placeholder={`${qNo}. Question`} />
            {ops}
            <br />
            <button className="btn btn-sm btn-primary mt-2"
                onClick={(e) => {
                    e.preventDefault();
                    setOps([...ops, <OptionTemplate opNo={ops.length + 1} />])
                }}>
                Add an option
            </button>
        </div>
    )
}

const OptionTemplate = (({ opNo }) => {
    return <div className="mt-3">
        <input type="radio" disabled />
        <input type="text" placeholder={`${opNo}. Option`} />
    </div>
})
export default CreateTest
