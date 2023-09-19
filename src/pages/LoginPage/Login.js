import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import myImage from "../images/logoExe.png";
import "../LoginPage/Login.css";

export default function Login() {
  return (
    <div className="page">
      <div>
        <img src={myImage} alt="" className="logo" />
      </div>
      <div>
        <input className="email" type="text" placeholder="Email" />
      </div>
      <div>
        <input className="password" type="password" placeholder="Mật khẩu" />
      </div>
      <div>
        <select name="" id="" className="select">
          <option value="">Chủ xe</option>
          <option value="">Chủ hàng</option>
        </select>
      </div>
      
        <div className="forgotPass">
          <a href="" className="forgotPassLink">
            Quên mật khẩu?
          </a>
        </div>
        <div>
          <button className="login">Đăng nhập</button>
        </div>
        <div className="register">
          <Link to="/signUp" className="forgotPassLink">
            Đăng kí
          </Link>
        </div>
        
      
    </div>
  );
}
