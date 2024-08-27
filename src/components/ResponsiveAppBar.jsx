import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const useStyles = makeStyles((theme) => ({
  appBar: {
    color: "white",
  },
}));

function ResponsiveAppBar() {
  const classes = useStyles();
  return (
    <AppBar
      className={classes.appBar}
      position="static"
      color="inherit"
      elevation={4}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{ height: 54 }}
            alt="Logo"
            src={require("../constant/nio_logo.jpeg")}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              marginLeft: "10px",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Admin
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
