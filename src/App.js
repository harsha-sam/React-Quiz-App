import Quiz from "./Components/Quiz/Quiz.jsx";
import CreateTest from "./Components/CreateTest/CreateTest.jsx";
import Login from "./Components/Login/Login.jsx"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Route exact path="/">
                <h1> Welcome to the application !</h1>
                <Link to="/create">
                    Create a Quiz
                </Link>
            </Route>
            <Route exact path="/Login">
                <Login />
            </Route>
            <Route exact path="/create">
                <CreateTest />
            </Route>
            <Route exact path="/quiz">
                <Quiz />
            </Route>
        </Router>
    );
}

export default App;
