
import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import {
  Link,
} from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

function AdminOrders() {
  const [orders, setOrders] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "adminToken"
          );

        const response =
          await axios.get(
            "http://localhost:5000/api/orders/admin",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setOrders(
          response.data
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  const updateStatus =
    async (
      orderId,
      status
    ) => {
      try {
        const token =
          localStorage.getItem(
            "adminToken"
          );

        await axios.patch(
          `http://localhost:5000/api/orders/admin/${orderId}/status`,
          {
            order_status:
              status,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchOrders();
      } catch (
        error
      ) {
        console.error(
          error
        );
      }
    };

  const filteredOrders =
  orders.filter(
    (order) => {
      const q =
        search.toLowerCase();

      return (
        order.full_name
          ?.toLowerCase()
          .includes(q) ||

        order.phone
          ?.toLowerCase()
          .includes(q) ||

        order.city
          ?.toLowerCase()
          .includes(q) ||

        order.state
          ?.toLowerCase()
          .includes(q) ||

        order.products
          ?.toLowerCase()
          .includes(q) ||

        order.order_status
          ?.toLowerCase()
          .includes(q) ||

        order.payment_status
          ?.toLowerCase()
          .includes(q) ||

        order.payment_method
          ?.toLowerCase()
          .includes(q)
      );
    }
  );

  return (
    
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
        
      <Typography
        variant="h4"
        gutterBottom
      >
        Orders Management
      </Typography>

      <TextField
        fullWidth
        label="Search by Customer, Phone, City or Product"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        sx={{
          mb: 3,
        }}
      />

      {filteredOrders.map(
        (order) => (
          <Card
            key={order.id}
            sx={{
              mb: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
              >
                Order #
                {order.id}
              </Typography>

              <Typography>
                Customer:
                {" "}
                {
                  order.full_name
                }
              </Typography>

              <Typography>
                Phone:
                {" "}
                {
                  order.phone
                }
              </Typography>

              <Typography>
                Products:
                {" "}
                {
                  order.products
                }
              </Typography>

              <Typography>
                Total:
                ₹
                {
                  order.total
                }
              </Typography>

              <Typography>
                Payment Method:
                {" "}
                {
                  order.payment_method
                }
              </Typography>

              <Typography>
                Payment Status:
                {" "}
                {
                  order.payment_status
                }
              </Typography>

              <Typography
                sx={{
                  fontWeight:
                    "bold",
                  color:
                    order.order_status ===
                    "DELIVERED"
                      ? "green"
                      : order.order_status ===
                        "SHIPPED"
                      ? "orange"
                      : order.order_status ===
                        "CANCELLED"
                      ? "red"
                      : "blue",
                }}
              >
                <Button
  component={Link}
  to={`/admin/orders/${order.id}`}
  variant="contained"
  sx={{
    mt: 2,
  }}
>
  View Details
</Button><br></br>
                Status:
                {" "}
                {
                  order.order_status
                }
                
              </Typography>
                
              <Typography
                sx={{
                  mt: 1,
                }}
              >
                Address:
              </Typography>

              <Typography>
                {
                  order.address_line1
                }
              </Typography>

              <Typography>
                {
                  order.address_line2
                }
              </Typography>

              <Typography>
                {
                  order.city
                }
                ,
                {" "}
                {
                  order.state
                }
              </Typography>

              <Typography>
                {
                  order.pincode
                }
              </Typography>

              <Typography>
                Email:
                {" "}
                {
                  order.email
                }
              </Typography>

              <Select
                value={
                  order.order_status
                }
                onChange={(
                  e
                ) =>
                  updateStatus(
                    order.id,
                    e.target.value
                  )
                }
                sx={{
                  mt: 2,
                  minWidth:
                    200,
                }}
              >
                <MenuItem value="PLACED">
                  PLACED
                </MenuItem>

                <MenuItem value="PACKED">
                  PACKED
                </MenuItem>

                <MenuItem value="SHIPPED">
                  SHIPPED
                </MenuItem>
<MenuItem value="OUT_FOR_DELIVERY">
  OUT FOR DELIVERY
</MenuItem>
                <MenuItem value="DELIVERED">
                  DELIVERED
                </MenuItem>

                <MenuItem value="CANCELLED">
                  CANCELLED
                </MenuItem>
              </Select>
            </CardContent>
          </Card>
        )
      )}
    </Container>
  );
}

export default AdminOrders;

