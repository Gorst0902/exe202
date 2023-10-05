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
<<<<<<< HEAD
import ReservationDetail from "./pages/ReservationDetail/ReservationDetail";
=======
import AddressAutocomplete from "./pages/Booking/LocationService";
import AddressForm from "./pages/Booking/DeliveryForm";
>>>>>>> 6d528e1e199978de9e2a00a7263c97b0685bb2a7

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
<<<<<<< HEAD
            <Route path="/reservationDetail/:reservationId" element={<ReservationDetail />} />
=======
            <Route path="/user" element={<AddressAutocomplete />} />
            <Route path="/book" element={<AddressForm />} />
>>>>>>> 6d528e1e199978de9e2a00a7263c97b0685bb2a7
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
