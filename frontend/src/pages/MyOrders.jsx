import {
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";

function MyOrders() {
  const [orders,
    setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

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
      } catch (
        error
      ) {
        console.error(
          error
        );
      }
    };

  const statuses = [
    "PLACED",
    "PACKED",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
      >
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>
          No Orders Yet
        </Typography>
      ) : (
        orders.map(
          (order) => {
            const currentIndex =
              statuses.indexOf(
                order.order_status
              );

            return (
              <Card
  key={order.id}
  component={Link}
  to={`/order/${order.id}`}
  sx={{
    textDecoration: "none",
    cursor: "pointer",
    color: "inherit",
    transition: "0.2s",

    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: 4,
    },
  }}
>
                <CardContent>
                  <Typography
                    variant="h6"
                  >
                    Order #
                    {
                      order.id
                    }
                  </Typography>

                  <Typography>
                    Total:
                    {" "}
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
                    Ordered On:
                    {" "}
                    {new Date(
                      order.created_at
                    ).toLocaleString()}
                  </Typography>

                  <Box
                    sx={{
                      mt: 3,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                    >
                      Order Tracking
                    </Typography>

                    {order.order_status ===
                    "CANCELLED" ? (
                      <Typography
                        sx={{
                          color:
                            "red",
                          fontWeight:
                            "bold",
                        }}
                      >
                        ❌ Order
                        Cancelled
                      </Typography>
                    ) : (
                      statuses.map(
                        (
                          status,
                          index
                        ) => {
                          const completed =
                            index <=
                            currentIndex;

                          return (
                            <Typography
                              key={
                                status
                              }
                              sx={{
                                color:
                                  completed
                                    ? "green"
                                    : "#999",
                                fontWeight:
                                  completed
                                    ? "bold"
                                    : "normal",
                                mb: 1,
                              }}
                            >
                              {completed
                                ? "✓"
                                : "○"}{" "}
                              {status.replaceAll(
                                "_",
                                " "
                              )}
                            </Typography>
                          );
                        }
                      )
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          }
        )
      )}
    </Container>
  );
}

export default MyOrders;