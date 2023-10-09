import React from "react";
import UserHeader from "../UserPage/UserHeader";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Person,
  DirectionsCar,
  AccountBalanceWallet,
  Description,
} from "@mui/icons-material";

import UserFooter from "../UserPage/UserFooter";
import { useAuth } from "../../context/AuthContext";

export default function SettingList() {
  const { token } = useAuth();

  // Lấy roleUser từ localStorage
  const roleUser = localStorage.getItem("roleUser");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Chuyển hướng sau khi logout
  };
  return (
    <div>
      <UserHeader />
      <List>
        <ListItem button component={Link} to="/userinfo">
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Thông tin cá nhân" />
        </ListItem>

        {roleUser === "USER" && (
          <ListItem button component={Link} to="/info">
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText primary="Thông tin doanh nghiệp" />
          </ListItem>
        )}

        {roleUser === "DRIVER" && (
          <ListItem button component={Link} to="/vehicleinfo">
            <ListItemIcon>
              <DirectionsCar />
            </ListItemIcon>
            <ListItemText primary="Thông tin xe" />
          </ListItem>
        )}

        <ListItem button component={Link} to="/transaction">
          <ListItemIcon>
            <AccountBalanceWallet />
          </ListItemIcon>
          <ListItemText primary="Lịch sử giao dịch" />
        </ListItem>
      </List>
      {roleUser === "USER" && <UserFooter />}
      {roleUser === "DRIVER" && <Footer />}
      <div style={{ display: "grid", placeItems: "center" }}>
        {" "}
        <Button
          onClick={handleLogout}
          className="mb-3"
          style={{
            borderRadius: "12px",
            backgroundColor: "#F37022",
            height: "50px",
            width: "80%",
            color: "white",
            position: "absolute", // Đặt vị trí của button là tuyệt đối
            bottom: "80px", // Đặt khoảng cách từ dưới lên (có thể điều chỉnh tùy ý)
          }}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
