import React, { useEffect } from "react";
import { Grid, Typography, Paper, makeStyles, Link } from "@material-ui/core";
import bannerImage from "../../images/banner-2.jpeg";
import { connect } from "react-redux";
import * as VerificationAction from "../../redux/actions/VerificationAction";
import { Link as RouterLink, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  bannerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#4B2353",
    fontSize: 30,
    marginBottom: 20,
  },
  text2: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#8C8C8C",
    fontSize: 14,
    marginTop: 10,
  },
  text3: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FFFFFF",
    fontSize: 14,
  },
  text4: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  login: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  gridStyle2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gridStyle3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  textField: {
    borderRadius: 5,
    borderColor: "#FFFFFF",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderRadius: 25,
    borderColor: "#dddddd !important",
    boxShadow: 1,
  },
  btn2: {
    borderRadius: 20,
    background: "#FF7601",
    color: "#FFFFFF",
    textTransform: "none",
    fontFamily: "Open Sans,sans-serif",
    paddingLeft: 30,
    paddingRight: 30,
  },
  iconContainer: {
    borderRadius: 40,
    padding: 10,
    cursor: "pointer",
  },
  icon: {
    width: 25,
    height: 25,
  },
  main: {
    marginTop: 100,
    marginBottom: 100,
    width: 400,
    padding: 40,
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 10,
  },
}));

const VerificationPage = (props) => {
  const classes = useStyles();

  let query = useQuery();
  let token = query.get("token");

  useEffect(() => {
    let data = {
      token: token,
    };
    if (token != null) {
      props.dispatch(VerificationAction.VerificationRequestAsync(data));
    }
  }, [token]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return (
    <div
      className={`${classes.bannerContainer}`}
      style={{
        backgroundImage: `url(${bannerImage}`,
        // height: 326,
        overflow: "hidden",
        textAlign: "center",
        backgroundSize: "cover",
        position: "relative",
        backgroundPosition: "center",
      }}
    >
      <Paper className={classes.main}>
        <Grid container style={{ flexDirection: "column" }}>
          <Grid item sm={12} md={12} className={classes.login}>
            <Typography className={classes.text1}>User Verification</Typography>

            <Typography className={classes.welcomeHeading}>
              {props?.verification?.response?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} md={12} className={classes.gridStyle3}>
            <Link component={RouterLink} to="/signin">
              Back to login
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

function mapStateToProps(state) {
  const { verification } = state;
  console.log("state", verification);
  return {
    verification,
  };
}
export default connect(mapStateToProps)(VerificationPage);
