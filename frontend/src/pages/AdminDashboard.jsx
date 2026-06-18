import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import {
  Link,
} from "react-router-dom";
function AdminDashboard() {
  const [stats,
    setStats] =
    useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics =
    async () => {
      const token =
        localStorage.getItem(
          "adminToken"
        );

      const response =
        await axios.get(
          "http://localhost:5000/api/admin/analytics",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setStats(
        response.data
      );
    };

  if (!stats)
    return (
      <h2>
        Loading...
      </h2>
    );

  return (
    <div
      style={{
        maxWidth:
          "1200px",
        margin:
          "40px auto",
      }}
    >
      <h1>
        Admin Dashboard
      </h1>

      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(5,1fr)",
          gap:
            "20px",
        }}
      >
        <div
  style={{
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  }}
>
  <Link
    to="/admin/products"
    style={{
      textDecoration:
        "none",
      padding:
        "12px 20px",
      background:
        "#1976d2",
      color:
        "white",
      borderRadius:
        "8px",
    }}
  >
    Manage Products
  </Link>

  <Link
    to="/admin/advertisements"
    style={{
      textDecoration:
        "none",
      padding:
        "12px 20px",
      background:
        "#388e3c",
      color:
        "white",
      borderRadius:
        "8px",
    }}
  >
    Manage Advertisements
  </Link>

  <Link
    to="/admin/orders"
    style={{
      textDecoration:
        "none",
      padding:
        "12px 20px",
      background:
        "#f57c00",
      color:
        "white",
      borderRadius:
        "8px",
    }}
  >
    Manage Orders
  </Link>
</div>
        <div
          style={{
            padding:
              "20px",
            border:
              "1px solid #ddd",
          }}
        >
          
          <h3>
            Orders
          </h3>
          <h2>
            {
              stats.totalOrders
            }
          </h2>
        </div>

        <div
          style={{
            padding:
              "20px",
            border:
              "1px solid #ddd",
          }}
        >
          <h3>
            Revenue
          </h3>
          <h2>
            ₹
            {
              stats.totalRevenue
            }
          </h2>
        </div>

        <div
          style={{
            padding:
              "20px",
            border:
              "1px solid #ddd",
          }}
        >
          <h3>
            Products
          </h3>
          <h2>
            {
              stats.totalProducts
            }
          </h2>
        </div>

        <div
          style={{
            padding:
              "20px",
            border:
              "1px solid #ddd",
          }}
        >
          <h3>
            Customers
          </h3>
          <h2>
            {
              stats.totalCustomers
            }
          </h2>
        </div>

        <div
          style={{
            padding:
              "20px",
            border:
              "1px solid #ddd",
          }}
        >
          <h3>
            Advertisements
          </h3>
          <h2>
            {
              stats.totalAdvertisements
            }
          </h2>

          
        </div>
        
      </div>
      <h2>
  Active Orders
</h2>

{stats.pendingOrders?.map(
  (order) => (
    <div
      key={order.id}
      style={{
        border:
          "1px solid #ddd",
        padding:
          "15px",
        marginBottom:
          "10px",
      }}
    >
      <strong>
        Order #
        {order.id}
      </strong>

      <br />

      Customer:
      {" "}
      {order.full_name}

      <br />

      Total:
      {" "}
      ₹{order.total}

      <br />

      Status:
      {" "}
      {order.order_status}
    </div>
  )
)}
    </div>
  );
}

export default AdminDashboard;