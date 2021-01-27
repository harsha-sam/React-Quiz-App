import React, { useState } from 'react';
import Quiz from "./Components/Quiz/Quiz.jsx";
import CreateTest from "./Components/CreateTest/CreateTest.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Welcome from "./Components/Welcome/Welcome";
import Login from "./Components/Login/Login.jsx"
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { FaDumbbell } from 'react-icons/fa';
import { IoIosRocket } from 'react-icons/io';
import { RiUserSettingsFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Assessments from './Components/Assessments/Assessments.jsx';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const sectionFooter = [
        <Link to='/settings'>
            <ListItem button>
                <RiUserSettingsFill className="section-icon" />
                <ListItemText primary='Account Settings' />
            </ListItem>
        </Link>,
        <ListItem button onClick={() => {
            setIsLoggedIn(false);
            setUser({})
        }}>
            <FiLogOut className="section-icon" />
            <ListItemText primary='Log Out' />
        </ListItem>
    ]
    const handleLogin = (info) => {
        setUser(info)
        setIsLoggedIn(true);
    }
    if (!isLoggedIn) {
        return (
            <Router>
                <Route path="*">
                    <Login handleLogin={handleLogin}/>
                </Route>
            </Router>
        )
    }
    if (user.role === 'faculty') {
        const sectionHeader = [
            <Link to='/create'>
                <ListItem button>
                    <IoIosRocket className="section-icon" />
                    <ListItemText primary='Create'/>
            </ListItem>
            </Link>,
            <Link to='/analysis'>
                <ListItem button>
                    <FaDumbbell className="section-icon" />
                    <ListItemText primary='Analysis'/>
                </ListItem>
            </Link>
        ]

        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Navbar sectionHeader={sectionHeader}
                            sectionFooter={sectionFooter}
                            ChildComponent={<Welcome name={user.name} role={user.role} />} />
                    </Route>
                    <Route path="/create">
                        <Navbar
                            sectionHeader={sectionHeader}
                            sectionFooter={sectionFooter}
                            ChildComponent={<CreateTest host={user._id} />} />
                    </Route>
                    <Route path="*">
                        <h2>This page doesn't exist or you can't access this page<Link to="/">Home</Link></h2>
                    </Route>
                </Switch>
            </Router>
        )
    }
    const sectionHeader = [
        <Link to='/progress'>
            <ListItem button>
                <IoIosRocket className="section-icon" />
                <ListItemText primary="My Progress" />
            </ListItem>
        </Link>,
        <Link to='/assessments'>
            <ListItem button>
                <FaDumbbell className="section-icon" />
                <ListItemText primary="Assessments"/>
            </ListItem>
        </Link>,
    ]
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Navbar sectionHeader={sectionHeader}
                        sectionFooter={sectionFooter}
                        ChildComponent={<Welcome name={user.name} role={user.role} />} />
                </Route>
                <Route exact path="/quiz/:id" children={<Quiz/>} />
                <Route exact path="/assessments">
                    <Assessments {...user}/>
                </Route>
                <Route path="*">
                    <h2>This page doesn't exist or you can't access this page, go back to <Link to="/">Home</Link></h2>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
