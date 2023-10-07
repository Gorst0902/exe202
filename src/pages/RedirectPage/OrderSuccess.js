import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import success from "../images/success.png";
import UserHeader from "../UserPage/UserHeader";
import Footer from "../Footer/Footer";

export default function OrderSuccess() {
  return (
    <div>
      <UserHeader />
      <Container
        className="redirect"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <img style={{ width: "90px" }} src={success} alt="Success" />
        <Typography variant="h4" gutterBottom>
          Đặt hàng thành công
        </Typography>
        <Button
          component={Link}
          to="/user"
          variant="outlined"
          size="large"
          sx={{ borderColor: "#F37022", color: "#F37022" }} // Thay đổi màu viền thành F37022
        >
          Về trang chủ
        </Button>
      </Container>
      <Footer />
    </div>
  );
}
