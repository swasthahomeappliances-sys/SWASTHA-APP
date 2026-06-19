import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import axios from "axios";

import {
  Button,
  Typography,
  Box,
  Container,
} from "@mui/material";

function ProductDetails() {
  const { id } =
    useParams();

  const [product,
    setProduct] =
    useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct =
    async () => {
      try {
        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/products/${id}`
          );

        setProduct(
          response.data
        );
      } catch (
        error
      ) {
        console.error(
          error
        );

        alert(
          "Failed to load product"
        );
      }
    };

  const addToCart =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {
          alert(
            "Please login first"
          );

          return;
        }

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/cart`,
          {
            productId:
              product.id,

            quantity: 1,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Added to cart"
        );
      } catch (
        error
      ) {
        console.error(
          error
        );

        alert(
          "Failed to add to cart"
        );
      }
    };

  if (!product) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        mb: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 5,
          flexWrap:
            "wrap",
          alignItems:
            "flex-start",
        }}
      >
        {/* LEFT SIDE */}

        <Box
          sx={{
            flex: 1,
            minWidth:
              "350px",
          }}
        >
          <img
            src={
              product.image_url
            }
            alt={
              product.name
            }
            style={{
              width:
                "100%",
              maxWidth:
                "500px",
              borderRadius:
                "12px",
              objectFit:
                "cover",
            }}
          />
        </Box>

        {/* RIGHT SIDE */}

        <Box
          sx={{
            flex: 1,
            minWidth:
              "350px",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
          >
            {
              product.name
            }
          </Typography>

          {product.brand && (
            <Typography
              variant="h6"
              sx={{
                mb: 1,
              }}
            >
              Brand:
              {" "}
              {
                product.brand
              }
            </Typography>
          )}

          {product.model_number && (
            <Typography
              variant="h6"
              sx={{
                mb: 1,
              }}
            >
              Model:
              {" "}
              {
                product.model_number
              }
            </Typography>
          )}

          <Typography
            variant="h6"
            sx={{
              mb: 2,
            }}
          >
            Category:
            {" "}
            {
              product.category
            }
          </Typography>

          <Typography
            sx={{
              mb: 3,
              lineHeight:
                1.8,
            }}
          >
            {
              product.description
            }
          </Typography>

          <Typography
            variant="h4"
            color="primary"
            sx={{
              mb: 2,
            }}
          >
            ₹
            {
              product.price
            }
          </Typography>

          {product.stock <=
          0 ? (
            <Typography
              color="error"
              sx={{
                mb: 3,
                fontWeight:
                  "bold",
              }}
            >
              Out Of Stock
            </Typography>
          ) : (
            <Typography
              color="success.main"
              sx={{
                mb: 3,
                fontWeight:
                  "bold",
              }}
            >
              Stock:
              {" "}
              {
                product.stock
              }
            </Typography>
          )}

          <Button
            variant="contained"
            size="large"
            onClick={
              addToCart
            }
            disabled={
              product.stock <=
              0
            }
          >
            Add To Cart
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductDetails;