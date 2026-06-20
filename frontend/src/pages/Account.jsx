
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
} from "@mui/material";

function Account() {
  const [user, setUser] =
    useState(null);

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);

  const fetchProfile =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/auth/profile`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setUser(
          response.data
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  const fetchOrders =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/orders/my-orders`,
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

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/";
  };

  if (!user) {
    return (
      <h2>Loading...</h2>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 5,
        mb: 5,
      }}
    >
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
          >
            My Account
          </Typography>

          <Typography>
            <strong>
              Name:
            </strong>{" "}
            {user.name}
          </Typography>

          <Typography>
            <strong>
              Email:
            </strong>{" "}
            {user.email}
          </Typography>

          <Typography>
            <strong>
              Phone:
            </strong>{" "}
            {user.phone}
          </Typography>

          <Button
            color="error"
            variant="contained"
            onClick={
              logout
            }
            sx={{
                    background:
                      "#eab5a6",
                      color: "#740707"
                  }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>

      <Typography> My Orders</Typography>
  
      {orders.length ===
      0 ? (
        <Card>
          <CardContent>
            <Typography>
              No Orders Yet
            </Typography>
          </CardContent>
        </Card>
      ) : (
        orders.map(
          (order) => (
           <Card
  component={Link}
  to={`/order/${order.id}`}
  sx={{
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",

    "&:hover": {
      boxShadow: 4,
    },
  }}
>
              <CardContent color="#87f1b0">
                <Typography
                  variant="h6"
                >
                  Order #
                  {
                    order.id
                  }
                </Typography>

                <Divider
                  sx={{
                    my: 1,
                  }}
                />

                <Typography>
                  Total:
                  ₹
                  {
                    order.total
                  }
                </Typography>

                <Typography>
                  Payment:
                  {" "}
                  {
                    order.payment_status
                  }
                </Typography>

                <Typography>
                  Status:
                  {" "}
                  {
                    order.order_status
                  }
                </Typography>

                <Typography>
                  {new Date(
                    order.created_at
                  ).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          )
        )
      )}
    </Container>
  );
}

export default Account;
