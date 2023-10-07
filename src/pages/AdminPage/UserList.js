import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdminListItem from "./ListItem";
import { Container, Grid, Select, MenuItem } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Button } from "react-bootstrap";

export default function UserList() {
  const { token } = useAuth();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data from the API with the Bearer token
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://tsdlinuxserverapi.azurewebsites.net/api/User/GetAllUsers",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      let apiUrl;
      if (newStatus === "Active") {
        apiUrl = `https://tsdlinuxserverapi.azurewebsites.net/api/User/ActiveUser?userId=${userId}`;
      } else {
        apiUrl = `https://tsdlinuxserverapi.azurewebsites.net/api/User/DisableUser?userId=${userId}`;
      }

      const response = await fetch(apiUrl, {
        method: "POST", // or your desired HTTP method
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Update the user's status in the local state
        setUserData((prevUserData) =>
          prevUserData.map((user) =>
            user.id === userId ? { ...user, isDelete: !user.isDelete } : user
          )
        );
      } else {
        console.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <Grid container sx={{ display: "flex" }}>
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
      <Grid item xs={10}>
        <Container className="my-4">
          <h4>Danh sách người dùng</h4>{" "}
          <TableContainer
            component={Paper}
            className="mt-4"
            sx={{ borderRadius: "15px" }}
          >
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#F37022" }}>
                <TableRow>
                  <TableCell className="fw-bold text-white">
                    Tên người dùng
                  </TableCell>
                  <TableCell className="fw-bold text-white" align="center">
                    Email
                  </TableCell>
                  <TableCell className="fw-bold text-white" align="center">
                    Số điện thoại
                  </TableCell>
                  <TableCell className="fw-bold text-white" align="center">
                    Vai trò
                  </TableCell>
                  <TableCell className="fw-bold text-white" align="center">
                    Trạng thái
                  </TableCell>
                  <TableCell className="fw-bold" align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData
                  .filter((user) => user.roleName !== "ADMIN") // Filter out users with role "ADMIN"
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="fw-bold">{user.fullName}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">{user.phoneNumber}</TableCell>
                      <TableCell align="center">
                        {user.roleName === "USER"
                          ? "Chủ hàng"
                          : user.roleName === "DRIVER"
                          ? "Chủ xe"
                          : user.roleName}
                      </TableCell>

                      <TableCell align="center">
                        <Select
                          sx={{
                            height: "40px",
                            width: "130px",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#F37022", // Đổi màu border thành #F37022
                              borderRadius: "15px", // Thêm border-radius: 15px
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#F37022", // Màu border khi hover
                            },
                            "&:focus .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#F37022", // Màu border khi focus
                            },
                          }}
                          value={user.isDelete ? "Inactive" : "Active"}
                          onChange={(e) =>
                            handleStatusChange(user.id, e.target.value)
                          }
                        >
                          <MenuItem value="Active">Hoạt động</MenuItem>
                          <MenuItem value="Inactive">Khóa</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        {user.roleName === "DRIVER" && (
                          <Button
                            style={{
                              backgroundColor: "#F37022", // Đổi màu nền thành #F37022
                              borderRadius: "12px", // Thêm border-radius: 15px
                              color: "white",
                              borderColor: "#F37022", // Đổi màu chữ thành trắng (tùy chọn)
                            }}
                            onClick={() => {
                              // Thực hiện hành động khi nút được nhấn
                            }}
                          >
                            Chi tiết xe
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Grid>
    </Grid>
  );
}
