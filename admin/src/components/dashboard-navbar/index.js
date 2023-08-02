import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import history from "../history";
const Idle = require("react-idle").default;

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  function handlelogout() {
    window.localStorage.removeItem("user");
    history.push("/login");
    window.location.reload();
  }

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <HomeIcon />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit">
            <ExitToAppIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Idle
          timeout={15 * 60 * 1000}
          render={({ idle }) => (
            <h1>
              {idle ? (
                handlelogout()
              ) : (
                <Box
                  onClick={handlelogout}
                  style={{
                    cursor: "pointer",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    Logout
                  </Typography>
                  <ExitToAppIcon className="logoutBtn" />
                </Box>
              )}
            </h1>
          )}
        />
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
