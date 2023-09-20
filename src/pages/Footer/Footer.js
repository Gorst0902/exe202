import React from "react";
import "../Footer/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <button>
          <i className="fa-solid fa-house" />
        </button>
        <button>
          <i className="fa-solid fa-list" />
        </button>
        <button className="search">
          <i className="fa-solid fa-magnifying-glass" />
        </button>
        <button>
          <i className="fa-solid fa-bell" />
        </button>
        <button>
          <i className="fa-solid fa-gear" />
        </button>
      </div>
    </div>
  );
}
