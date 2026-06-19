import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useParams,
} from "react-router-dom";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

function AdminOrderDetails() {
  const { id } =
    useParams();

  const [data,
    setData] =
    useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "adminToken"
          );

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/orders/admin/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setData(
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

  if (!data) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  const order =
    data.order;

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
      >
        Order #
        {order.id}
      </Typography>

      <Card
        sx={{
          mb: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
          >
            Customer
            Information
          </Typography>

          <Typography>
            Name:
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
            Email:
            {" "}
            {
              order.email
            }
          </Typography>

          <Typography>
            Payment:
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

          <Typography>
            Order Status:
            {" "}
            {
              order.order_status
            }
          </Typography>

          <Typography>
            Total:
            ₹
            {
              order.total
            }
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          mb: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
          >
            Delivery
            Address
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
        </CardContent>
      </Card>

      <Typography
        variant="h5"
        gutterBottom
      >
        Products
      </Typography>

      {data.items.map(
        (item) => (
          <Card
            key={
              item.id
            }
            sx={{
              mb: 2,
            }}
          >
            <CardContent>
              <img
                src={
                  item.image_url
                }
                alt={
                  item.name
                }
                width="120"
              />

              <Divider
                sx={{
                  my: 2,
                }}
              />

              <Typography>
                Product
                ID:
                {" "}
                {
                  item.product_id
                }
              </Typography>

              <Typography>
                Name:
                {" "}
                {
                  item.name
                }
              </Typography>

              <Typography>
                Brand:
                {" "}
                {
                  item.brand
                }
              </Typography>

              <Typography>
                Model:
                {" "}
                {
                  item.model_no
                }
              </Typography>

              <Typography>
                Quantity:
                {" "}
                {
                  item.quantity
                }
              </Typography>

              <Typography>
                Price:
                ₹
                {
                  item.price
                }
              </Typography>
            </CardContent>
          </Card>
        )
      )}
    </Container>
  );
}

export default AdminOrderDetails;