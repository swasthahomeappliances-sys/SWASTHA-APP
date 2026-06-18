import { useState } from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

function ResetPassword() {
  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [password,
    setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );

        return;
      }

      try {
        await axios.post(
          "http://localhost:5000/api/auth/reset-password",
          {
            token,
            password,
          }
        );

        alert(
          "Password Updated Successfully"
        );

        navigate(
          "/login"
        );
      } catch (
        error
      ) {
        console.error(
          error
        );

        alert(
          "Invalid or Expired Reset Link"
        );
      }
    };

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
          boxShadow: 4,
        }}
      >
        <CardContent
          sx={{
            p: 4,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
          >
            Reset Password
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 3,
            }}
          >
            Enter your new
            password below.
          </Typography>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={
                password
              }
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              sx={{
                mb: 2,
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              sx={{
                mb: 3,
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
            >
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ResetPassword;