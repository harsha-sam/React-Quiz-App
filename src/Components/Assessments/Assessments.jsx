import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Assessments = ({year, dept, section}) => {
    const [tests, setTests] =  useState([])
    useEffect(() => {
        const fetchTests = setTimeout(() => {
            fetch("http://localhost:3000/assessments", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({year, dept, section})
            })
                .then((res) => res.json())
                .then((res) => setTests(res))
        }, 60000)
        return (() => clearTimeout(fetchTests))
    })
    useEffect(() => {
        const fetchTests = setTimeout(() => {
            fetch("http://localhost:3000/assessments", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({year, dept, section})
            })
                .then((res) => res.json())
                .then((res) => setTests(res))
        })
        return (() => clearTimeout(fetchTests))
    }, [year, dept, section])
    return(
        <section>
            {
                tests.map((test) => {
                    return <div>
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