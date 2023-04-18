import { firebaseConfig } from "./config/Config";
import { initializeApp } from "firebase/app";
// import config from "./config/Config";
import "./App.css";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Routes, Route } from "react-router-dom";
import { Contact } from "./pages/Contact";
import { Header } from "./components/Header";
const FirebaseApp = initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </div>
  );
}

export default App;
