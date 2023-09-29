import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import "../Reservation/Reservation.css";
import Header from "../Header/Header";

export default function Reservation() {
  const [journeyData, setJourneyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
  }

  useEffect(() => {
    axios
      .get(
        "https://tsddeliveryapi.azurewebsites.net/api/Reservation/GetAllReservation"
      )
      .then((response) => {
        setJourneyData(response.data);
        console.log(journeyData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Header title="Đơn cần xe" />
      <div className="page__journey">
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          journeyData.map((journey, index) => (
            <div key={index}>
              <div className="journey d-flex justify-content-between">
                <div className="start">{journey.sendLocation}</div>
                <i className="fa-solid fa-arrow-right"></i>
                <div className="end">{journey.reciveLocation}</div>
              </div>
              <hr />
              <div className="list__journey">
                <div className="time d-flex justify-content-between">
                  <p>Thời gian: </p>
                  <p>{formatDateTime(journey.pickUpDateTime)}</p>
                </div>
                <div className="goods d-flex justify-content-between">
                  <p>Tên hàng hóa: </p>
                  <p>{journey.goodsDto.name}</p>
                </div>
                <div className="payload d-flex justify-content-between">
                  <p>Trọng tải: </p>
                  <p>{journey.goodsDto.weight}kg</p>
                </div>
              </div>
              <hr />
              <div className="money__journey d-flex justify-content-between">
                <p>Báo giá: </p>
                <p>{journey.totallPrice}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}
