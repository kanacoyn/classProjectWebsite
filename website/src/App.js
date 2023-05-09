import { firebaseConfig } from "./config/Config";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import "./App.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

//page
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
//component
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
//context
import { NavContext } from "./contexts/NavContexts";
import { FBAuthContext } from "./contexts/FBAuthContext";
// import { NavItem } from "react-bootstrap";

const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(FirebaseApp);

const NavRoutes = [
  { name: "Home", goto: "/" },
  { name: "About", goto: "/about" },
  { name: "Contact", goto: "/contact" },
  { name: "Sign in", goto: "/signin" },
  { name: "Sign up", goto: "/signup" },
];

const AuthNavRoutes = [
  { name: "Home", goto: "/" },
  { name: "About", goto: "/about" },
  { name: "Contact", goto: "/contact" },
  { name: "Profile", goto: "/profile" },
  { name: "Sign out", goto: "/signout" },
];

function App() {
  const [navItems, setNavItems] = useState(NavRoutes);
  // const [auth, setAuth] = useState(null);

  onAuthStateChanged(FirebaseAuth, (user) => {
    if (user) {
      setAuth(user);
      setNavItems(AuthNavRoutes);
    } else {
      setAuth(null);
      setNavItems(NavRoutes);
    }
  });

  return (
    <div className="App">
      <NavContext.Provider value={navItems}>
        <Header />
      </NavContext.Provider>
      <FBAuthContext.Provider value={FirebaseAuth}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
        </Routes>
      </FBAuthContext.Provider>
    </div>
  );
}

export default App;
