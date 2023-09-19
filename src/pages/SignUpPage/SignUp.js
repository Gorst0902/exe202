import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import myImage from "../images/logoExe.png";
import "../SignUpPage/SignUp.css"

export default function SignUp() {
  return (
    <div className="page">
      <div>
        <img src={myImage} alt="" className="logo" />
      </div>
      <div>
        <input className="name" type="text" placeholder="Tên người dùng" />
      </div>
      <div>
        <input className="email" type="text" placeholder="Email" />
      </div>
      <div>
        <input className="password" type="password" placeholder="Mật khẩu" />
      </div>
      <div>
        <input className="phone" type="text" placeholder="Số điện thoại" />
      </div>
      <div>
        <select name="" id="" className="select">
          <option value="">Chủ xe</option>
          <option value="">Chủ hàng</option>
        </select>
      </div>
      <div>
        <button className="signUp">Đăng Ký</button>
      </div>
    </div>
  );
}
