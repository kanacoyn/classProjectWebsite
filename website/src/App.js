import { firebaseConfig } from "./config/Config";
import { initializeApp } from "firebase/App";
import "./App.css";

const FirebaseApp = initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hello World
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
