import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Dashboard() {
  // Dữ liệu cho biểu đồ đường
  const lineChartData = [
    { date: "2023-10-01", users: 100 },
    { date: "2023-10-02", users: 150 },
    { date: "2023-10-03", users: 200 },
    { date: "2023-10-04", users: 120 },
    // Thêm dữ liệu người dùng truy cập theo ngày khác ở đây
  ];

  // Dữ liệu cho biểu đồ tròn so sánh vai trò
  const roleData = [
    { name: "User", value: 300 },
    { name: "Driver", value: 150 },
  ];

  // Dữ liệu cho biểu đồ cột thể hiện doanh thu từng ngày
  const revenueData = [
    { date: "2023-10-01", revenue: 500 },
    { date: "2023-10-02", revenue: 800 },
    { date: "2023-10-03", revenue: 600 },
    { date: "2023-10-04", revenue: 700 },
    // Thêm dữ liệu doanh thu từng ngày khác ở đây
  ];

  return (
    <div>
      <div>
        {/* Biểu đồ đường */}
        <LineChart width={800} height={400} data={lineChartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
        </LineChart>
      </div>

      <div>
        {/* Biểu đồ cột */}
        <BarChart width={800} height={400} data={revenueData}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}
