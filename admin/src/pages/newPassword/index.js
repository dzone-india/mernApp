import React, { useState } from "react";

import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Link,
} from "@material-ui/core";

import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";

import loginImage from "./adminLogin.jpg";
import * as NewPasswordAction from "../../redux/actions/NewPasswordAction";
import * as Snackbar from "../../redux/actions/snackbarActions";
import { useDispatch } from "react-redux";

import { Link as RouterLink, useLocation } from "react-router-dom";

const styles = (theme) => ({
  container: {
    height: "100vh",
    backgroundColor: "white",
    color: "black",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },

  logotypeContainer: {
    backgroundImage: "url(" + loginImage + ")",
    backgroundSize: "cover",
    width: "55%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  googleButton: {
    fontWeight: "bolder",
    color: "black",
    marginRight: 6,
  },
  logotypeImage: {
    width: "42%",
    padding: "20px",
    backgroundColor: "#fff",
    marginBottom: theme.spacing(4),
  },
  logotypeText: {
    color: "black",
    fontWeight: 500,
    fontSize: 65,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  formContainer: {
    width: "45%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },

  mainHeading: {
    fontWeight: "bolder",
    letterSpacing: 4,
    fontSize: 23,
    paddingBottom: 10,
  },

  welcomeHeading: {
    fontWeight: "bold",
  },
  form: {
    width: 320,
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
  },
  checkbox: {
    position: "relative",
    left: -9,
    top: -10,
  },
  alignCheckboxHeading: {
    top: -10,
    position: "relative",
    left: -15,
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(2),
  },

  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing(2),
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40",
  },
  errorMessage: {
    textAlign: "center",
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light,
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  },
  textField: {
    borderColor: theme.palette.background.light,
    borderWidth: "5px",
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: theme.spacing(2),
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400,
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
  },
  copyright: {
    marginTop: theme.spacing(4),
    whiteSpace: "nowrap",
    fontSize: "14px",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing(2),
    },
  },
  createAccount: {
    marginTop: theme.spacing(2),
    whiteSpace: "nowrap",
    fontSize: "14px",
    color: "black",
  },
});
const ResetPassword = (props) => {
  let query = useQuery();
  let token = query.get("token");

  const initialState = {
    password: "",
    cpassword: "",
    token: token,
  };
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };
  const loginSubmit = (e) => {
    const { password, cpassword, token } = state;
    if (password === cpassword) {
      let reqData = {
        newPassword: password,
        token: token,
      };
      dispatch(NewPasswordAction.NewPasswordRequestAsync(reqData));
    } else {
      dispatch(Snackbar.showFailSnackbar("Both password must be same."));
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const { classes } = props;
  return (
    <>
      <Grid container className={classes.container}>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Typography className={classes.mainHeading}>
              Vishal Properties
            </Typography>
            <Typography className={classes.welcomeHeading}>
              Set New Password
            </Typography>
            <React.Fragment>
              <TextField
                id="password"
                variant="outlined"
                name="password"
                className={classes.textField}
                label="New Password"
                value={state.password}
                onChange={inputChange}
                margin="normal"
                placeholder="New Password"
                type="password"
                fullWidth
              />

              <TextField
                id="cpassword"
                variant="outlined"
                name="cpassword"
                className={classes.textField}
                label="Confirm Password"
                value={state.cpassword}
                onChange={inputChange}
                margin="normal"
                placeholder="Confirm Password"
                type="password"
                fullWidth
              />

              <div className={classes.formButtons}>
                {false ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    fullWidth
                    disabled={
                      state?.password?.length === 0 ||
                      state?.cpassword?.length === 0
                    }
                    onClick={loginSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </React.Fragment>
          </div>
          <Typography color="primary" className={classes.createAccount}>
            Back to{" "}
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </div>

        <div className={classes.logotypeContainer}>
          {/* <img src={logo} alt="logo" className={classes.logotypeImage} /> */}
        </div>
      </Grid>
      {/* <Register /> */}
    </>
  );
};

function mapStateToProps(state) {
  console.log("state  ", state);
  // const { loggingIn } = state.ResetPassword.data;
  const { users } = state;
  return {
    // loggingIn,
    users,
  };
}
export default connect(mapStateToProps)(withStyles(styles)(ResetPassword));
