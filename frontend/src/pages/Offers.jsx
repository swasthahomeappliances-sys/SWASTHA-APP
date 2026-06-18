import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import {
  Link,
} from "react-router-dom";

function Offers() {
  const [ads, setAds] =
    useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds =
    async () => {
      try {
        const response =
          await axios.get(
            "http://localhost:5000/api/advertisements"
          );

        setAds(
          response.data
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
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
      >
        Current Offers
      </Typography>

      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: "20px",
        }}
      >
        {ads.map(
          (ad) => (
            <Card
              key={ad.id}
            >
              {ad.media_type ===
              "VIDEO" ? (
                <video
                  controls
                  width="100%"
                >
                  <source
                    src={
                      ad.video_url
                    }
                  />
                </video>
              ) : (
                <img
                  src={
                    ad.image_url
                  }
                  alt={
                    ad.title
                  }
                  width="100%"
                />
              )}

              <CardContent>
                <Typography
                  variant="h5"
                >
                  {
                    ad.title
                  }
                </Typography>

                <Typography>
                  {
                    ad.description
                  }
                </Typography>

                <Button
                  component={
                    Link
                  }
                  to={`/product/${ad.product_id}`}
                  variant="contained"
                  sx={{
                    mt: 2,
                  }}
                >
                  {
                    ad.button_text
                  }
                </Button>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </Container>
  );
}

export default Offers;