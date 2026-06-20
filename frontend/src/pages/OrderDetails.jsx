import {
useEffect,
useState,
} from "react";

import axios from "axios";

import {
Link,
useParams,
} from "react-router-dom";

import {
Container,
Typography,
Card,
CardContent,
Divider,
Box,
Button,
Chip,
} from "@mui/material";

function OrderDetails() {
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
"token"
);


    const response =
      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
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
<Typography
sx={{
mt: 4,
textAlign:
"center",
}}
>
Loading... </Typography>
);
}

const order =
data.order;

const statusSteps =
[
"PLACED",
"CONFIRMED",
"PACKED",
"SHIPPED",
"DELIVERED",
];

const currentStep =
statusSteps.indexOf(
order.order_status
);

return (
<Container
maxWidth="lg"
sx={{
py: 4,
}}
> <Typography
     variant="h4"
     fontWeight="bold"
     gutterBottom
   >
Order #
{order.id} </Typography>

```
  <Card
    sx={{
      mb: 3,
      borderRadius: 3,
    }}
  >
    <CardContent>
      <Typography
        variant="h6"
        gutterBottom
      >
        Order Status
      </Typography>

      <Chip
        label={
          order.order_status
        }
        color="primary"
      />

      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexWrap:
            "wrap",
          gap: 2,
        }}
      >
        {statusSteps.map(
          (
            step,
            index
          ) => (
            <Chip
              key={step}
              label={step}
              color={
                index <=
                currentStep
                  ? "success"
                  : "default"
              }
            />
          )
        )}
      </Box>
    </CardContent>
  </Card>

  <Card
    sx={{
      mb: 3,
      borderRadius: 3,
    }}
  >
    <CardContent>
      <Typography
        variant="h6"
        gutterBottom
      >
        Payment Details
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
      borderRadius: 3,
    }}
  >
    <CardContent>
      <Typography
        variant="h6"
        gutterBottom
      >
        Delivery Address
      </Typography>

      <Typography>
        {
          order.full_name
        }
      </Typography>

      <Typography>
        {
          order.phone
        }
      </Typography>

      <Typography>
        {
          order.address_line1
        }
      </Typography>

      {order.address_line2 && (
        <Typography>
          {
            order.address_line2
          }
        </Typography>
      )}

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
    fontWeight="bold"
    gutterBottom
  >
    Ordered Products
  </Typography>

  {data.items.map(
    (item) => (
      <Card
        key={item.id}
        sx={{
          mb: 3,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display:
                "flex",
              flexDirection:
                {
                  xs: "column",
                  md: "row",
                },
              gap: 3,
            }}
          >
            <Box>
              <img
                src={
                  item.image_url
                }
                alt={
                  item.name
                }
                style={{
                  width:
                    "180px",
                  maxWidth:
                    "100%",
                  borderRadius:
                    "12px",
                }}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
              >
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
                  item.model_number
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

              <Button
                component={
                  Link
                }
                to={`/product/${item.product_id}`}
                variant="outlined"
                sx={{
                  mt: 2,
                }}
              >
                View Product
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    )
  )}
</Container>


);
}
export default OrderDetails;
