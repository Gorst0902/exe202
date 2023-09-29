import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./pages/Footer/Footer";
import Reservation from "./pages/Reservation/Reservation";

function App() {
  return (
    <div>
      <AuthProvider>
        {" "}
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/driver" element={<Reservation />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
