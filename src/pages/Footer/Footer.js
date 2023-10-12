import React from "react";
import "../Footer/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <button className="fa fa-home" />
        <button className="fa fa-list" />
        <button className="fa fa-search search" />
        <button className="fa fa-bell" />
        <button className="fa fa-gear" />
      </div>
    </div>
  );
}
