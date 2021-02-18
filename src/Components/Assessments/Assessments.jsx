import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Assessments = ({ year, dept, section }) => {
    const [tests, setTests] = useState([])
    useEffect(() => {
        const fetchTests = setTimeout(() => {
            fetch("https://react-assessments.azurewebsites.net/assessments", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ year, dept, section })
            })
                .then((res) => res.json())
                .then((res) => setTests(res))
        }, (60 - new Date().getSeconds()) * 1000)
        return (() => clearTimeout(fetchTests))
    })
    useEffect(() => {
        const fetchTests = setTimeout(() => {
            fetch("https://react-assessments.azurewebsites.net/assessments", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ year, dept, section })
            })
                .then((res) => res.json())
                .then((res) => setTests(res))
        })
        return (() => clearTimeout(fetchTests))
    }, [year, dept, section])

    if (tests.length === 0) {
        return <section>
            <h2 className="text-center">No tests available at this moment.</h2>
        </section>
    }
    return (
        <section className="container-fluid">
            <div className="card-container">
                {
                    tests.map((test) => {
                        return <div className="card box mr-3" style={{width: "18rem"}} key={test._id}>
                            <div className="card-body">
                                <h5 className="card-title">{test.name}</h5>
                                <h6 className="card-text">{test.subject}</h6>
                                <Link className="btn btn-primary" to={`/quiz/${test._id}`}>
                                    Take test
                                </Link>
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
    )

}
export default Assessments;