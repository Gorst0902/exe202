import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Container,
  Grid,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddressForm(props) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [totalAmount, setTotalAmount] = useState();
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [isOrderNow, setIsOrderNow] = useState(true); // Mặc định đặt hàng ngay
  const [pickUpDateTime, setPickUpDateTime] = useState(null); // Thời gian đặt hàng lịch hẹn

  const [goodsDto, setGoodsDto] = useState({
    name: "",
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
  });

  const {
    distance,
    selectedServices,
    defaultServices,
    pickupAddress,
    deliveryAddress,
    pickupCoordinates,
    deliveryCoordinates,
  } = location.state || {};

  // Define allservice in the scope accessible to both functions
  const [allservice, setAllService] = useState([]);

  useEffect(() => {
    // Tạo một mảng 'selectedServiceIds' chứa ID từ 'selectedServices'
    const selectedServiceIds = selectedServices || [];

    // Tạo một mảng 'defaultServiceIds' chứa ID từ 'defaultServices'
    const defaultServiceIds =
      defaultServices.map((service) => service.id) || [];

    // Kết hợp cả hai mảng để tạo 'allservice', chứa các ID từ cả 'selectedServices' và 'defaultServices'
    const allservice = selectedServiceIds.concat(defaultServiceIds);
    setAllService(allservice); // Set the value of allservice
    // Gọi hàm tính tiền
    calculateAmount(distance, allservice);
  }, [selectedServices, defaultServices, distance]);

  const calculateAmount = (distance, serviceIds) => {
    // Tạo payload cho API request
    const payload = {
      distance: distance,
      serviceIds: serviceIds,
    };

    // Gọi API để tính tiền
    axios
      .post(
        "https://tsdlinuxserverapi.azurewebsites.net/api/Reservation/Calculate_Amount_By_Services_And_Km",
        payload,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`, // Thêm token vào header nếu cần
          // },
        }
      )
      .then((response) => {
        // Xử lý kết quả từ API ở đây, ví dụ: console.log(response.data);
        console.log(response.data);
        setTotalAmount(response.data.totalAmount);
      })
      .catch((error) => {
        // Xử lý lỗi ở đây, ví dụ: console.error(error);
      });
  };

  const handlePlaceOrder = () => {
    console.log(allservice); // Now you can access allservice here
    // Tạo payload cho API CreateReservation
    const createReservationPayload = {
      sendLocation: pickupAddress.label,
      latitudeSendLocation: pickupCoordinates.lat,
      longitudeSendLocation: pickupCoordinates.lng,
      receiveLocation: deliveryAddress.label,
      latitudeReciveLocation: deliveryCoordinates.lat,
      longitudeReceiveLocation: deliveryCoordinates.lng,
      recipientName: recipientName,
      recipientPhone: recipientPhone,
      distance: distance,
      isNow: isOrderNow, // Sử dụng trạng thái đặt hàng
      pickUpDateTime: isOrderNow ? null : pickUpDateTime, // Sử dụng thời gian đặt hàng (nếu là lịch hẹn)
      goodsDto: {
        name: goodsDto.name,
        weight: goodsDto.weight,
        length: goodsDto.length,
        width: goodsDto.width,
        height: goodsDto.height,
      },
      totalPrice: totalAmount, // Sử dụng totalAmount đã tính trước đó
      serviceIds: allservice, // Sử dụng allservice đã tính trước đó
      paymentMethod: "Momo", // Mặc định là Momo
    };

    // Gọi API để hoàn tất đặt hàng
    axios
      .post(
        "https://tsdlinuxserverapi.azurewebsites.net/api/Reservation/CreateReservation",
        createReservationPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Xử lý kết quả từ API ở đây
        console.log(response.data);
        // Chuyển hướng hoặc thực hiện các hành động cần thiết sau khi đặt hàng thành công

        // Sau khi đặt hàng thành công, kiểm tra loại thiết bị
        const { deeplink, paymentUrl } = response.data;

        // Sau khi lấy dữ liệu, kiểm tra loại thiết bị
        const isMobileDevice =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          );

        if (isMobileDevice) {
          window.location.href = deeplink;
        } else {
          window.location.href = paymentUrl;
        }

        // navigate("/order-success"); // Ví dụ: Chuyển hướng đến trang thông báo đặt hàng thành công
      })
      .catch((error) => {
        // Xử lý lỗi từ API ở đây
        console.error(error);
        toast.error("Vui lòng thử lại!");
        // Hiển thị thông báo lỗi hoặc thực hiện các hành động cần thiết sau khi đặt hàng thất bại
      });
  };

  return (
    <Container className="mt-4" maxWidth="xs">
      <h5 className="mb-3">Thông tin đơn hàng</h5>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Tên người nhận"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#F37022",
                  },
                  "&:hover fieldset": {
                    borderColor: "#F37022",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#F37022",
                  },
                },
                "& label.Mui-focused": {
                  color: "#F37022", // Màu label khi trỏ vào ô input
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Số điện thoại"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#F37022",
                  },
                  "&:hover fieldset": {
                    borderColor: "#F37022",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#F37022",
                  },
                },
                "& label.Mui-focused": {
                  color: "#F37022", // Màu label khi trỏ vào ô input
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <h6>Thông tin hàng hóa</h6>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Tên hàng hóa"
              value={goodsDto.name}
              onChange={(e) =>
                setGoodsDto({ ...goodsDto, name: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#F37022",
                  },
                  "&:hover fieldset": {
                    borderColor: "#F37022",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#F37022",
                  },
                },
                "& label.Mui-focused": {
                  color: "#F37022", // Màu label khi trỏ vào ô input
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Cân nặng"
              type="number"
              value={goodsDto.weight}
              onChange={(e) =>
                setGoodsDto({ ...goodsDto, weight: parseFloat(e.target.value) })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#F37022",
                  },
                  "&:hover fieldset": {
                    borderColor: "#F37022",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#F37022",
                  },
                },
                "& label.Mui-focused": {
                  color: "#F37022", // Màu label khi trỏ vào ô input
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Chiều dài"
              type="number"
              value={goodsDto.length}
              onChange={(e) =>
                setGoodsDto({ ...goodsDto, length: parseFloat(e.target.value) })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#F37022",
                  },
                  "&:hover fieldset": {
                    borderColor: "#F37022",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#F37022",
                  },
                },
                "& label.Mui-focused": {
                  color: "#F37022", // Màu label khi trỏ vào ô input
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Chiều ngang"
              type="number"
              value={goodsDto.width}
              onChange={(e) =>
                setGoodsDto({ ...goodsDto, width: parseFloat(e.target.value) })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#F37022",
                  },
                  "&:hover fieldset": {
                    borderColor: "#F37022",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#F37022",
                  },
                },
                "& label.Mui-focused": {
                  color: "#F37022", // Màu label khi trỏ vào ô input
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Chiều cao"
              type="number"
              value={goodsDto.height}
              onChange={(e) =>
                setGoodsDto({ ...goodsDto, height: parseFloat(e.target.value) })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#F37022",
                  },
                  "&:hover fieldset": {
                    borderColor: "#F37022",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#F37022",
                  },
                },
                "& label.Mui-focused": {
                  color: "#F37022", // Màu label khi trỏ vào ô input
                },
              }}
            />
          </Grid>{" "}
          <Grid item xs={12}>
            <RadioGroup
              row
              aria-label="Order Type"
              name="orderType"
              value={isOrderNow ? "now" : "schedule"}
              onChange={(e) => setIsOrderNow(e.target.value === "now")}
            >
              <FormControlLabel
                value="now"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: "#F37022", // Đổi màu dấu tick thành F37022
                      },
                    }}
                  />
                }
                label="Đặt hàng ngay"
              />
              <FormControlLabel
                value="schedule"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: "#F37022", // Đổi màu dấu tick thành F37022
                      },
                    }}
                  />
                }
                label="Đặt lịch hẹn"
              />
            </RadioGroup>
          </Grid>
          {!isOrderNow && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                type="datetime-local"
                value={pickUpDateTime}
                onChange={(e) => setPickUpDateTime(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#F37022",
                    },
                    "&:hover fieldset": {
                      borderColor: "#F37022",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#F37022",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#F37022", // Màu label khi trỏ vào ô input
                  },
                }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "80px",
              }}
            >
              <h5>Tổng cộng: {totalAmount}₫</h5>
            </Grid>
          </Grid>
          <Grid
            className="container"
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              textAlign: "center",
            }}
            item
            xs={12}
          >
            <Button
              className="mb-3"
              style={{
                borderRadius: "12px",
                backgroundColor: "#F37022",
                height: "50px",
                width: "100%", // Make the button full-width
                color: "white", // Set text color to white for better visibility
              }}
              onClick={handlePlaceOrder}
            >
              Xác nhận đặt hàng
            </Button>
          </Grid>
        </Grid>
        <ToastContainer />
      </form>
    </Container>
  );
}

export default AddressForm;