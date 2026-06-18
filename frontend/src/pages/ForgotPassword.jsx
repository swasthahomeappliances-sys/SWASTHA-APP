import { useState } from "react";
import axios from "axios";

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

function ForgotPassword() {
  const [email,
    setEmail] =
    useState("");

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await axios.post(
          "http://localhost:5000/api/auth/forgot-password",
          { email }
        );

        alert(
          "Reset link sent if account exists"
        );
      } catch (
        error
      ) {
        console.error(
          error
        );

        alert(
          "Failed to send reset email"
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
      <Card>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
          >
            Forgot Password
          </Typography>

          <Typography
            sx={{
              mb: 3,
            }}
          >
            Enter your email
            address and we'll
            send you a password
            reset link.
          </Typography>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              sx={{
                mb: 3,
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
            >
              Send Reset Link
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ForgotPassword;