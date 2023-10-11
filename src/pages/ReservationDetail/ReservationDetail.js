import React, { useEffect, useState } from "react";
import Reservation from "../Reservation/Reservation";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ReservationShipping from "../ReservationShipping/ReservationShipping";
import "../ReservationDetail/ReservationDetail.css";

export default function ReservationDetail() {
  const { reservationId } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const { token } = useAuth();
  const { userId } = useAuth();

  const [shippingResponse, setShippingResponse] = useState(null);

  const navigate = useNavigate();

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
  }

  async function fetchReservationDetail(reservationId) {
    // Fetch the reservation details here using the reservationId and include headers
    const response = await fetch(
      `https://tsdlinuxserverapi.azurewebsites.net/api/Reservation/GetAwaitingDriverReservationDetail?reservationId=${reservationId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include your authentication token here
          "Content-Type": "application/json", // You can adjust content type as needed
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching reservation detail: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  async function reservationAction(reservationId) {
    const response = await fetch(
      `https://tsdlinuxserverapi.azurewebsites.net/api/Reservation/DriverReservationAction?driverId=${userId}&reservationId=${reservationId}&action=0`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include your authentication token here
          "Content-Type": "application/json", // You can adjust content type as needed
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching reservation detail: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  }

  async function handleReservationActionAndSetResponse(reservationId) {
    
    try {
      const response = await reservationAction(reservationId);
      // Handle the response as needed
      console.log(response);
      setShippingResponse(response);
      navigate('/reservationShipping');
      return response; // Return the response data
    } catch (error) {
      // Handle errors
      console.error(error);
      throw error; // Rethrow the error so you can handle it in the component
    }
  }

  useEffect(() => {
    // Fetch the reservation detail based on the reservationId
    fetchReservationDetail(reservationId)
      .then((data) => {
        setSelectedItem(data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  }, [reservationId]);

  if (!selectedItem) {
    // Handle the case when selectedItem is null or undefined
    return <p>No item selected</p>;
  }

  return (
    <div>
      <Header title="Chi tiết đơn hàng" />
      <div className="detail">
        <div className="detail__content">
          <h5>Địa chỉ vận chuyển</h5>
          <div className="transportation">
            <p>
              <i class="fa-regular fa-circle-up"></i> Địa chỉ bốc hàng
            </p>
            <p className="send">{selectedItem.sendLocation}</p>
            <p>
              <i class="fa-regular fa-circle-down"></i> Địa chỉ xuống hàng
            </p>
            <p className="receive">{selectedItem.reciveLocation}</p>
          </div>
          <h5>Thông tin hàng hóa</h5>
          <div className="goods__content">
            {selectedItem.isNow == true ? (
              <p>
                Thời gian bốc hàng:{" "}
                {formatDateTime(selectedItem.pickUpDateTime)}
              </p>
            ) : (
              <p>Thời gian bốc hàng: Đang cần xe bây giờ</p>
            )}
            <p>Loại hàng hóa: {selectedItem.goodsDto.name}</p>
            <p>Trọng tải: {selectedItem.goodsDto.weight}kg</p>
          </div>
          <h5>Yêu cầu xe</h5>
          <div className="car">
            <p>Yêu cầu xe: {selectedItem.vehicleType}</p>
          </div>
        </div>
      </div>
      <div className="detail__footer">
        <button
          className="orderCar"
          onClick={() => handleReservationActionAndSetResponse(selectedItem.id)}
        >
          NHẬN ĐƠN
        </button>
      </div>
      <ReservationShipping response={shippingResponse} />
    </div>
  );
}
