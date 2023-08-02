import React, { useState, useEffect } from "react";
import "./login.css";
import {
  Grid,
  Typography,
  Paper,
  Card,
  Box,
  makeStyles,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import bannerImage from "../../images/banner-2.jpeg";
import googleIcon from "../../images/icon-google.png";
import facebookIcon from "../../images/facebook.png";
import * as MobileLoginAction from "../../redux/actions/MobileLoginAction";
import * as LoginAction from "../../redux/actions/LoginAction";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import ApiClient from "../../api-client";
import * as Snackbar from "../../redux/actions/SnackbarActions";
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
    justifyContent: "center",
    marginBottom: "10px",
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
    paddingTop: 10,
    paddingBottom: 40,
    borderRadius: 10,
  },
}));

const LoginPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [emailValid, setEmailValid] = useState(false);
  // const [rememberMe, setRememberMe] = React.useState(false);
  const [enableOtpField, setEnableOtpField] = useState(false);
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const initialState = {
    email: "",
    password: "",
    mobile: "",
    otp: "",
  };
  const [state, setState] = useState(initialState);
  useEffect(() => {
    document.querySelector("input").autocomplete = "off";
  }, []);
  const inputChange = (e) => {
    debugger;
    let currState = { ...state };
    let { name, value } = e.target;

    if (name === "otp" && value.length === 6 && !isOtpVerified) {
      checkOtpValidOrNot(value);
    }

    if (name === "email") {
      if (!isNaN(value) && value !== "") {
        currState = { ...state, mobile: value };
      } else {
        currState.mobile = "";
      }
    }
    currState = { ...currState, [name]: value };
    // if (currState.mobile.length === 10 && name === "email") {
    //   otpHandler();
    // }
    setState(currState);
    // if (currState.mobile.length === 10) {
    //   otpHandler();
    // }
  };
  // const otpHandler = async () => {
  //   const cookie =
  //     "connect.sid=s%3AOTR7JRcRLkCbykuoWLRX4yOvqEZu20Is.4utrypcpaXicNe3A0foHiWeVNP8fQDryd6%2FdCibio%2BI";
  //   const authorization =
  //     "Bearer eyJhbGciOiJIUzI1NiJ9.VmlrcmFtSmVldFNpbmdoSkk.MaACpq-fK6F02rVz3vEAUgAYvTqDAEVKpq9zNbmWCPs";
  //   try {
  //     setVerifyLoader(true);
  //     const response = await ApiClient.call(
  //       ApiClient.REQUEST_METHOD.POST,
  //       "/otp/createOTP",
  //       { mobile: state.mobile },
  //       {},
  //       { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
  //       false
  //     );
  //     setEnableOtpField(true);
  //     setVerifyLoader(false);
  //     dispatch(Snackbar.showSuccessSnackbar("Otp sent successfully"));
  //   } catch (error) {
  //     console.error("this is the error::", error);
  //     dispatch(
  //       Snackbar.showFailSnackbar(
  //         "We are facing some issue Please try again later."
  //       )
  //     );
  //     setVerifyLoader(false);
  //   }
  // };
  const otpHandler = async () => {
    try {
      setVerifyLoader(true);
      console.log("mobile mobile mobile mobile", state.mobile);
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/otp/createOTP",
        { mobile: state.mobile },
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      setEnableOtpField(true);
      setVerifyLoader(false);
      dispatch(Snackbar.showSuccessSnackbar("Otp sent successfully"));
    } catch (error) {
      console.error("this is the error::", error);
      dispatch(
        Snackbar.showFailSnackbar(
          "We are facing some issue Please try again later."
        )
      );
      setVerifyLoader(false);
    }
  };
  const checkOtpValidOrNot = async (value) => {
    try {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/otp/verifyOTP",
        { mobile: state.mobile, otp: value },
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      if (response.status) {
        setIsOtpVerified(true);
        dispatch(Snackbar.showSuccessSnackbar("Otp Verified SuccessFully"));
      } else {
        setIsOtpVerified(false);
        dispatch(Snackbar.showFailSnackbar("Please type Valid otp."));
      }
    } catch (error) {
      setIsOtpVerified(false);
      dispatch(
        Snackbar.showFailSnackbar(
          "We are facing some issue Please try again later."
        )
      );
    }
  };

  // const checkOtpValidOrNot = async (value) => {
  //   try {
  //     const response = await ApiClient.call(
  //       ApiClient.REQUEST_METHOD.POST,
  //       "/otp/verifyOTP",
  //       { mobile: state.mobile, otp: value },
  //       {},
  //       null,
  //       false
  //     );
  //     if (response.status) {
  //       setIsOtpVerified(true);
  //       dispatch(Snackbar.showSuccessSnackbar("Otp Verified SuccessFully"));
  //     } else {
  //       setIsOtpVerified(false);
  //       dispatch(Snackbar.showFailSnackbar("Please type Valid otp."));
  //     }
  //   } catch (error) {
  //     setIsOtpVerified(false);
  //     dispatch(
  //       Snackbar.showFailSnackbar(
  //         "We are facing some issue Please try again later."
  //       )
  //     );
  //   }
  // };
  const loginSubmit = (e) => {
    debugger;
    const { email, password, mobile, otp } = state;
    if (mobile.length === 10) {
      let reqData = {
        mobile: mobile,
        otp: otp,
      };
      console.log("reqData  ", reqData);

      dispatch(MobileLoginAction.LoginRequestAsync(reqData));
    } else {
      let reqData = {
        email: email,
        password: password,
      };
      dispatch(LoginAction.LoginRequestAsync(reqData));
    }
  };
  const handleChange = (e) => {
    //
  };
  console.log("!enableOtpField", !enableOtpField);
  console.log("state.mobile?.length", state.mobile?.length);
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
          <Grid
            item
            sm={12}
            md={12}
            className={`${classes.login} ${classes.gridStyle2}`}
            style={{ flexDirection: "column" }}
          >
            <Typography className={classes.text1}>Login In</Typography>
            <TextField
              className={classes.textField}
              placeholder="Email or Mobile"
              variant="outlined"
              fullWidth
              name="email"
              value={state.mobile ? state.mobile : state.email}
              onChange={(e) => {
                if (enableOtpField) {
                  setEnableOtpField(false);
                }
                if (isNaN(e.target.value)) {
                  setEmailValid(e.target.value.includes("@"));
                  inputChange(e);
                } else {
                  if (e.target.value.length <= 10) inputChange(e);
                }
              }}
              // onChange={inputChange}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
            {
              state.mobile.length === 10 && !enableOtpField && (
                <Button
                  style={{
                    background: "green",
                    height: " 30px",
                    top: " 10px",
                    left: "5px",
                    color: "#fff",
                    width: "23%",
                    marginBottom: 15,
                  }}
                  onClick={otpHandler}
                  variant="contained"
                >
                  Verify
                </Button>
              )
              // : (
              //   isOtpVerified && (
              //     <div onClick={reset}>
              //       {" "}
              //       <EditIcon />{" "}
              //     </div>
              //   )
              // )
            }
            <Box style={{ height: 20 }} />
            {enableOtpField && (
              <>
                <TextField
                  className="EmiInputs"
                  placeholder="Otp"
                  style={{ width: "50%", color: "#FFFFFF" }}
                  fullWidth
                  value={state.otp}
                  disabled={isOtpVerified}
                  onChange={inputChange}
                  name="otp"
                  type="number"
                  variant="outlined"
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  // InputProps={{
                  //   classes: {
                  //     notchedOutline: classes.notchedOutline,
                  //   },
                  // }}
                  // InputLabelProps={{
                  //   style: { color: "#FFFFFF" },
                  // }}
                />
                {!isOtpVerified && (
                  <Button
                    style={{
                      background: "green",
                      height: " 30px",
                      top: " 10px",
                      left: "5px",
                      color: "#fff",
                      // width: "23%",
                      marginBottom: 15,
                    }}
                    onClick={otpHandler}
                    variant="contained"
                  >
                    Resend OTP
                  </Button>
                )}
              </>
            )}

            {/* // : (
              //   isOtpVerified && (
              //     <div onClick={reset}>
              //       {" "}
              //       <EditIcon />{" "}
              //     </div>
              //   )
              // )
            } */}
            <Box style={{ height: 20 }} />
            {/* {state.mobile?.length === 10 && (
              <>
                <TextField
                  className="EmiInputs"
                  placeholder="Otp"
                  style={{ width: "50%", color: "#FFFFFF" }}
                  fullWidth
                  value={state.otp}
                  disabled={isOtpVerified}
                  onChange={inputChange}
                  name="otp"
                  type="number"
                  variant="outlined"
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </>
            )} */}

            {state.email.includes("@") && (
              <TextField
                className={classes.textField}
                placeholder="Password"
                variant="outlined"
                name="password"
                type="password"
                value={state.password}
                onChange={inputChange}
                fullWidth
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={12} className={classes.gridStyle2}>
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  name="remember_me"
                />
              }
              label="Remember Me"
            /> */}
            <Link component={RouterLink} to="/forgot-password">
              Forgot Password?
            </Link>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              variant="contained"
              className={classes.btn2}
              disabled={
                state.mobile.length === 10
                  ? state?.otp?.length === 0
                  : state.email.length === 0 || state.password.length === 0
              }
              onClick={loginSubmit}
            >
              Login
            </Button>
          </Grid>
          {/* <Grid item xs={12} md={12}>
            <Typography className={classes.text2}>Or login with</Typography>
          </Grid>
          <Grid item xs={12} md={12} className={classes.gridStyle3}>
            <Paper className={classes.iconContainer}>
              <img src={facebookIcon} className={classes.icon} />
            </Paper>
            <Box style={{width: 10}}></Box>
            <Paper className={classes.iconContainer}>
              <img src={googleIcon} className={classes.icon} />
            </Paper>
          </Grid> */}
          <Grid item xs={12} md={12} className={classes.gridStyle3}>
            <Link component={RouterLink} to="/register">
              Create Account?
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default LoginPage;
