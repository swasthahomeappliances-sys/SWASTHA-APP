
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";
function AdminProducts() {
  const emptyForm = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image_url: "",
    brand: "",
    model_number: "",
    warranty: "",
  };

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token =
        localStorage.getItem(
          "adminToken"
        );

      const response =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/admin/all`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem(
          "adminToken"
        );

      const config = {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      };

      let imageUrl =
        formData.image_url;

      if (imageFile) {
        const uploadData =
          new FormData();

        uploadData.append(
          "image",
          imageFile
        );

        const uploadResponse =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/upload`,
            uploadData,
            config
          );

        imageUrl =
          uploadResponse.data.imageUrl;
      }

      const productData = {
        ...formData,
        image_url: imageUrl,
      };

      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/products/${editingId}`,
          productData,
          config
        );

        alert(
          "Product Updated"
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/products`,
          productData,
          config
        );

        alert(
          "Product Added"
        );
      }

      resetForm();
      fetchProducts();

    } catch (error) {
      console.error(error);

      alert(
        "Operation Failed"
      );
    }
  };

  const handleEdit = (
    product
  ) => {
    setEditingId(product.id);

    setFormData({
      name:
        product.name || "",
      description:
        product.description || "",
      price:
        product.price || "",
      stock:
        product.stock || "",
      category:
        product.category || "",
      image_url:
        product.image_url || "",
      brand:
        product.brand || "",
      model_number:
        product.model_number || "",
      warranty:
        product.warranty || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleStatus =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "adminToken"
          );

        await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/products/${id}/toggle-status`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchProducts();

      } catch (error) {
        console.error(error);
      }
    };

return (
  <Container
    maxWidth="lg"
    sx={{
      py: 4,
    }}
  >
    <Typography
      variant="h3"
      gutterBottom
    >
      Admin Products
    </Typography>

    <Typography
      variant="h5"
      gutterBottom
      sx={{ mb: 3 }}
    >
      {editingId
        ? "Edit Product"
        : "Add Product"}
    </Typography>

    <Card
      sx={{
        p: 4,
        mb: 5,
        borderRadius: 4,
      }}
    >
      <form
        onSubmit={
          handleSubmit
        }
      >
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
          />

          <TextField
            fullWidth
            label="Brand"
            name="brand"
            value={
              formData.brand
            }
            onChange={
              handleChange
            }
          />

          <TextField
            fullWidth
            label="Model Number"
            name="model_number"
            value={
              formData.model_number
            }
            onChange={
              handleChange
            }
          />

          <TextField
            fullWidth
            label="Warranty"
            name="warranty"
            value={
              formData.warranty
            }
            onChange={
              handleChange
            }
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
          />

          <TextField
            fullWidth
            label="Price"
            type="number"
            name="price"
            value={
              formData.price
            }
            onChange={
              handleChange
            }
          />

          <TextField
            fullWidth
            label="Stock"
            type="number"
            name="stock"
            value={
              formData.stock
            }
            onChange={
              handleChange
            }
          />

          <TextField
            fullWidth
            label="Category"
            name="category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
          />

          <Button
            variant="outlined"
            component="label"
          >
            Upload Product Image

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(
                  e.target.files[0]
                )
              }
            />
          </Button>

          <Stack
            direction="row"
            spacing={2}
          >
            <Button
              variant="contained"
              type="submit"
            >
              {editingId
                ? "Update Product"
                : "Add Product"}
            </Button>

            {editingId && (
              <Button
                variant="outlined"
                onClick={
                  resetForm
                }
              >
                Cancel
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    </Card>

    <Typography
      variant="h4"
      sx={{
        mb: 3,
      }}
    >
      Existing Products
    </Typography>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fill,minmax(300px,1fr))",
        gap: 3,
      }}
    >
      {products.map(
        (product) => (
          <Card
            key={
              product.id
            }
            sx={{
              borderRadius: 4,
            }}
          >
            {product.image_url && (
              <img
                src={
                  product.image_url
                }
                alt={
                  product.name
                }
                style={{
                  width: "100%",
                  height:
                    "220px",
                  objectFit:
                    "cover",
                }}
              />
            )}

            <CardContent>
              <Typography
                variant="h6"
              >
                {
                  product.name
                }
              </Typography>

              <Typography>
                Brand:
                {" "}
                {
                  product.brand
                }
              </Typography>

              <Typography>
                ₹
                {
                  product.price
                }
              </Typography>

              <Typography>
                Stock:
                {" "}
                {
                  product.stock
                }
              </Typography>

              <Typography
                sx={{
                  mb: 2,
                }}
              >
                Status:
                {" "}
                {product.active
                  ? "Active"
                  : "Inactive"}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
              >
                <Button
                  variant="contained"
                  onClick={() =>
                    handleEdit(
                      product
                    )
                  }
                >
                  Edit
                </Button>

                <Button
                  variant={
                    product.active
                      ? "outlined"
                      : "contained"
                  }
                  color={
                    product.active
                      ? "error"
                      : "success"
                  }
                  onClick={() =>
                    toggleStatus(
                      product.id
                    )
                  }
                >
                  {product.active
                    ? "Deactivate"
                    : "Activate"}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )
      )}
    </Box>
  </Container>
);
}

export default AdminProducts;
