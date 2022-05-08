import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/dcphantom">
        dcphantom
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const StickyFooter: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="caption">
          <Link
            sx={{ textDecoration: "none" }}
            color="text.secondary"
            href="https://pngtree.com/freepng/elephant-logo-vector-monoline-art-illustration_5105835.html?sol=downref&id=bef"
            target="_blank"
          >
            Illustration PNG Designed By starwash
          </Link>
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
};

export default StickyFooter;
