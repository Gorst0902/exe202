import {
  Grid,
  TextField,
  Container,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  Label,
} from "recharts";
import AdminListItem from "./ListItem";
import { format, startOfMonth } from "date-fns";
import { BeatLoader, PulseLoader } from "react-spinners";
import { css } from "@emotion/react";
import moment from "moment/moment";

const override = css`
  margin-top: 20px;
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export default function Dashboard() {
  const [data, setData] = useState(null);
  const currentDate = new Date();
  const defaultStartDate = startOfMonth(currentDate); // Ngày đầu tháng
  const defaultEndDate = currentDate; // Ngày hiện tại
  const [vehicleData, setVehicleData] = useState(null);

  const [dateRange, setDateRange] = useState({
    startDate: format(defaultStartDate, "yyyy-MM-dd"),
    endDate: format(defaultEndDate, "yyyy-MM-dd"),
  });

  // const [dateRange, setDateRange] = useState({
  //   startDate: "null",
  //   endDate: "null",
  // });

  const [loginData, setLoginData] = useState(null);
  const [revenueData, setRevenueData] = useState(null); // New state variable for revenue data

  const [chartType, setChartType] = useState("day");
  const handleChartTypeChange = (type) => {
    setChartType(type);
  };
  const weeklyRevenueData = {}; // Tổng doanh thu theo tuần
  const monthlyRevenueData = {}; // Tổng doanh thu theo tháng

  // Tính toán doanh thu hàng tuần và hàng tháng
  if (revenueData) {
    revenueData.forEach((entry) => {
      const date = entry.date;
      const weekOfYear = moment(date, "DD/MM/YYYY").isoWeek(); // Sử dụng moment.js để tính tuần
      const month = moment(date, "DD/MM/YYYY").format("MM/YYYY");

      // Tổng doanh thu hàng tuần
      if (!weeklyRevenueData[weekOfYear]) {
        weeklyRevenueData[weekOfYear] = 0;
      }
      weeklyRevenueData[weekOfYear] += entry.revenue;

      // Tổng doanh thu hàng tháng
      if (!monthlyRevenueData[month]) {
        monthlyRevenueData[month] = 0;
      }
      monthlyRevenueData[month] += entry.revenue;
    });
  }

  useEffect(() => {
    // Gọi API và cập nhật state khi dữ liệu được tải về
    fetch(
      "https://tsdlinuxserverapi.azurewebsites.net/api/DashBoard/GetCountPercentUser"
    )
      .then((response) => response.json())
      .then((result) => {
        const total = result.userCount + result.driverCount;
        const userPercent = parseFloat(
          ((result.userCount / total) * 100).toFixed(2)
        );
        const driverPercent = parseFloat(
          ((result.driverCount / total) * 100).toFixed(2)
        );

        setData([
          { name: "User", value: userPercent },
          { name: "Driver", value: driverPercent },
        ]);
      })
      .catch((error) => {
        // Xử lý lỗi khi không thể lấy dữ liệu
        console.error("Error fetching data:", error);
      });

    // Gọi API và cập nhật state khi dữ liệu đăng nhập được tải về
    fetch(
      `https://tsdlinuxserverapi.azurewebsites.net/api/DashBoard/GetUserLoginCount?from=${dateRange.startDate}&to=${dateRange.endDate}`
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.userLoginDayByDays) {
          // Định dạng lại ngày tháng
          const formattedLoginData = result.userLoginDayByDays.map((item) => ({
            ...item,
            date: format(new Date(item.date), "dd/MM/yyyy"),
          }));
          setLoginData(formattedLoginData);
        }
      })
      .catch((error) => {
        // Xử lý lỗi khi không thể lấy dữ liệu
        console.error("Error fetching login data:", error);
      });

    // Gọi API để lấy dữ liệu tài xế theo từng loại xe
    fetch(
      "https://tsdlinuxserverapi.azurewebsites.net/api/DashBoard/GetVehicleByVehicleType"
    )
      .then((response) => response.json())
      .then((result) => {
        setVehicleData(result);
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });

    // Gọi API để lấy dữ liệu doanh thu
    fetch(
      `https://tsdlinuxserverapi.azurewebsites.net/api/DashBoard/GetRevenueDataByTime?from=${dateRange.startDate}&to=${dateRange.endDate}`
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.revenueDataDayByDayResponses) {
          // Định dạng lại ngày tháng
          // Định dạng lại dữ liệu
          const formattedRevenueData = result.revenueDataDayByDayResponses.map(
            (item) => ({
              ...item,
              date: format(new Date(item.date), "dd/MM/yyyy"),

              revenue: item.totalRevenueReceived - item.totalPayouts,

              formattedRevenue: new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.totalRevenueReceived - item.totalPayouts),
            })
          );

          setRevenueData(formattedRevenueData);
        }
      })
      .catch((error) => {
        // Xử lý lỗi khi không thể lấy dữ liệu
        console.error("Error fetching revenue data:", error);
      });
  }, [dateRange]);

  console.log(data);
  console.log(loginData);
  console.log(revenueData);

  const colors = ["#0074e4", "#f37022"];
  const customColors = [
    "#f37022",
    "#0074e4",
    "#e28743",
    "#abdbe3",
    "#dd1831",
    "#4db290 ",
  ];

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDateRange({ ...dateRange, [name]: value });
  };

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          border: "1px solid #F37022",
        }}
        item
        xs={2}
      >
        <AdminListItem />
      </Grid>

      {/* Main Content */}
      <Grid item xs={10} className="mb-5 mt-4">
        <Container>
          <h4 className="mb-4">Dashboard</h4>
          <Grid className="mb-4" container spacing={2}>
            <Grid item xs={6}>
              {" "}
              <Paper elevation={3}>
                <Typography
                  style={{ paddingTop: "30px" }}
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  className="fw-bold"
                >
                  Phân bổ vai trò
                </Typography>

                {data && (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie dataKey="value" data={data} outerRadius={80} label>
                        {data.map((entry, index) => (
                          <Cell key={index} fill={colors[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="row"
                >
                  {data &&
                    data.map((entry, index) => (
                      <Box
                        className="mx-2"
                        marginBottom={"70px"}
                        key={index}
                        display="flex"
                        alignItems="center"
                        flexDirection="row"
                      >
                        <div
                          style={{
                            backgroundColor: colors[index],
                            width: 20,
                            height: 20,
                            marginRight: 5,
                          }}
                        ></div>
                        <Typography variant="body2">{entry.name}</Typography>
                      </Box>
                    ))}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              {" "}
              {vehicleData ? (
                <Paper elevation={3}>
                  <Typography
                    style={{ paddingTop: "20px" }}
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    className="fw-bold"
                  >
                    Số lượng xe
                  </Typography>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={vehicleData}
                        dataKey="quantity"
                        nameKey="vehicleType"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {vehicleData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={customColors[index % customColors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="row"
                    flexWrap="wrap"
                  >
                    {vehicleData &&
                      vehicleData.map((entry, index) => (
                        <Box
                          className="mx-2"
                          marginBottom={"20px"}
                          key={index}
                          display="flex"
                          alignItems="center"
                          flexDirection="row"
                          width="33.33%" // Sử dụng 33.33% để chia thành 3 cột
                        >
                          <div
                            style={{
                              backgroundColor: customColors[index],
                              width: 20,
                              height: 20,
                              marginRight: 5,
                            }}
                          ></div>
                          <Typography variant="body2">
                            {entry.vehicleType}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </Paper>
              ) : (
                <Container
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PulseLoader css={override} size={10} color={"#F37022"} />
                </Container>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} spacing={3}>
              <Box display="flex" justifyContent="" marginBottom={2}>
                <TextField
                  label="Từ ngày"
                  type="date"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleDateChange}
                />
                <div className="divider my-auto" />
                <TextField
                  label="Tới ngày"
                  type="date"
                  name="endDate"
                  value={dateRange.endDate}
                  onChange={handleDateChange}
                />
              </Box>

              <Paper elevation={3} className="mb-5">
                <Typography
                  style={{ paddingTop: "20px", paddingBottom: "20px" }}
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  className="fw-bold"
                >
                  Lượt truy cập theo ngày
                </Typography>
                {loginData ? (
                  <ResponsiveContainer width="100%" height={450}>
                    <LineChart
                      data={loginData}
                      margin={{ top: 5, right: 50, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        name="Lượt truy cập"
                        type="monotone"
                        dataKey="totalUserLogin"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Container
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PulseLoader
                      css={override} // Define the CSS styles for the loading spinner (you can customize it)
                      size={10} // Set the size of the spinner
                      color={"#F37022"} // Customize the color of the spinner// Set loading to true when reservationData is null
                    />
                  </Container>
                )}
              </Paper>
              <button
                className={`btn-dashboard ${
                  chartType === "day" ? "selected" : ""
                }`}
                onClick={() => handleChartTypeChange("day")}
              >
                Ngày
              </button>
              <button
                className={`btn-dashboard ${
                  chartType === "week" ? "selected" : ""
                }`}
                onClick={() => handleChartTypeChange("week")}
              >
                Tuần
              </button>
              <button
                className={`btn-dashboard ${
                  chartType === "month" ? "selected" : ""
                }`}
                onClick={() => handleChartTypeChange("month")}
              >
                Tháng
              </button>
              {chartType === "day" && (
                <Paper elevation={3}>
                  <Typography
                    style={{ paddingTop: "20px", paddingBottom: "20px" }}
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    className="fw-bold"
                  >
                    Doanh thu theo ngày
                  </Typography>
                  {revenueData ? (
                    <ResponsiveContainer width="100%" height={425}>
                      <BarChart
                        data={revenueData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) =>
                            new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(value)
                          }
                        />
                        <Legend />
                        <Bar
                          name="Doanh thu"
                          dataKey="revenue"
                          fill="#f37022"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <Container
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PulseLoader
                        css={override} // Define the CSS styles for the loading spinner (you can customize it)
                        size={10} // Set the size of the spinner
                        color={"#F37022"} // Customize the color of the spinner// Set loading to true when reservationData is null
                      />
                    </Container>
                  )}
                </Paper>
              )}

              {chartType === "week" && (
                <Paper elevation={3}>
                  <Typography
                    style={{ paddingTop: "20px", paddingBottom: "20px" }}
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    className="fw-bold"
                  >
                    Doanh thu theo Tuần
                  </Typography>
                  {weeklyRevenueData ? (
                    <ResponsiveContainer width="100%" height={425}>
                      <BarChart
                        data={Object.keys(weeklyRevenueData).map((week) => ({
                          week: `Tuần ${week}`,
                          revenue: weeklyRevenueData[week],
                        }))}
                        margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) =>
                            new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(value)
                          }
                        />
                        <Legend />
                        <Bar
                          name="Doanh thu"
                          dataKey="revenue"
                          fill="#f37022"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    // Hiển thị spinner hoặc thông báo tải dữ liệu
                    <Container
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PulseLoader css={override} size={10} color={"#F37022"} />
                    </Container>
                  )}
                </Paper>
              )}

              {chartType === "month" && (
                <Paper elevation={3}>
                  <Typography
                    style={{ paddingTop: "20px", paddingBottom: "20px" }}
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    className="fw-bold"
                  >
                    Doanh thu theo Tháng
                  </Typography>
                  {monthlyRevenueData ? (
                    <ResponsiveContainer width="100%" height={425}>
                      <BarChart
                        data={Object.keys(monthlyRevenueData).map((month) => ({
                          month,
                          revenue: monthlyRevenueData[month],
                        }))}
                        margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) =>
                            new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(value)
                          }
                        />
                        <Legend />
                        <Bar
                          name="Doanh thu"
                          dataKey="revenue"
                          fill="#f37022"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    // Hiển thị spinner hoặc thông báo tải dữ liệu
                    <Container
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PulseLoader css={override} size={10} color={"#F37022"} />
                    </Container>
                  )}
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}
