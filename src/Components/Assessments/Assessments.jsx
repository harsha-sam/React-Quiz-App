import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Assessments = ({ year, dept, section }) => {
    const [tests, setTests] = useState([])
    useEffect(() => {
        const fetchTests = setTimeout(() => {
            fetch("http://localhost:3000/assessments", {
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
            fetch("http://localhost:3000/assessments", {
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
        return <h1 className="text-center">No tests available.</h1>
    }
    return (
        <section>
            {
                tests.map((test) => {
                    return <div key={test._id}>
                        <h3>{test.name}</h3>
                        <h5>{test.subject}</h5>
                        <Link className="btn" to={`/quiz/${test._id}`}>
                            Take test
                        </Link>
                    </div>
                })
            }
        </section>
    )

}
export default Assessments;