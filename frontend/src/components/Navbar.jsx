import {
  AppBar,
  Toolbar,
  Button,
  Box,
  TextField,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

import {
  Badge,
} from "@mui/material";
import {
  ShoppingCart,
  Person,
} from "@mui/icons-material";

import MenuIcon from "@mui/icons-material/Menu";

import { useTheme } from "@mui/material/styles";

import { useState, useEffect} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
function Navbar() {
  const token =
    !!localStorage.getItem("token");

  const adminToken =
    !!localStorage.getItem("adminToken");
useEffect(() => {
  fetchCartCount();
}, []);
  const [search, setSearch] =
    useState("");
const [cartCount,
  setCartCount] =
  useState(0);
  const [mobileOpen,
    setMobileOpen] =
    useState(false);

  const navigate =
    useNavigate();

  const theme = useTheme();

  const isMobile =
    useMediaQuery(
      theme.breakpoints.down("md")
    );

  const logoutAdmin =
    () => {
      localStorage.removeItem(
        "adminToken"
      );

      window.location.href =
        "/admin/login";
    };

  const menuItems =
    adminToken
      ? [
          {
            text:
              "Dashboard",
            path:
              "/admin/dashboard",
          },
          {
            text:
              "Products",
            path:
              "/admin/products",
          },
          {
            text:
              "Advertisements",
            path:
              "/admin/advertisements",
          },
          {
            text:
              "Orders",
            path:
              "/admin/orders",
          },
        ]
      : [
          {
            text:
              "Home",
            path: "/",
          },
          {
            text:
              "Products",
            path:
              "/products",
          },
          {
            text:
              "Offers",
            path:
              "/offers",
          },
          {
            text:
              "About Us",
            path:
              "/about",
          },
        ];
const fetchCartCount =
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

      const total =
        response.data.reduce(
          (sum, item) =>
            sum +
            Number(
              item.quantity
            ),
          0
        );

      setCartCount(
        total
      );
    } catch (
      error
    ) {
      console.error(
        error
      );
    }
  };
  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background:
            "linear-gradient(135deg,#1E3A8A,#2563EB,#38BDF8)",
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
            }}
          >
            <img
              src="/logo.jpg"
              alt="Swastha"
              style={{
                height:
                  "50px",
              }}
            />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
            }}
          />

          {isMobile ? (
            <IconButton
              color="inherit"
              onClick={() =>
                setMobileOpen(
                  true
                )
              }
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {menuItems.map(
                (item) => (
                  <Button
                    key={
                      item.path
                    }
                    component={
                      Link
                    }
                    to={
                      item.path
                    }
                    sx={{
                      color:
                        "#fff",
                    }}
                  >
                    {
                      item.text
                    }
                  </Button>
                )
              )}

              {!adminToken && (
                <>
                  <TextField
                    size="small"
                    placeholder="Search..."
                    value={
                      search
                    }
                    onChange={(
                      e
                    ) =>
                      setSearch(
                        e
                          .target
                          .value
                      )
                    }
                    onKeyDown={(
                      e
                    ) => {
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
                      width:
                        220,
                      mx: 2,
                      bgcolor:
                        "#fff",
                      borderRadius:
                        1,
                    }}
                  />

                  {token ? (
                    <>
                      <IconButton
  component={Link}
  to="/cart"
  sx={{
    color:"#fff",
  }}
>
  <Badge
    badgeContent={
      cartCount
    }
    color="error"
  >
    <ShoppingCart />
  </Badge>
</IconButton>

                      <IconButton
                        component={
                          Link
                        }
                        to="/account"
                        sx={{
                          color:
                            "#fff",
                        }}
                      >
                        <Person />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Button
                        component={
                          Link
                        }
                        to="/login"
                        sx={{
                          color:
                            "#fff",
                        }}
                      >
                        Login
                      </Button>

                      <Button
                        component={
                          Link
                        }
                        to="/register"
                        variant="contained"
                        sx={{
                          background:
                            "#22C55E",
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
                >
                  Logout
                </Button>
              )}
            </>
          )}
          
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={
          mobileOpen
        }
        onClose={() =>
          setMobileOpen(
            false
          )
        }
      >
        <Box
          sx={{
            width: 250,
          }}
        >
          <List>
  {menuItems.map(
    (item) => (
      <ListItem
        key={item.path}
        disablePadding
      >
        <ListItemButton
          component={Link}
          to={item.path}
          onClick={() =>
            setMobileOpen(false)
          }
        >
          <ListItemText
            primary={item.text}
          />
        </ListItemButton>
      </ListItem>
      
    )
  )}

  {!adminToken &&
    token && (
      <>
        <ListItem
          disablePadding
        >
          <ListItemButton
            component={Link}
            to="/cart"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <ListItemText
              primary="Cart"
            />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
        >
          <ListItemButton
            component={Link}
            to="/account"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <ListItemText
              primary="My Account"
            />
          </ListItemButton>
        </ListItem>
<ListItem
  disablePadding
>
  <ListItemButton
    component={Link}
    to="/cart"
    onClick={() =>
      setMobileOpen(
        false
      )
    }
  >
    <ListItemText
      primary={`Cart (${cartCount})`}
    />
  </ListItemButton>
</ListItem>
        <ListItem
          disablePadding
        >
          <ListItemButton
            onClick={() => {
              localStorage.removeItem(
                "token"
              );

              window.location.href =
                "/login";
            }}
          >
            <ListItemText
              primary="Logout"
            />
          </ListItemButton>
        </ListItem>
      </>
    )}

  {!adminToken &&
    !token && (
      <>
        <ListItem
          disablePadding
        >
          <ListItemButton
            component={Link}
            to="/login"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <ListItemText
              primary="Login"
            />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
        >
          <ListItemButton
            component={Link}
            to="/register"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <ListItemText
              primary="Register"
            />
          </ListItemButton>
        </ListItem>
      </>
    )}

  {adminToken && (
    <ListItem
      disablePadding
    >
      <ListItemButton
        onClick={
          logoutAdmin
        }
      >
        <ListItemText
          primary="Logout"
        />
      </ListItemButton>
    </ListItem>
  )}
</List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;