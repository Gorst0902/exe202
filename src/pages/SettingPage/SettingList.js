import React from "react";
import UserHeader from "../UserPage/UserHeader";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Person, DirectionsCar, History } from "@mui/icons-material";
import UserFooter from "../UserPage/UserFooter";
import { useAuth } from "../../context/AuthContext";

export default function SettingList() {
  const { token } = useAuth();

  // Lấy roleUser từ localStorage
  const roleUser = localStorage.getItem("roleUser");

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
              <DirectionsCar />
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
            <History />
          </ListItemIcon>
          <ListItemText primary="Lịch sử giao dịch" />
        </ListItem>
      </List>
      {roleUser === "USER" && <UserFooter />}
      {roleUser === "DRIVER" && <Footer />}
    </div>
  );
}
