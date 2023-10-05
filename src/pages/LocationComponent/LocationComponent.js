import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Reservation from "../Reservation/Reservation";
import { Link, useNavigate } from "react-router-dom";
import ReservationDetail from "../ReservationDetail/ReservationDetail";

function LocationComponent() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const [isLocationComponentVisible, setLocationComponentVisibility] =
    useState(true); // State for controlling visibility

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    console.log("yes");
    setLocationComponentVisibility(false);
  
    const selectedReservationId = data[index].id;
    const selectedData = data[index]; // Store the selected item
    setSelectedItem(selectedData); // Set the selected item in the state
    console.log('Selected reservationId:', selectedReservationId);
    navigate(`/reservationDetail/${selectedReservationId}`);
  };

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
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setError("Bạn chưa bật vị trí.");
          } else {
            setError(err.message);
          }
        }
      );
    } else {
      setError("Geolocation is not available in this browser.");
    }
  }, []);

  async function getApiData(apiUrl) {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer  ${token}`, // Replace 'your-api-key' with your actual API key if needed
          "Content-Type": "application/json",
        },
      });

      // Assuming the response contains JSON data
      const responseData = response.data;
      console.log("responseData: ", responseData);
      setLoading(false);
      // Update the 'data' state with the fetched data
      setData(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const apiUrl = `https://tsdlinuxserverapi.azurewebsites.net/api/Reservation/GetAwaitingDriverReservation?Latitude=${latitude}&Longitude=${longitude}&isNow=true`;

      // Call getApiData when latitude and longitude are available
      getApiData(apiUrl);
    }
  }, [latitude, longitude, token]); // Add dependencies

  return (
    <div>
      {latitude && longitude ? (
        <p className="text-center">Đã xác định được vị trí của bạn</p>
      ) : (
        <p className="text-center">Đang cập nhật vị trí của bạn</p>
      )}
      {error && <p>Error: {error}</p>}
      {isLocationComponentVisible ? (
        <div className="page__journey">
          {loading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            data.map((item, index) => (
              <div key={index} onClick={() => handleItemClick(index)}>
                <div className="journey d-flex justify-content-between">
                  <div className="start">{item.sendLocation}</div>
                  <i className="fa-solid fa-arrow-right"></i>
                  <div className="end">{item.reciveLocation}</div>
                </div>
                <hr />
                <div className="list__journey">
                  <div className="time d-flex justify-content-between">
                    <p>Thời gian: </p>
                    <p>{formatDateTime(item.pickUpDateTime)}</p>
                  </div>
                  <div className="goods d-flex justify-content-between">
                    <p>Tên hàng hóa: </p>
                    <p>{item.goodsDto.name}</p>
                  </div>
                  <div className="payload d-flex justify-content-between">
                    <p>Trọng tải: </p>
                    <p>{item.goodsDto.weight}kg</p>
                  </div>
                </div>
                <hr />
                <div className="money__journey d-flex justify-content-between">
                  <p>Báo giá: </p>
                  <p>{item.totallPrice}vnd</p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : null}
      {!isLocationComponentVisible && (
        <ReservationDetail selectedItem={selectedItem} />
      )}
    </div>
  );
}

export default LocationComponent;
