import React, { useState, useEffect, useRef } from 'react';
import "./Login.css";
import enigma from "../../assets/images/enigma.png";
import welcome from "../../assets/images/welcome.gif";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';

const Signin = ({handleCurr, handleLogin}) => {
    const id = useRef(null);
    const password = useRef(null);
    const [isValidPassword, setIsValidPassword] = useState(true);

    useEffect(() => {
        id.current.focus()
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const uId = id.current.value;
        const pass = password.current.value;
        fetch("https://react-assessments.azurewebsites.net/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({uId, password: pass}),
        })
            .then((res) => {
                if (res.status === 200){
                    return res.json()
                }
                else{
                    setIsValidPassword(false);
                    throw Error("Either you entered wrong credentials or something went wrong. Please, try again.")
                }
            })
            .then((usr) =>{ 
                handleLogin(usr);
            })
            .catch((err) => {
                console.log(err);
            })

    }
    return <section id="Login">
        <h1 className="mb-4 pl-1">We are <strong>ACE</strong></h1>
        <p className="pl">
            Welcome Back, Please login to your account.
        </p>
        <div className="mt-4 pl">
            <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="uid"><strong>User Id</strong></label>
                <input type="text"
                    className="form-newline" 
                    id="uid" 
                    required 
                    ref={id}
                    />
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" id="password" required 
                className="form-newline" 
                ref={password}
                />
                <input type="checkbox" id="rememberme"/>
                <label htmlFor="rememberme" className="ml-1">Remember me</label>
                {/* <button className="ml btn my-0 mr-0 p-0" 
                    type="button"
                    onClick={(e) => handleCurr(e, "ForgotPass")}>
                    <strong>Forgot Password</strong>
                </button> */}
                <br />
                {!isValidPassword && <small className="text-danger">Either you entered wrong credentials or something went wrong. Please, try again.</small>}
                <button type="submit" className="btn btn-dark mt-3">Login</button>
            </form>
        </div>
    </section>
}
const ForgotPass = ({handleCurr}) => {
    return <section id="ForgotPassword">
                <h1 className="mb-4 pl-1">Forgot your <strong>password?</strong></h1>
                <p className="pl">
                    We'll help you reset it and get back on track. 
                </p>
                <div className="pl mt-5">
                    <form>
                        <label htmlFor="email"><strong>Email Address</strong></label>
                        <input type="email" className="form-newline"/>
                        <button type="button" 
                        className="btn btn-dark" 
                        id="reset-btn"
                        onClick={(e) => handleCurr(e, "Verification")}>
                        Reset Password
                        </button>
                        <button type="button" 
                        className="btn"
                        onClick={(e) => handleCurr(e, "Signin")}
                        >
                        Back to sign in
                        </button>
                    </form>
                </div>
    </section>
}

const Verification = ({handleCurr}) => {
    return <section id="Verification">
                <h1 className="mb-4 pl-1"><strong>Verification</strong></h1>
                <p className="pl mb-2">
                    Enter the verification code we just sent you on your email address.
                </p>
                <div className="pl mt-5">
                    <form action="">
                        <label htmlFor="otp"></label>
                        <input type="text" className="otp" maxLength="1"  />
                        <input type="text" className="otp" maxLength="1" />
                        <input type="text" className="otp" maxLength="1" />
                        <input type="text" className="otp" maxLength="1" />
                        <input type="text" className="otp" maxLength="1" />
                        <input type="text" className="otp" maxLength="1" />
                        <p className="mt-4">if you didn't recieve a code! 
                            <button className="btn m-0 p-0 pl-1" 
                            type="button">
                                <strong>Resend</strong>
                            </button> 
                        </p>
                        <button type="button" className="btn btn-dark btn-block mt-5" id="verify-btn"
                        onClick={(e) => handleCurr(e, "ResetPassword")}>Verify</button>
                    </form>
                </div>
    </section>
}

const ResetPassword = () => {
    return <section id="newpass">
                <h1 className="mb-4 pl">Reset your <strong>password</strong></h1>
                <div className="pl mt-5">
                    <form action="">
                        <label htmlFor="password"><strong>New Password</strong></label>
                        <input type="password" className="form-newline"/>
                        <label htmlFor="password"><strong>Re-enter Password</strong></label>
                        <input type="password" className="form-newline"/>
                        <button type="button" className="btn btn-dark mt-3" id="done-btn">Done</button>
                    </form>
                </div>
    </section>
}

const Login = ({handleLogin}) => {
    const [curr, setCurr] = useState("Signin");
    const handleCurr = (e, val) => {
        e.preventDefault();
        setCurr(val);
    }
    const map = {
        "Signin": <Signin handleCurr={handleCurr} handleLogin={handleLogin}/>,
        "ForgotPass": <ForgotPass handleCurr={handleCurr}/>,
        "Verification": <Verification handleCurr={handleCurr}/>,
        "ResetPassword": <ResetPassword handleCurr={handleCurr}/>
    }
    // console.log("render", curr, map[curr])
    return (
        <div className="signin">
            <div className="row">
                <div className="col-md-7 container-fluid">
                    <nav className="navbar">
                       <img src={enigma} className="navbar-brand brand-img" alt="enigmacodex-logo" />
                    </nav>
                    {map[curr] || <h2>Something went wrong !</h2>}
                </div>
                <div className="col-md-5 hero">
                    <div className="hero-img"></div>
                    <img className="d-block w-100" src={welcome} alt="" />
                    <div className="hero-img"></div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <section id="footer" className="container-fluid">
                        <a href="https://github.com/EnigmaCodex-ACE"
                            target='_blank'rel="noreferrer">
                            <span className="footer-icons">
                                <GitHubIcon />
                            </span>
                        </a>
                        <a href="/"
                            target='_blank' rel="noreferrer">
                            <span className="footer-icons">
                                <LinkedInIcon />
                            </span>
                        </a>
                        <a href="mailto: enigmacodexace@gmail.com"
                            target='_blank' rel="noreferrer">
                            <span className="footer-icons">
                                <EmailIcon/>
                            </span>
                        </a>
                        <p className="copyright-text">© copyright 2020 ACE</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
export default Login;