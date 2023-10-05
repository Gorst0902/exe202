import React from "react";
import myImage from "../images/logoExe.png";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import "../HomePage/HomePage.css";
import save from "../images/save.png";
import ship from "../images/ship.png";
import improve from "../images/improve.png";
import { Link } from "react-router-dom";
import UserHeader from "../UserPage/UserHeader";
import UserFooter from "../UserPage/UserFooter";

export default function UserPage() {
  return (
    <>
      <UserHeader />

      <div className="homepage container"></div>
      <UserFooter />
    </>
  );
}
