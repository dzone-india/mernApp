import React from "react";
import { Box, Button, Link, Typography } from "@material-ui/core";
import {
  Link as RouterLink,
  // useLocation
} from "react-router-dom";
import "./404style.css";
const Error404Page = () => {
  return (
    <>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "45%",
        }}
      >
        <Typography
          component="h2"
          variant="h2"
          className="headline text-yellow"
        >
          404
        </Typography>
      </Box>
      <br />
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "15%",
        }}
      >
        <Typography component="h3" variant="h3" className="text-yellow">
          PAGE NOT FOUND !
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link component={RouterLink} to="/">
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={"CanceForm"}
          >
            Back To Dashboard
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Error404Page;
