import React, {useState} from 'react';
import Quiz from "./Components/Quiz/Quiz.jsx";
import CreateTest from "./Components/CreateTest/CreateTest.jsx";
import Homepage from "./Components/Homepage/Homepage.jsx";
import Welcome from "./Welcome";
import Login from "./Components/Login/Login.jsx"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FaDumbbell } from 'react-icons/fa';
import { IoIosRocket } from 'react-icons/io';
import { RiUserSettingsFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        _id: "600d10baa3c590190d7b9b87",
        name: "Harsha",
        year: 3,
        dept: "CSE",
        section: "A",
        sId: {
            _id: "600d10baa3c590190d7b9b86",
            uId: "18AG1A0549",
            role: "student"
        },
        __v: 0,
        role: "student"
    });
    const sectionHeader = {
        'My Progress': <IoIosRocket className="section-icon"/>,
        'Assesments': <FaDumbbell className="section-icon"/>
    }
    const sectionFooter = {
        'Account Settings': <RiUserSettingsFill className="section-icon"/>,
        'Log Out' : <FiLogOut className="section-icon"/>
    }
    const handleLogin = (info) => {
        setUser(info)
        setIsLoggedIn(true);
    }
    // if (!isLoggedIn){
    //     return (
    //         <Router>
    //             <Route path="*">
    //                 <Login handleLogin={handleLogin}/>
    //             </Route>
    //         </Router>
    //     )
    // }
    return (
        <Router>
            <Route exact path="/">
                <Homepage sectionHeader={sectionHeader} sectionFooter={sectionFooter} ChildComponent={<Welcome name={user.name}/>}/>
            </Route>
            <Route exact path="/create">
                <Homepage sectionHeader={sectionHeader} sectionFooter={sectionFooter} ChildComponent={<CreateTest host={user._id}/>}/>
            </Route>
            <Route exact path="/quiz">
                <Quiz />
            </Route>
        </Router>
    );
}

export default App;
