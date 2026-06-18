
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";

function About() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 6,
      }}
    >
      {/* Hero Section */}

      <Box
        sx={{
          textAlign: "center",
          mb: 8,
          p: 6,
          borderRadius: 5,
          background:
            "linear-gradient(135deg,#0F172A,#1E3A8A)",
          color: "white",
        }}
      >
        <Typography
          variant="h2"
          fontWeight={700}
          gutterBottom
        >
          About Swastha
        </Typography>

      </Box>

      {/* Founder Section */}

      <Grid
        container
        spacing={5}
        alignItems="center"
        sx={{
          mb: 8,
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
        >
          <Box
            component="img"
            src="/owner.jpg"
            alt="Owner"
            sx={{
              width: "100%",
              maxWidth: 320,
              borderRadius: "50%",
              display: "block",
              alignContent: "center",
              mx: "auto",
              boxShadow: 5,
              border:
                "5px solid white",
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >
          <Typography
            variant="h4"
            gutterBottom
          >
            Meet the Person
          </Typography>

          <Typography
            variant="h6"
            color="primary"
            gutterBottom
          >
            Anantha Subramaniam
          </Typography>

          <Typography
            sx={{
              lineHeight: 1.9,
            }}
          >
            Through Swastha Home
            Appliances, I provide genuine,
            reliable, and affordable
            home appliances while
            delivering exceptional
            customer service.

            I believe every
            household deserves
            products that improve
            everyday living without
            compromising on quality
            or trust.
          </Typography>
        </Grid>
      </Grid>

      {/* Mission & Vision */}

      <Grid
        container
        spacing={4}
        sx={{
          mb: 8,
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
        </Grid>
      </Grid>

      {/* Brands */}

      <Box
        sx={{
          mb: 8,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          Brands We Offer
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={{
            mb: 4,
          }}
        >
          Trusted brands from across
          the industry.
        </Typography>

        <Box
          component="img"
          src="/brands.jpg"
          alt="Brands"
          sx={{
            width: "100%",
            borderRadius: 4,
            boxShadow: 4,
          }}
        />
      </Box>

      {/* Why Choose Us */}

      <Typography
        variant="h4"
        align="center"
        gutterBottom
      >
        Why Choose Swastha?
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{
          mb: 8,
        }}
      >
        {[
          "Genuine Products",
          "Trusted Brands",
          "Secure Payments",
          "Fast Delivery",
          "Excellent Support",
          "Competitive Pricing",
          "Quality Assurance",
          "Customer First",
        ].map(
          (item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={item}
            >
              <Card
                sx={{
                  textAlign:
                    "center",
                  borderRadius:
                    4,
                  height:
                    "100%",
                }}
              >
                <CardContent>
                  <Typography
                    fontWeight={
                      600
                    }
                  >
                    ✓ {item}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      {/* Contact Section */}

      <Grid
        container
        spacing={5}
      >
        <Grid
          item
          xs={12}
          md={5}
        >
          <Typography
            variant="h4"
            gutterBottom
          >
            Contact Us
          </Typography>

          <Typography>
            <strong>
              Address
            </strong>
            <br />
            First Floor, M A Complex, Shop No.8, NGO Nagar Main Rd, Alapakkam, New Perungalathur, Perungalathur, Chennai, Tamil Nadu 600063
          </Typography>

          <br />

          <Typography>
            <strong>
              Phone
            </strong>
            <br />
            +91 98409 94329
          </Typography>

          <br />

          <Typography>
            <strong>
              Email
            </strong>
            <br />
            swasthahomeappliances@gmail.com
          </Typography>

          <br />

          <Typography>
            <strong>
              Working Hours
            </strong>
            <br />
            Mon - Sat:
            9:00 AM - 8:00 PM
          </Typography>

          <Box
            sx={{
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              href="tel:+919840994329"
              sx={{
                mr: 2,
              }}
            >
              Call Us
            </Button>

            <Button
              variant="outlined"
              href="https://wa.me/919840994329"
            >
              WhatsApp
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5925.072143092821!2d80.11151157358749!3d12.889821916668993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52596308880429%3A0xccd91256cce5e2b8!2sSwastha%20Home%20Appliances!5e1!3m2!1sen!2sin!4v1781795756897!5m2!1sen!2sin" 
            width="100%"
            height="400"
            style={{
              border: 0,
              borderRadius:
                "20px",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Swastha Home"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
