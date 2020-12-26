import Quiz from "./Components/Quiz/Quiz";
import { Container } from 'reactstrap';
import './App.css';

function App() {
    return (
        <Container className="my-5">
            <h2 className="mb-3">Python</h2>
            <Quiz />
        </Container>
    );
}

export default App;
