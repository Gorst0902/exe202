import React from "react";
import "../Footer/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <button className="fa fa-home">
          <i className="fa fa-home" />
        </button>
        <button className="fa fa-list">
          <i className="fa fa-list" />
        </button>
        <button className="fa fa-search search">
          <i className="fa fa-search" />
        </button>
        <button className="fa fa-bell">
          <i className="fa fa-bell" />
        </button>
        <button className="fa fa-gear">
          <i className="fa fa-gear" />
        </button>
      </div>
    </div>
  );
}
