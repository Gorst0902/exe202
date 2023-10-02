import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function LocationComponent() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useAuth();

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
      console.log(token);
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer  ${token}`, // Replace 'your-api-key' with your actual API key if needed
          "Content-Type": "application/json",
        },
      });

      // Assuming the response contains JSON data
      const data = response.data;

      // Handle the data as needed
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const apiUrl = `https://tsdlinuxserverapi.azurewebsites.net/api/Reservation/GetAwaitingDriverReservation?Latitude=${latitude}&Longitude=${longitude}&isNow=true`;

  getApiData(apiUrl);

  return (
    <div>
      {latitude && longitude ? (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      ) : (
        <p>Đang cập nhật vị trí của bạn</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default LocationComponent;
