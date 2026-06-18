
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import {
  useState,
} from "react";
import {
  ShoppingCart,
  Person,
} from "@mui/icons-material";
import {
  useNavigate,
} from "react-router-dom";
import {
  Link,
} from "react-router-dom";

function Navbar() {
  const token =
    !!localStorage.getItem(
      "token"
    );
const [search,
  setSearch] =
  useState("");
  const adminToken =
    !!localStorage.getItem(
      "adminToken"
    );
const navigate =
  useNavigate();
  const logoutAdmin =
    () => {
      localStorage.removeItem(
        "adminToken"
      );

      window.location.href =
        "/admin/login";
    };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background:
"linear-gradient(135deg,#1E3A8A,#2563EB,#38BDF8)",
        borderBottom:
          "1px solid color: #FFFFFF",
      }}
    >
      <Toolbar>
       <Box
  component={Link}
  to="/"
  sx={{
    display: "flex",
    alignItems:
      "center",
    textDecoration:
      "none",
    mr: 4,
  }}
>
  <img
    src="/logo.jpg"
    alt="Swastha"
    style={{
      height: "50px",
      width: "auto",
    }}
  />
</Box>

        {!adminToken && (
          <>
            <Button
              component={Link}
              to="/"
              sx={{
                color:
                  "#FFFFFF",
              }}
            >
              Home
            </Button>

            <Button
              component={Link}
              to="/products"
              sx={{
                color:
                  "#FFFFFF",
              }}
            >
              Products
            </Button>

            <Button
  component={Link}
  to="/offers"
  sx={{
    color:
      "#FFFFFF",
  }}
>
  Offers
</Button>
<Button
  component={Link}
  to="/about"
  sx={{
    color:
      "#FFFFFF",
  }}
>
  About us
</Button>
          </>
        )}

        {adminToken && (
          <>
            <Button
              component={Link}
              to="/admin/dashboard"
               sx={{
    color:
      "#FFFFFF",
  }}
            >
              Dashboard
            </Button>

            <Button
              component={Link}
              to="/admin/products"
               sx={{
    color:
      "#FFFFFF",
  }}
            >
              Products
            </Button>

            <Button
              component={Link}
              to="/admin/advertisements"
               sx={{
    color:
      "#FFFFFF",
  }}
            >
              Advertisements
            </Button>

            <Button
  component={Link}
  to="/admin/orders"
   sx={{
    color:
      "#FFFFFF",
  }}
>
  Orders
</Button>
          </>
        )}

        <Box
          sx={{
            flexGrow: 1,
          }}
        />

        {!adminToken && (
          <>
            <TextField
  size="small"
  placeholder="Search products..."
  value={search}
  onChange={(e) =>
    setSearch(
      e.target.value
    )
  }
  onKeyDown={(e) => {
    if (
      e.key ===
      "Enter"
    ) {
      navigate(
        `/products?search=${search}`
      );
    }
  }}
  sx={{
    width: 250,
    mr: 2,
  }}
/>

            {token && (
              <>
                <Button
                  component={Link}
                  to="/cart"
                  startIcon={
                    <ShoppingCart />
                  }
                  sx={{
                    color:
                      "#100802",
                  }}
                >
                </Button>

                <Button
                  component={Link}
                  to="/account"
                  startIcon={
                    <Person />
                  }
                  sx={{
                    color:
                      "#08041e",
                  }}
                >
              
                </Button>
              </>
            )}

            {!token && (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color:
                      "#0a0501",
                  }}
                >
                  Login
                </Button>

                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{
                    background:
                      "#13ba16",
                      color: "#120202"
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </>
        )}

        {adminToken && (
          <Button
            color="error"
            variant="contained"
            onClick={
              logoutAdmin
            }
            sx={{
                    background:
                      "#eab5a6",
                      color: "#740707"
                  }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
