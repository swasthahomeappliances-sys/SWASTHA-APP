import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import {
  Link,
  useParams,
} from "react-router-dom";

function OrderSuccess() {
  const { id } =
    useParams();

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            gutterBottom
          >
            ✅
          </Typography>

          <Typography
            variant="h4"
            gutterBottom
          >
            Order Placed
          </Typography>

          <Typography
            sx={{
              mb: 3,
            }}
          >
            Your order has been
            placed successfully.
          </Typography>

          <Typography
            sx={{
              mb: 4,
            }}
          >
            Order #
            {id}
          </Typography>

          <Stack
            spacing={2}
          >
            <Button
              component={Link}
              to={`/order/${id}`}
              variant="contained"
              sx={{
                background:
                  "linear-gradient(135deg,#1E3A8A,#2563EB,#38BDF8)",
              }}
            >
              View Order
            </Button>

            <Button
              component={Link}
              to="/products"
              variant="outlined"
            >
              Continue Shopping
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default OrderSuccess;