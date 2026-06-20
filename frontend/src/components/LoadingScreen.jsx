import {
  Box,
  Typography,
} from "@mui/material";

function LoadingScreen() {
  return (
    <>
      <style>
        {`
          @keyframes pulseLogo {
            0% {
              transform: scale(1);
            }

            50% {
              transform: scale(1.08);
            }

            100% {
              transform: scale(1);
            }
          }

          @keyframes fadeText {
            0% {
              opacity: 0.5;
            }

            50% {
              opacity: 1;
            }

            100% {
              opacity: 0.5;
            }
          }

          @keyframes dots {
            0% {
              content: "";
            }

            33% {
              content: ".";
            }

            66% {
              content: "..";
            }

            100% {
              content: "...";
            }
          }
        `}
      </style>

      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          background:
            "linear-gradient(135deg,#1E3A8A,#2563EB,#38BDF8)",

          display: "flex",
          flexDirection: "column",

          justifyContent: "center",
          alignItems: "center",

          overflow: "hidden",
        }}
      >
        <img
          src="/logo.png"
          alt="Swastha"
          style={{
            width: "120px",
            height: "120px",
            objectFit: "contain",

            animation:
              "pulseLogo 2s ease-in-out infinite",

            filter:
              "drop-shadow(0 10px 25px rgba(0,0,0,0.25))",
          }}
        />

        <Typography
          sx={{
            color:
              "rgba(255,255,255,0.85)",

            fontSize: {
              xs: "0.9rem",
              md: "1.1rem",
            },

            mt: 0.5,

            animation:
              "fadeText 2s infinite",
          }}
        >
     Loading your store...
        </Typography>

       
      </Box>
    </>
  );
}

export default LoadingScreen;