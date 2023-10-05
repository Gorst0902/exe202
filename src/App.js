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
import ReservationDetail from "./pages/ReservationDetail/ReservationDetail";
import AddressAutocomplete from "./pages/Booking/LocationService";
import AddressForm from "./pages/Booking/DeliveryForm";
import History from "./pages/UserHistory/UserHistory";
import HistoryDetail from "./pages/UserHistory/HistoryDetail";
import PageUserHistory from "./pages/UserHistory/FormUserHistory";
import UserHeader from "./pages/UserPage/UserHeader";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/HomePage/UserHomePage";

function App() {
  return (
    <div>
      <AuthProvider>
        {" "}
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/driver" element={<Reservation />} />
            <Route
              path="/reservationDetail/:reservationId"
              element={<ReservationDetail />}
            />
            <Route path="/user" element={<UserPage />} />
            <Route path="/create" element={<AddressAutocomplete />} />
            <Route path="/book" element={<AddressForm />} />
            <Route path="/userhistory" element={<PageUserHistory />} />
            <Route path="/userhistory/:id" element={<HistoryDetail />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
