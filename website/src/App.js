import { firebaseConfig } from "./config/Config";
import { initializeApp } from "firebase/app";
// import config from "./config/Config";
import "./App.css";

import { Test } from "./components/Test";
const FirebaseApp = initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Test />
    </div>
  );
}

export default App;
