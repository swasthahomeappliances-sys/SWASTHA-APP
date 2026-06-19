
import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
} from "../firebase";

function Login() {
  const navigate =
    useNavigate();

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleLogin =
    async (e) => {
      e.preventDefault();

      try {
        const response =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/login`,
            formData
          );

        localStorage.removeItem(
          "adminToken"
        );

        localStorage.setItem(
          "token",
          response.data.token
        );

        alert(
          "Login Successful"
        );

        navigate("/");
      } catch (
        error
      ) {
        console.error(
          error
        );

        alert(
          "Invalid Email or Password"
        );
      }
    };

  const handleGoogleLogin =
    async () => {
      try {
        const provider =
          new GoogleAuthProvider();

        const result =
          await signInWithPopup(
            auth,
            provider
          );

        const user =
          result.user;

        const response =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/google`,
            {
              email:
                user.email,
              name:
                user.displayName,
              googleId:
                user.uid,
            }
          );

        localStorage.removeItem(
          "adminToken"
        );

        localStorage.setItem(
          "token",
          response.data.token
        );

        navigate("/");
      } catch (
        error
      ) {
        console.error(
          error
        );

        alert(
          "Google Login Failed"
        );
      }
    };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        mb: 8,
      }}
    >
      <Card
        sx={{
          borderRadius: 5,
          boxShadow: 6,
        }}
      >
        <CardContent
          sx={{
            p: 5,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
          >
            Welcome Back
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            sx={{
              mb: 3,
            }}
          >
            Login to your
            Swastha account
          </Typography>

          <form
            onSubmit={
              handleLogin
            }
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              margin="normal"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              margin="normal"
              value={
                formData.password
              }
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              onChange={
                handleChange
              }
              InputProps={{
                endAdornment:
                  (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
              }}
            />

            <Typography
              align="right"
              sx={{
                mt: 1,
                mb: 2,
              }}
            >
              <Link
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            </Typography>

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{
                mb: 2,
              }}
            >
              Login
            </Button>
          </form>

          <Divider
            sx={{
              my: 3,
            }}
          >
            OR
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={
              handleGoogleLogin
            }
          >
            Continue With Google
          </Button>

          <Typography
            align="center"
            sx={{
              mt: 3,
            }}
          >
            Don't have an
            account?{" "}
            <Link
              to="/register"
            >
              Register
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
