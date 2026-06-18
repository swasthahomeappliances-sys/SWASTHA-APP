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
            `http://localhost:5000/api/products?search=${search}`
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
        px: 4,
        py: 4,
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
          setSearch(
            e.target.value
          )
        }
        sx={{
          mb: 5,
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
            "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {filteredProducts.map(
          (product) => (
            <Card
              component={Link}
              to={`/product/${product.id}`}
              key={product.id}
              sx={{
                height: "100%",
                borderRadius: 4,
                overflow: "hidden",
                textDecoration:
                  "none",
                color:
                  "inherit",
                cursor:
                  "pointer",
                transition:
                  "all 0.25s ease",

                "&:hover": {
                  transform:
                    "translateY(-8px)",
                  boxShadow: 8,
                },

                "&:hover img": {
                  transform:
                    "scale(1.05)",
                },
              }}
            >
              {product.image_url && (
                <CardMedia
                  component="img"
                  height="250"
                  image={
                    product.image_url
                  }
                  alt={
                    product.name
                  }
                  sx={{
                    transition:
                      "0.3s ease",
                  }}
                />
              )}

              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                >
                  {
                    product.name
                  }
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                  }}
                >
                  {
                    product.description
                  }
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  ₹
                  {
                    product.price
                  }
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
                  variant="body2"
                  sx={{
                    mt: 2,
                  }}
                >
                  Category:
                  {" "}
                  {
                    product.category
                  }
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