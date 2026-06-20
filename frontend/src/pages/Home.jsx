
import {
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function Home() {
  const navigate =
    useNavigate();
const [ads, setAds] =
  useState([]);
  const [products,
  setProducts] =
  useState([]);
const [currentAd, setCurrentAd] =
  useState(0);
useEffect(() => {
  fetchAds();
   fetchProducts();
}, []);
const fetchProducts =
  async () => {
    try {
      const response =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        );

      setProducts(
        response.data
          .slice(0, 4)
      );
    } catch (
      error
    ) {
      console.error(
        error
      );
    }
  };
const fetchAds =
  async () => {
    const response =
      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/advertisements`
      );

    setAds(
      response.data
    );
  };
  useEffect(() => {
  if (
    ads.length === 0
  )
    return;

  const interval =
    setInterval(() => {
      setCurrentAd(
        (prev) =>
          (prev + 1) %
          ads.length
      );
    }, 5000);

  return () =>
    clearInterval(
      interval
    );
}, [ads]);
  return (
    <>
      <Box
        sx={{
          minHeight:
            "70vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556911220-bff31c812dba')",
          backgroundSize:
            "cover",
          backgroundPosition:
            "center",
          display: "flex",
          alignItems:
            "center",
        }}
      >
        <Container
          maxWidth="lg"
        >
          <Box
            sx={{
              background:
                "rgba(255,255,255,0.85)",
              p: 5,
              borderRadius: 4,
              maxWidth:
                "600px",
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
            >
            𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐒𝐰𝐚𝐬𝐭𝐡𝐚 𝐇𝐨𝐦𝐞 𝐀𝐩𝐩𝐥𝐢𝐚𝐧𝐜𝐞𝐬
            </Typography>

            <Typography
              variant="h5"
              gutterBottom
            >
              because you deserve the life you desire...
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() =>
                navigate(
                  "/products"
                )
              }
              sx={{
                mt: 2,
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          mt: 5,
        }}
      >
       <Typography
  variant="h4"
  sx={{
    mb: 3,
  }}
>
  Featured Offers
</Typography>

{ads.length > 0 && (
  <>
    <Card
      component={Link}
      to={`/product/${ads[currentAd].product_id}`}
      sx={{
        textDecoration:
          "none",
        overflow:
          "hidden",
        cursor:
          "pointer",
        borderRadius: 4,
      }}
    >
      {ads[currentAd]
        .media_type ===
      "VIDEO" ? (
        <video
          autoPlay
          muted
          loop
          controls
          width="100%"
          style={{
            maxHeight:
              "500px",
            objectFit:
              "cover",
          }}
        >
          <source
            src={
              ads[
                currentAd
              ].video_url
            }
          />
        </video>
      ) : (
        <img
          src={
            ads[
              currentAd
            ].image_url
          }
          alt={
            ads[
              currentAd
            ].title
          }
          style={{
            width:
              "100%",
            maxHeight:
              "500px",
            objectFit:
              "cover",
          }}
        />
      )}

      <CardContent>
        <Typography
          variant="h3"
          gutterBottom
        >
          {
            ads[
              currentAd
            ].title
          }
        </Typography>

        <Typography
          variant="h6"
        >
          {
            ads[
              currentAd
            ]
              .description
          }
        </Typography>
      </CardContent>
    </Card>
<Box
  sx={{
    mt: 8,
  }}
>
  <Typography
    variant="h4"
    gutterBottom
  >
    Featured Products
  </Typography>

  <Box
    sx={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: 3,
    }}
  >
    {products.map(
      (product) => (
        <Card
          key={
            product.id
          }
          component={Link}
          to={`/product/${product.id}`}
          sx={{
            textDecoration:
              "none",
          }}
        >
          <img
            src={
              product.image_url
            }
            alt={
              product.name
            }
            style={{
              width:
                "100%",
              height:
                "220px",
              objectFit:
                "cover",
            }}
          />

          <CardContent>
            <Typography
              variant="h6"
            >
              {
                product.name
              }
            </Typography>

            <Typography>
              ₹
              {
                product.price
              }
            </Typography>
          </CardContent>
        </Card>
      )
    )}
  </Box>
</Box>
    <Box
      sx={{
        mt: 2,
        display:
          "flex",
        justifyContent:
          "center",
        gap: 2,
      }}
    >
      <Button
        variant="outlined"
        onClick={() =>
          setCurrentAd(
            currentAd ===
              0
              ? ads.length -
                  1
              : currentAd -
                  1
          )
        }
      >
        Previous
      </Button>

      <Button
        variant="outlined"
        onClick={() =>
          setCurrentAd(
            (currentAd +
              1) %
              ads.length
          )
        }
      >
        Next
      </Button>
    </Box>
  </>
)}

        
      </Container>
    </>
  );
}

export default Home;
