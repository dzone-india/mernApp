import React, { useState } from "react";
import "./register.css";
import {
  Grid,
  Typography,
  Paper,
  Card,
  Box,
  makeStyles,
  Checkbox,
  TextField,
  Button,
  Link,
} from "@material-ui/core";

import bannerImage from "../../images/banner-2.jpeg";
// import FacebookIcon from '@material-ui/icons/Facebook';
// import googleIcon from "../../images/icon-google.png";
// import facebookIcon from "../../images/facebook.png";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import * as RegisterAction from "../../redux/actions/RegisterAction";
import * as Snackbar from "../../redux/actions/SnackbarActions";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import ApiClient from "../../api-client";
import EditIcon from "@material-ui/icons//Edit";

const useStyles = makeStyles((theme) => ({
  bannerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  verify: {
    background: "green",
    height: " 30px",
    top: " 10px",
    left: "5px",
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
    color: "#2C86FF",
    fontSize: 12,
    cursor: "pointer",
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
    marginTop: 20,
    marginBottom: 100,
    width: 800,
    padding: 30,
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 10,
  },
  PhoneInput: {
    marginTop: theme.spacing(2),
  },
}));

const RegisterPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [termsOfUsePrivacyPolicy, setTermsOfUsePrivacyPolicy] =
    React.useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const initialState = {
    email: "",
    password: "",
    fname: "",
    lname: "",
    phone: "",
    cpassword: "",
    otp: "",
  };

  const [states, setState] = useState(initialState);
  const [country, setCountry] = useState("+91");
  const [enableOtpField, setEnableOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifyLoader, setVerifyLoader] = useState(false);

  const handleChange = (event, isChecked) => {
    let value = event.target.value;
  };

  const inputChange = (e) => {
    let { name, value } = e.target;
    if (name === "otp" && value.length == 6 && !isOtpVerified) {
      checkOtpValidOrNot(value);
    }
    if (name === "phone" && enableOtpField) {
      setEnableOtpField(false);
    }
    setState({ ...states, [name]: value });
  };

  const handleSubmit = (e) => {
    debugger;
    const { email, password, fname, lname, phone, cpassword } = states;
    if (password === cpassword) {
      let reqData = {
        firstName: fname,
        lastName: lname,
        email: email,
        password: password,
        mobile: phone,
        countryCode: country,
        userRole: "60f1558fbba58b1a8575920c",
      };

      console.log("reqData  ", reqData);
      dispatch(RegisterAction.RegisterRequestAsync(reqData));
    } else {
      dispatch(Snackbar.showFailSnackbar("Both password must be same"));
    }
  };

  const otpHandler = async () => {
    const cookie =
      "connect.sid=s%3AOTR7JRcRLkCbykuoWLRX4yOvqEZu20Is.4utrypcpaXicNe3A0foHiWeVNP8fQDryd6%2FdCibio%2BI";
    const authorization =
      "Bearer eyJhbGciOiJIUzI1NiJ9.VmlrcmFtSmVldFNpbmdoSkk.MaACpq-fK6F02rVz3vEAUgAYvTqDAEVKpq9zNbmWCPs";
    try {
      setVerifyLoader(true);
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/otp/createOTP",
        { mobile: states.phone },
        {},
        { Cookie: cookie, Authorization: authorization },
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
    const cookie =
      "connect.sid=s%3AOTR7JRcRLkCbykuoWLRX4yOvqEZu20Is.4utrypcpaXicNe3A0foHiWeVNP8fQDryd6%2FdCibio%2BI";
    const authorization =
      "Bearer eyJhbGciOiJIUzI1NiJ9.VmlrcmFtSmVldFNpbmdoSkk.MaACpq-fK6F02rVz3vEAUgAYvTqDAEVKpq9zNbmWCPs";
    try {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/otp/verifyOTP",
        { mobile: states.phone, otp: value },
        {},
        { Cookie: cookie, Authorization: authorization },
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
  const reset = () => {
    setVerifyLoader(false);
    setIsOtpVerified(false);
    setEnableOtpField(false);
    setState({
      phone: "",
      otp: "",
    });
  };
  console.log(
    `
states?.phone?.length == 10 &&
                  states.email.length !== 0 &&
                  states.email.includes("@") &&
                  states.password.length !== 0 &&
                  states.password === states.cpassword &&
                  states.fname.length === 0 &&
                  states.lname.length === 0 &&
                  states.cpassword.length !== 0 &&                  
                  enableOtpField && 
`,
    states?.phone?.length == 10 &&
      states.email.length !== 0 &&
      states.email.includes("@") &&
      states.password.length !== 0 &&
      states.password === states.cpassword &&
      states.fname.length === 0 &&
      states.lname.length === 0 &&
      states.cpassword.length !== 0
  );
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
        <Grid container spacing={1}>
          <Grid item sm={12} md={12} className={classes.login}>
            <Typography sm={6} md={6} className={classes.text1}>
              Register
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TextField
                style={{ width: "45%" }}
                className={classes.textField}
                placeholder="First name"
                variant="outlined"
                fullWidth
                value={states.fname}
                onChange={inputChange}
                name="fname"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              <Box style={{ height: 20 }} />
              <TextField
                style={{ width: "45%" }}
                className={classes.textField}
                placeholder="Last name"
                variant="outlined"
                fullWidth
                value={states.lname}
                onChange={inputChange}
                name="lname"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
            </div>
            <Box style={{ height: 20 }} />
            <TextField
              className={classes.textField}
              placeholder="Email"
              variant="outlined"
              style={{ width: "60%" }}
              fullWidth
              type="email"
              value={states.email}
              onChange={(e) => {
                setEmailValid(e.target.value.includes("@"));
                inputChange(e);
              }}
              name="email"
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "20px",
              }}
            >
              {/* <Box style={{height: 20}} /> */}
              <TextField
                style={{ width: "45%" }}
                className={classes.textField}
                placeholder="Password"
                variant="outlined"
                fullWidth
                value={states.password}
                onChange={inputChange}
                type="password"
                name="password"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              <Box style={{ height: 20 }} />
              <TextField
                className={classes.textField}
                placeholder="Confirm Password"
                variant="outlined"
                fullWidth
                style={{ width: "45%" }}
                value={states.cpassword}
                onChange={inputChange}
                type="password"
                name="cpassword"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
            </div>
            <Box style={{ height: 20 }} />
            <Grid container spacing={1}>
              <Grid item xs={2} sm={2}>
                <PhoneInput
                  className={classes.PhoneInput}
                  international
                  style={{ justifyContent: "flex-end" }}
                  countryCallingCodeEditable={false}
                  defaultCountry="IN"
                  value={country}
                  onChange={setCountry}
                />
              </Grid>
              <Grid item xs={10} sm={10}>
                <div style={{ display: "flex" }}>
                  <TextField
                    className={classes.textField}
                    placeholder="Mobile number"
                    variant="outlined"
                    fullWidth
                    value={states.phone}
                    disabled={isOtpVerified}
                    onChange={(e) => {
                      if (e.target.value.length <= 10) inputChange(e);
                    }}
                    name="phone"
                    type="number"
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                  />
                  {states?.phone?.length == 10 &&
                  states.email.length !== 0 &&
                  states.email.includes("@") &&
                  states.password.length !== 0 &&
                  states.password === states.cpassword &&
                  states.fname.length !== 0 &&
                  states.lname.length !== 0 &&
                  states.cpassword.length !== 0 &&
                  !enableOtpField ? (
                    <Button
                      onClick={otpHandler}
                      variant="contained"
                      className={classes.verify}
                      style={{
                        background: "green",
                        height: "30px",
                        color: "#fff",
                      }}
                    >
                      Verify
                    </Button>
                  ) : (
                    isOtpVerified && (
                      <div onClick={reset}>
                        {" "}
                        <EditIcon />{" "}
                      </div>
                    )
                  )}
                </div>
                {states?.phone?.length == 10 &&
                  states.email.length !== 0 &&
                  states.email.includes("@") &&
                  states.password.length !== 0 &&
                  states.password === states.cpassword &&
                  states.fname.length !== 0 &&
                  states.lname.length !== 0 &&
                  states.cpassword.length !== 0 &&
                  enableOtpField && (
                    <>
                      <TextField
                        className={classes.textField}
                        placeholder="Otp"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                        variant="outlined"
                        fullWidth
                        value={states.otp}
                        disabled={isOtpVerified}
                        onChange={inputChange}
                        name="otp"
                        type="number"
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutline,
                          },
                        }}
                      />
                      {!isOtpVerified && (
                        <Button
                          style={{ width: "23%" }}
                          onClick={otpHandler}
                          variant="contained"
                          style={{
                            background: "green",
                            height: " 30px",
                            top: " 10px",
                            left: "5px",
                            color: "#fff",
                            margin: "auto",
                            display: "block",
                          }}
                        >
                          Resend OTP
                        </Button>
                      )}
                    </>
                  )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Checkbox
              checked={termsOfUsePrivacyPolicy}
              onChange={() =>
                setTermsOfUsePrivacyPolicy(!!!termsOfUsePrivacyPolicy)
              }
              name="terms_n_conditions"
            />
            I accept the{" "}
            <Link className={classes.text3} to="#">
              Terms of Use
            </Link>{" "}
            &{" "}
            <Link to="#" className={classes.text3}>
              Privacy Policy
            </Link>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              variant="contained"
              disabled={
                !termsOfUsePrivacyPolicy ||
                states.phone.length !== 10 ||
                states.email.length === 0 ||
                !states.email.includes("@") ||
                states.password.length === 0 ||
                states.password !== states.cpassword ||
                states.fname.length === 0 ||
                states.lname.length === 0 ||
                states.phone.length !== 10 ||
                states.cpassword.length === 0 ||
                states.otp.length === 0 ||
                !isOtpVerified
              }
              onClick={handleSubmit}
              className={classes.btn2}
            >
              Register
            </Button>
          </Grid>
          <Grid item xs={12} md={12} className={classes.gridStyle3}>
            <Link component={RouterLink} to="/signin">
              Already have account?
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default RegisterPage;
