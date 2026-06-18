import { Container } from "@mui/material";

function PageContainer({
  children,
}) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        mb: 5,
      }}
    >
      {children}
    </Container>
  );
}

export default PageContainer;