import {
  useState,
} from "react";

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
  Checkbox,
  FormControlLabel,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
} from "../firebase";

function Register() {
  const navigate =
    useNavigate();

  const [openTerms,
    setOpenTerms] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptedTerms:
        false,
    });

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
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

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(
        "Google Login Failed"
      );
    }
  };
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        formData.password !==
        formData.confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );

        return;
      }

      if (
        !formData.acceptedTerms
      ) {
        alert(
          "Please accept Terms & Conditions"
        );

        return;
      }

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/register`,
          {
            name:
              formData.name,
            email:
              formData.email,
            phone:
              formData.phone,
            password:
              formData.password,
          }
        );

        alert(
          "Registration Successful"
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
          "Registration Failed"
        );
      }
    };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 6,
        mb: 6,
      }}
    >
      <Card
        sx={{
          borderRadius:
            4,
          boxShadow:
            4,
        }}
      >
        <CardContent
          sx={{
            p: 4,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
          >
            Create Account
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            sx={{
              mb: 3,
            }}
          >
            Join Swastha
            Home Appliances
          </Typography>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              margin="normal"
              onChange={
                handleChange
              }
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              margin="normal"
              onChange={
                handleChange
              }
            />

            <TextField
              fullWidth
              label="Phone"
              name="phone"
              margin="normal"
              onChange={
                handleChange
              }
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              margin="normal"
              onChange={
                handleChange
              }
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              margin="normal"
              onChange={
                handleChange
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formData.acceptedTerms
                  }
                  onChange={(
                    e
                  ) =>
                    setFormData(
                      {
                        ...formData,
                        acceptedTerms:
                          e
                            .target
                            .checked,
                      }
                    )
                  }
                />
              }
              label={
                <>
                  I agree to{" "}
                  <span
                    style={{
                      color:
                        "#2563EB",
                      cursor:
                        "pointer",
                    }}
                    onClick={() =>
                      setOpenTerms(
                        true
                      )
                    }
                  >
                    Terms &
                    Conditions
                  </span>
                </>
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                mb: 2,
              }}
            >
              Register
            </Button>
          </form>

          <Divider
            sx={{
              my: 3,
            }}
          >
            OR
          </Divider>

          <div
            style={{
              display:
                "flex",
              justifyContent:
                "center",
            }}
          >
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
          </div>

          <Typography
            align="center"
            sx={{
              mt: 3,
            }}
          >
            Already have
            an account?{" "}
            <Link
              to="/login"
            >
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>

      <Dialog
        open={
          openTerms
        }
        onClose={() =>
          setOpenTerms(
            false
          )
        }
      >
        <DialogTitle>
          Terms &
          Conditions
        </DialogTitle>

        <DialogContent>
          By using
          Swastha Home
          Appliances,
          you agree to
          provide
          accurate
          information,
          respect our
          policies, and
          use the
          platform
          responsibly.
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Register;