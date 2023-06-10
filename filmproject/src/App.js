import "./App.css";
import { useState } from "react";
import ReactDOM from "react-dom";
//component
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
//page
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Signout } from "./pages/Signout";
import { Detail } from "./pages/Detail";
//context
import { NavContext } from "./contexts/NavContexts";

const NavRoutes = [
  { name: "Home", goto: "/" },
  { name: "About", goto: "/about" },
  { name: "Sign in", goto: "/signin" },
  { name: "Sign up", goto: "/signup" },
];

function App() {
  const [navItems, setNavItems] = useState(NavRoutes);

  return (
    <div className="App">
      <NavContext.Provider value={navItems}>
        <Header />
      </NavContext.Provider>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
