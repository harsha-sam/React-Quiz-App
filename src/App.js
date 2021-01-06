import { Container } from 'reactstrap';
import Quiz from "./Components/Quiz/Quiz.jsx";
import CreateTest from "./Components/CreateTest/CreateTest.jsx";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {
    return (
        <Container className="my-5">
            <Router>
                <Route exact path="/">
                    <h1> Welcome to the application !</h1>
                    <Link to="/create">
                        Create a Quiz
                    </Link>
                </Route>
                <Route exact path="/create">
                    <CreateTest />
                </Route>
                <Route exact path="/quiz">
                    <Quiz />
                </Route>
            </Router>
        </Container>
    );
}

export default App;
