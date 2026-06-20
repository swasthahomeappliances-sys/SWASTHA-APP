import { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

function Products() {
  const [products,
    setProducts] =
    useState([]);

  const [search,
    setSearch] =
    useState("");
const [cartMap,
  setCartMap] =
  useState({});
  const location =
    useLocation();

  const searchTerm =
    new URLSearchParams(
      location.search
    ).get(
      "search"
    ) || "";

  const filteredProducts =
    products.filter(
      (product) =>
        product.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  const fetchProducts =
    async () => {
      try {
        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/products?search=${search}`
          );

        setProducts(
          response.data
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };
const fetchCart =
  async () => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      if (!token)
        return;

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

      const map = {};

      response.data.forEach(
        (item) => {
          map[
            item.product_id
          ] = item;
        }
      );

      setCartMap(map);
    } catch (
      error
    ) {
      console.error(
        error
      );
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [search]);
const addToCart =
  async (
    productId
  ) => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          productId,
          quantity: 1,
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

const increaseQty =
  async (
    cartItem
  ) => {
    const token =
      localStorage.getItem(
        "token"
      );

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/cart/${cartItem.id}`,
      {
        quantity:
          cartItem.quantity +
          1,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    fetchCart();
  };

const decreaseQty =
  async (
    cartItem
  ) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (
      cartItem.quantity ===
      1
    ) {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cart/${cartItem.id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/cart/${cartItem.id}`,
        {
          quantity:
            cartItem.quantity -
            1,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
    }

    fetchCart();
  };
  return (
    <Container
  maxWidth={false}
  sx={{
    px: {
      xs: 1.5,
      md: 4,
    },
    py: {
      xs: 2,
      md: 4,
    },
  }}
>
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          mb: 4,
        }}
      >
        Products
      </Typography>

      <TextField
  fullWidth
  label="Search Products"
  variant="outlined"
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  sx={{
    mb: 3,
    "& .MuiOutlinedInput-root": {
      borderRadius: 4,
      backgroundColor: "#fff",
    },
  }}
/>
      {products.length === 0 && (
        <Typography>
          No Products Found
        </Typography>
      )}

     <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "12px",
  }}
>
        {filteredProducts.map(
          (product) => (
            <Card
  component={Link}
  to={`/product/${product.id}`}
  key={product.id}
  sx={{
    borderRadius: 3,
    overflow: "hidden",
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    height: "100%",
    transition: "0.2s",

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 4,
    },
  }}
>
              {product.image_url && (
                <CardMedia
  component="img"
  height="150"
  image={product.image_url}
  alt={product.name}
  sx={{
    objectFit: "cover",
  }}
/>
              )}

              <CardContent
  sx={{
    p: 1.5,
  }}
>
                <Typography
  sx={{
    fontWeight: 600,
    fontSize: {
      xs: "0.95rem",
      md: "1.2rem",
    },
    mb: 1,
  }}
>
  {product.name}
</Typography>

                <Typography
  color="text.secondary"
  sx={{
    fontSize: "0.75rem",
    mb: 1,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }}
>
  {product.description}
</Typography>

                <Typography
  sx={{
    fontWeight: 700,
    fontSize: {
      xs: "1rem",
      md: "1.3rem",
    },
    mb: 1,
  }}
>
  ₹{product.price}
</Typography>

                {product.stock <= 0 ? (
                  <Typography
                    color="error"
                    fontWeight="bold"
                  >
                    Out Of Stock
                  </Typography>
                ) : product.stock <= 5 ? (
                  <Typography
                    color="warning.main"
                    fontWeight="bold"
                  >
                    Only {
                      product.stock
                    } Left
                  </Typography>
                ) : (
                  <Typography
                    color="success.main"
                  >
                    In Stock
                  </Typography>
                )}

                <Typography
  sx={{
    mt: 1,
    fontSize: "0.7rem",
    color: "#666",
  }}
>
  {product.category}
</Typography>
{localStorage.getItem(
  "token"
) &&
  (cartMap[
    product.id
  ] ? (
    <Box
      sx={{
        display:
          "flex",
        alignItems:
          "center",
        justifyContent:
          "center",
        gap: 1,
        mt: 2,
      }}
      onClick={(e) =>
        e.preventDefault()
      }
    >
      <Button
        variant="outlined"
        size="small"
        onClick={() =>
          decreaseQty(
            cartMap[
              product.id
            ]
          )
        }
      >
        -
      </Button>

      <Typography>
        {
          cartMap[
            product.id
          ].quantity
        }
      </Typography>

      <Button
        variant="contained"
        size="small"
        onClick={() =>
          increaseQty(
            cartMap[
              product.id
            ]
          )
        }
      >
        +
      </Button>
    </Box>
  ) : (
    <Button
      fullWidth
      variant="contained"
      sx={{
        mt: 2,
        background:
          "linear-gradient(135deg,#1E3A8A,#2563EB,#38BDF8)",
      }}
      onClick={(e) => {
        e.preventDefault();
        addToCart(
          product.id
        );
      }}
    >
      Add To Cart
    </Button>
  ))}
              </CardContent>
            </Card>
          )
        )}
      </div>
    </Container>
  );
}

export default Products;