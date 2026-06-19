
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
} from "@mui/material";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "`${import.meta.env.VITE_API_URL}`/api/cart",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setCart(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.delete(
        ``${import.meta.env.VITE_API_URL}`/api/cart/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };
const updateQuantity =
  async (
    id,
    quantity
  ) => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      await axios.patch(
        ``${import.meta.env.VITE_API_URL}`/api/cart/${id}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (
      error
    ) {
      console.error(
        error
      );
    }
  };

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        Number(item.price) *
          Number(item.quantity),
      0
    );

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 5,
        mb: 5,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
      >
        My Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography>
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Card
              key={item.id}
              sx={{
                mb: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                >
                  {item.name}
                </Typography>

                <Typography>
                  ₹{item.price}
                </Typography>

                <Typography>
                  Quantity:
                  {" "}
                  {item.quantity}
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    mt: 2,
                  }}
                >
                  <Button
                    component={Link}
                    to={`/product/${item.product_id}`}
                    variant="outlined"
                  >
                    View Product
                  </Button>

                  <Button
                    color="error"
                    variant="contained"
                    onClick={() =>
                      removeItem(
                        item.id
                      )
                    }
                  >
                    Remove
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}

          <Divider
            sx={{
              my: 3,
            }}
          />

          <Typography
            variant="h5"
          >
            Total: ₹{total}
          </Typography>

          <Button
  component={Link}
  to="/checkout"
  variant="contained"
  size="large"
  sx={{
    mt: 3,
  }}
>
  Proceed To Checkout
</Button>
        </>
      )}
    </Container>
  );
}

export default Cart;
