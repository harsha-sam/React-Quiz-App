import React, { useState, useEffect, useRef } from "react";
import clip from "../../assets/images/clip-girls-study-together.png";
import { LinearProgress } from "@material-ui/core"
import "./Login.css";

const Signin = ({ handleCurr, handleLogin }) => {
    const id = useRef(null);
    const password = useRef(null);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        id.current.focus();
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const uId = id.current.value;
        const pass = password.current.value;
        fetch("https://react-assessments.azurewebsites.net/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uId, password: pass }),
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    setIsValidPassword(false);
                    throw Error(
                        "Either you entered wrong credentials or something went wrong. Please, try again."
                    );
                }
            })
            .then((usr) => {
                handleLogin(usr);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)
            })
    }

    return (
        <section id="Login">
            <h1 className="mb-4 pl-1">
                We are <strong>Assess Board !</strong>
            </h1>
            <p className="pl-2 mb-2">
                Welcome Back, Please login to your account.<br></br>
            </p>
            <div className="mt-4 pl-2">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div>
                        <label htmlFor="uid">User ID</label>
                        <input
                            type="text"
                            className="form-newline"
                            id="uid"
                            required
                            ref={id}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            required
                            className="form-newline"
                            ref={password}
                        />
                        <span className="ml-1">
                            Don't have an account ? <p className="btn m-0 p-0" onClick={(e) => handleCurr(e, 'Register')}>Register here</p>
                        </span>
                    </div>
                    {!isValidPassword && (
                        <small className="text-danger">
                            Either you entered wrong credentials or something went wrong.
                            Please, try again.
                        </small>
                    )}
                    <div className="mt-4">

                        {
                            isLoading ?
                                <LinearProgress color="primary" className="mt-4 w-50" />
                                :
                                <button type="submit" className="btn btn-lg btn-block btn-dark">
                                    Login
                            </button>
                        }
                    </div>
                </form>
            </div>
        </section>
    )
}

const Register = ({ handleCurr }) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [role, setRole] = useState("");
    const [student, setStudent] = useState({
        "year": "",
        "section": "",
        "dept": ""
    })
    const [faculty, setFaculty] = useState({
        "dept": ""
    })
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidStudent, setIsValidStudent] = useState(false);
    const [isValidFaculty, setIsValidFaculty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true);
        if (role === "student") {
            if (isValidPassword && isValidStudent) {
                const info = {
                    uId: id,
                    password,
                    name,
                    role,
                    ...student
                }
                fetch("https://react-assessments.azurewebsites.net/register", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(info),
                })
                    .then((res) => {
                        if (res.status === 200) {
                            return res.json();
                        }
                        else {
                            throw Error(
                                "Something went Wrong !"
                            );
                        }
                    })
                    .then((msg) => {
                        console.log(msg);
                        setIsLoading(false)
                    })
                    .catch((err) => {
                        console.log(err);
                        setIsLoading(false)
                    })
            }
        }
        else if (role === "faculty") {
            if (isValidPassword && isValidFaculty) {
                const info = {
                    uId: id,
                    password,
                    role,
                    name,
                    ...faculty
                }
                fetch("https://react-assessments.azurewebsites.net/register", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(info),
                })
                    .then((res) => {
                        if (res.status === 200) {
                            return res.json();
                        }
                        else {
                            throw Error(
                                "Something went Wrong !"
                            );
                        }
                    })
                    .then((msg) => {
                        console.log(msg);
                        setIsLoading(false)
                    })
                    .catch((err) => {
                        console.log(err);
                        setIsLoading(false)
                    })
            }
        }
    }
    useEffect(() => {
        document.getElementById("uid").focus()
    }, [])
    useEffect(() => {
        if (password === passwordAgain) {
            setIsValidPassword(true)
        }
        else {
            setIsValidPassword(false)
        }
    }, [password, passwordAgain])
    useEffect(() => {
        if (faculty['dept'] !== "") {
            setIsValidFaculty(true)
        }
        else {
            setIsValidFaculty(false)
        }
    }, [faculty])
    useEffect(() => {
        if (student['dept'] !== "" && student['section'] !== "" && student['year'] !== "") {
            setIsValidStudent(true)
        }
        else {
            setIsValidStudent(false)
        }
    }, [student])
    return (
        <section id="Login">
            <h1 className="mb-4 pl-1">
                <strong>Create Account</strong>
            </h1>
            <div className="mt-4 pl-2">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <label htmlFor="uid">User ID</label>
                    <input
                        type="text"
                        className="form-newline"
                        id="uid"
                        value={id}
                        required
                        onChange={(e) => setId(e.target.value)}
                    />
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-newline"
                        id="name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        className="form-newline"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="passwordAgain">Confirm Password</label>
                    <div>
                        {!isValidPassword && (
                            <small className="text-danger p-0 m-0">
                                Passwords don't match. Check again
                            </small>
                        )}
                    </div>
                    <input
                        type="password"
                        id="passwordAgain"
                        required
                        className="form-newline"
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                    />
                    <div>
                        <div className="form-check-inline">
                            <input type="radio" name="role" id="student" className="form-check-input"
                                value="student"
                                required
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="student" className="form-check-label">Student</label>
                        </div>
                        <div className="form-check-inline ml-max">
                            <input type="radio" name="role" id="faculty" className="form-check-input"
                                value="faculty"
                                required
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="faculty" className="form-check-label">Faculty</label>
                        </div>
                    </div>
                    {role === "student" ?
                        <div className="mt-4">
                            <span>
                                <label>Year:</label>
                                <select className="form-select ml-2" name="year"
                                    onChange={(e) => setStudent({ ...student, year: e.target.value })}
                                    value={student.year}>
                                    <option disabled value="">-</option>
                                    <option value="1">I</option>
                                    <option value="2">II</option>
                                    <option value="3">III</option>
                                    <option value="4">IV</option>
                                </select>
                            </span>
                            <span className="ml-3">
                                <label>Dept:</label>
                                <select className="form-select ml-2" name="studdept"
                                    onChange={(e) => setStudent({ ...student, dept: e.target.value })}
                                    value={student.dept}>
                                    <option disabled value="">-</option>
                                    <option value="CSE">CSE</option>
                                    <option value="ECE">ECE</option>
                                    <option value="EEE">EEE</option>
                                    <option value="IT">IT</option>
                                    <option value="CE">CE</option>
                                    <option value="ME">ME</option>
                                </select>
                            </span>
                            <span className="ml-3">
                                <label>Section:</label>
                                <select className="form-select ml-2" name="section"
                                    onChange={(e) => setStudent({ ...student, section: e.target.value })}
                                    value={student.section}>
                                    <option disabled value="">-</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </span>
                            <div>
                                {!isValidStudent && (
                                    <small className="text-danger">
                                        Year, Dept and Section are required
                                    </small>
                                )}
                            </div>
                        </div>
                        :
                        (role === 'faculty' ?
                            <div className="mt-4">
                                <span>
                                    <label>Dept:</label>
                                    <select className="form-select ml-2" name="facdept"
                                        onChange={(e) => setFaculty({ ...faculty, dept: e.target.value })}
                                        value={faculty.dept}>
                                        <option disabled value="">-</option>
                                        <option value="CSE">CSE</option>
                                        <option value="ECE">ECE</option>
                                        <option value="EEE">EEE</option>
                                        <option value="IT">IT</option>
                                        <option value="CE">CE</option>
                                        <option value="ME">ME</option>
                                    </select>
                                </span>
                                <div>
                                    {!isValidFaculty && (
                                        <small className="text-danger">
                                            Dept is required
                                        </small>
                                    )}
                                </div>
                            </div>
                            :
                            <></>)
                    }
                    <div className="ml-1 mt-3">
                        Already have an account ? <p className="btn m-0 p-0" onClick={(e) => handleCurr(e, 'Signin')}>Login here</p>
                    </div>
                    <div className="mt-4">
                    {
                        isLoading ? 
                        <LinearProgress  color="primary" className="mt-4 w-50"/>  
                        :
                        <button type="submit" className="btn btn-lg btn-block btn-dark">
                            Sign Up
                        </button>
                    }
                    </div>
                </form>
            </div>
        </section>
    )
}

const Login = ({ handleLogin }) => {
    const [curr, setCurr] = useState("Signin");
    const handleCurr = (e, val) => {
        e.preventDefault();
        setCurr(val);
    };
    const map = {
        Signin: <Signin handleCurr={handleCurr} handleLogin={handleLogin} />,
        Register: <Register handleCurr={handleCurr} />,
    };
    return (
        <div className="signin">
            <div className="row">
                <div className="col-md-6 container-fluid">
                    <nav className="navbar">
                        <img src="https://img.icons8.com/dusk/100/000000/graph.png" alt="logo" />
                    </nav>
                    {map[curr] || <h2>Something went wrong !</h2>}
                </div>
                <div className="col-md-6 hero">
                    <img className="hero-img" src={clip} alt="" />
                </div>
            </div>
        </div>
    );
};
export default Login;
