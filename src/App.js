import { Container } from 'reactstrap';
import Quiz from "./Components/Quiz/Quiz";
import CreateTest from "./Components/CreateTest/CreateTest";
import './App.css';

function App() {
    return (
        <Container className="my-5">
            {/* <h2 className="mb-3">Python</h2> */}
            {/* <Quiz /> */}
            <CreateTest />
        </Container>
    );
}

export default App;
