import {
  createTheme,
} from "@mui/material/styles";

const theme =
  createTheme({
    palette: {
      primary: {
        main:
          "#2563EB",
      },

      secondary: {
        main:
          "#F97316",
      },

      background: {
        default:
          "#F8FAFC",
      },
    },

    typography: {
      fontFamily:
        "'Inter', sans-serif",

      h1: {
        fontFamily:
          "'Poppins', sans-serif",
      },

      h2: {
        fontFamily:
          "'Poppins', sans-serif",
      },

      h3: {
        fontFamily:
          "'Poppins', sans-serif",
      },

      h4: {
        fontFamily:
          "'Poppins', sans-serif",
      },

      h5: {
        fontFamily:
          "'Poppins', sans-serif",
      },

      h6: {
        fontFamily:
          "'Poppins', sans-serif",
      },

      button: {
        fontFamily:
          "'Poppins', sans-serif",
        fontWeight: 600,
      },
    },
  });

export default theme;