import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import AdminListItem from "./ListItem";

export default function Dashboard() {
  const [data, setData] = useState(null);

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
      });
  }, []);
  console.log(data);
  const colors = ["#0074e4", "#f37022"];
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
        {data && (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="value"
                data={data}
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Grid>
    </Grid>
  );
}
