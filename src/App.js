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
import AdminLoginForm from "./pages/LoginPage/AdminLogin";
import AdminListItem from "./pages/AdminPage/ListItem";
import UserList from "./pages/AdminPage/UserList";
import OrderList from "./pages/AdminPage/OrderList";
import TransactionList from "./pages/AdminPage/Transaction";
import OrderDetail from "./pages/AdminPage/OrderDetail";
import Dashboard from "./pages/AdminPage/Dashboard";
import AutoComplete from "./pages/Booking/Autocomplete";
import OrderSuccess from "./pages/RedirectPage/OrderSuccess";
import ErrorPage from "./pages/RedirectPage/Error";
import OrderFail from "./pages/RedirectPage/OrderFail";
import SettingList from "./pages/SettingPage/SettingList";
import UserInfo from "./pages/SettingPage/UserInfo";
import VehicleInfo from "./pages/SettingPage/VehicleInfo";
import UserTransaction from "./pages/SettingPage/UserTransaction";

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

            {/* Admin Page */}
            <Route path="/admin/login" element={<AdminLoginForm />} />
            {/* <Route path="/admin/dashboard" element={<AdminListItem />} /> */}
            <Route path="/admin/userlist" element={<UserList />} />
            <Route path="/admin/orderlist" element={<OrderList />} />
            <Route path="/admin/orderdetail/:id" element={<OrderDetail />} />
            <Route path="/admin/transaction" element={<TransactionList />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />

            {/* test Autocomplete */}
            <Route path="/test" element={<AutoComplete />} />

            {/* Redirect Page */}
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orderfail" element={<OrderFail />} />
            <Route path="/error" element={<ErrorPage />} />

            {/* Setting List */}
            <Route path="/settings" element={<SettingList />} />
            <Route path="/userinfo" element={<UserInfo />} />
            <Route path="/vehicleinfo" element={<VehicleInfo />} />
            <Route path="/transaction" element={<UserTransaction />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
