import React from "react";
import "../Footer/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <Link to="/driver">
          <button>
            <i className="fa-solid fa-house" />
          </button>
        </Link>
        <Link to="/lichsu">
          <button>
            <i className="fa-solid fa-list" />
          </button>
        </Link>
        {/* tìm kiếm */}
        <Link to="/timkiem">
          <button className="search">
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </Link>
        {/* đơn hàng đang nhận */}
        <Link to="/donhangdannhan">
          <button>
            <i className="fa-solid fa-bell" />
          </button>
        </Link>
        <Link to="/settings">
          <button>
            <i className="fa-solid fa-gear" />
          </button>
        </Link>
      </div>
    </div>
  );
}
