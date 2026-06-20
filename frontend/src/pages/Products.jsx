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
} from "@mui/material";

function Products() {
  const [products,
    setProducts] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

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

  useEffect(() => {
    fetchProducts();
  }, [search]);

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
              </CardContent>
            </Card>
          )
        )}
      </div>
    </Container>
  );
}

export default Products;