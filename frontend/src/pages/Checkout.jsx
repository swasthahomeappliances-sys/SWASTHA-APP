
import { useState, useEffect } from "react";
import axios from "axios";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import {
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  Grid,
  Divider,
} from "@mui/material";

function Checkout() {
  const [cart, setCart] =
    useState([]);
    const [paymentMethod,
setPaymentMethod] =
useState("RAZORPAY");

  const [formData, setFormData] =
    useState({
      full_name: "",
      phone: "",
      email: "",
      address_line1: "",
      address_line2: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      notes: "",
    });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/cart`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setCart(
          response.data
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        Number(item.price) *
          Number(item.quantity),
      0
    );

  const handlePayment =
  
  async () => {
    if (
  !formData.full_name ||
  !formData.phone ||
  !formData.email ||
  !formData.address_line1 ||
  !formData.city ||
  !formData.state ||
  !formData.pincode
) {
  alert(
    "Please fill all required fields"
  );

  return;
}
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const orderResponse =
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/orders/create`,
          {
            ...formData,
            payment_method:
              paymentMethod,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      // COD FLOW
      if (
        paymentMethod ===
        "COD"
      ) {
        alert(
          "Order Placed Successfully"
        );

        window.location.href =
          `/order-success/${orderResponse.data.orderId}`;

        return;
      }

      // RAZORPAY FLOW
      const {
        razorpayOrderId,
        amount,
      } =
        orderResponse.data;

      const options = {
        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,
        
        amount,

        currency:
          "INR",

        name:
          "Swastha",

        description:
          "Order Payment",

        order_id:
          razorpayOrderId,

        handler:
          async (
            response
          ) => {
            await axios.post(
              `${import.meta.env.VITE_API_URL}/api/orders/verify`,
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              },
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

            alert(
              "Payment Successful"
            );
                console.log("Frontend Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
            window.location.href =
              `/order-success/${orderResponse.data.orderId}`;
          },

        prefill: {
          name:
            formData.full_name,

          email:
            formData.email,

          contact:
            formData.phone,
        },

        theme: {
          color:
            "#1A237E",
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();
    } catch (
      error
    ) {
      console.error(
        error
      );

      alert(
        "Payment Failed"
      );
    }
  };
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
        Checkout
      </Typography>

      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
          >
            Shipping Details
          </Typography>

          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Full Name"
                name="full_name"
                value={
                  formData.full_name
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="House / Flat Number"
                name="address_line1"
                value={
                  formData.address_line1
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Area / Street"
                name="address_line2"
                value={
                  formData.address_line2
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Landmark (Optional)"
                name="landmark"
                value={
                  formData.landmark
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <TextField
                fullWidth
                label="City"
                name="city"
                value={
                  formData.city
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <TextField
                fullWidth
                label="State"
                name="state"
                value={
                  formData.state
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <TextField
                fullWidth
                label="Pincode"
                name="pincode"
                value={
                  formData.pincode
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Order Notes (Optional)"
                name="notes"
                value={
                  formData.notes
                }
                onChange={
                  handleChange
                }
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card
        sx={{
          borderRadius: 3,
        }}
      >
        <CardContent><Card
  sx={{
    mb: 4,
    borderRadius: 3,
  }}
>
  <CardContent>
    <Typography
      variant="h6"
      gutterBottom
    >
      Payment Method
    </Typography>

    <RadioGroup
      value={paymentMethod}
      onChange={(e) =>
        setPaymentMethod(
          e.target.value
        )
      }
    >
      <FormControlLabel
        value="RAZORPAY"
        control={<Radio />}
        label="Card / Net Banking"
      />

      <FormControlLabel
        value="COD"
        control={<Radio />}
        label="Cash On Delivery/UPI"
      />
    </RadioGroup>
    <Typography
  variant="body2"
  color="text.secondary"
  sx={{ mt: 1 }}
>
  *For COD/UPI payments, we will reach out to you shortly via WhatsApp or Email
</Typography>
  </CardContent>
</Card>
          <Typography
            variant="h6"
            gutterBottom
          >
            Order Summary
          </Typography>

          {cart.map(
            (item) => (
              <Box
  key={item.id}
  sx={{
    display: "flex",
    gap: 2,
    alignItems: "center",
    mb: 2,
  }}
>
  <img
    src={item.image_url}
    alt={item.name}
    width="60"
    style={{
      borderRadius: "8px",
    }}
  />

  <Box
    sx={{
      flex: 1,
    }}
  >
    <Typography>
      {item.name}
    </Typography>

    <Typography
      variant="body2"
      color="text.secondary"
    >
      Qty: {item.quantity}
    </Typography>
  </Box>

  <Typography>
    ₹
    {Number(item.price) *
      Number(item.quantity)}
  </Typography>
</Box>
            )
          )}

          <Divider
            sx={{
              my: 2,
            }}
          />

          <Typography
            variant="h5"
          >
            Total:
            ₹{total}
          </Typography>

          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              mt: 3,
            }}
            onClick={
              handlePayment
            }
          >
           <Button
  variant="contained"
  size="large"
  fullWidth
  sx={{
    mt: 3,
    background:
      "linear-gradient(135deg,#1E3A8A,#2563EB,#38BDF8)",

    "&:hover": {
      background:
        "linear-gradient(135deg,#172554,#1D4ED8,#0EA5E9)",
    },
  }}
  onClick={handlePayment}
>
  {paymentMethod === "COD"
    ? "Place Order"
    : "Proceed To Payment"}
</Button>
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Checkout;
