import React, { useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import myImage from "../images/logoExe.png";
import "../LoginPage/Login.css";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("Chủ xe");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://tsddeliveryapi.azurewebsites.net/api/User/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber,
            password,
            roleId,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        login(data.token);
        navigate(`/${data.roleName.toLowerCase()}`);
      } else {
        if (response.status === 400) {
          setError("Số điện thoại hoặc mật khẩu không chính xác");
        } else {
          setError("Đã xảy ra lỗi khi đăng nhập");
        }
      }
    } catch (error) {
      setError("Đã xảy ra lỗi khi đăng nhập");
    }
  };

  return (
    <div className="page">
      <div>
        <img src={myImage} alt="" className="logo" />
      </div>
      <div>
        <input
          className="email"
          type="text"
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <input
          className="password"
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <select
          name=""
          id=""
          className="select"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
        >
          <option value="1cb47d53-a12c-4fd6-a4cc-08dba3d1f4f1">Chủ xe</option>
          <option value="0170ca46-f56b-4575-a4cb-08dba3d1f4f1">Chủ hàng</option>
        </select>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="forgotPass">
        <a href="" className="forgotPassLink">
          Quên mật khẩu?
        </a>
      </div>
      <div>
        <button className="login" onClick={handleLogin}>
          Đăng nhập
        </button>
      </div>
      <div className="register">
        <Link to="/signUp" className="forgotPassLink">
          Đăng kí
        </Link>
      </div>
    </div>
  );
}
