import React from 'react';
import { Link } from 'react-router-dom';
import lecturer from '../../assets/lecturer.svg';
import student  from '../../assets/student.jpg';


function Welcome({name, role}) {
    return (
        <div className="intro my-5">
            <div className="mt-5 pt-4">
                <h1>Welcome to <strong>Assess-Board </strong>!</h1>
                <h4 className="pl-1 mt-4">
                    Hey, {name} !
                </h4>
                <h5 className="pl-1 mt-4">We are happy to have you on board</h5>
                <h5 className="pl-1 mt-4">What are you looking for ? 🤔</h5>
                {role === 'faculty'?
                    <div className="mt-4 pl-1">
                        <Link to="/create" className="mr-3 btn btn-outline-danger">
                            Create an assessment
                        </Link>
                        <Link to="/analysis" className="btn btn-dark">
                            Analysis
                        </Link>
                    </div>
                    :
                    <div className="mt-4 pl-1">
                        <Link to="/assessments" className="mr-3 btn btn-outline-danger">
                            Take an assessment
                        </Link>
                        <Link to="/analysis" className="btn btn-dark">
                            Analysis
                        </Link>
                    </div>
                }
            </div>        
            <img src={role === 'student' ? student : lecturer} alt="illustration w-25" className="illustration"></img>
        </div>
    )
}

export default Welcome
