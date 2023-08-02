import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import "./contact-us.css";
import PageBanner from "../../components/page-banner";
import bannerImage from "../../images/contact-us.jpeg";
import { withRouter } from "react-router-dom";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";

import { useDispatch } from "react-redux";
import * as ContactusAction from "../../redux/actions/ContactusAction";
import ApiClient from "../../api-client";
import EditIcon from "@material-ui/icons//Edit";
import * as Snackbar from "../../redux/actions/SnackbarActions";

const useStyles = makeStyles((theme) => ({
  text1: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FF7660",
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  text3: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#666666",
    fontSize: 14,
  },
  text4: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#333333",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 2,
  },
  text5: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  style1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  btn1: {
    // borderRadius: 8,
    color: "#06AEB8",
    textTransform: "none",
    fontFamily: '"Open Sans",sans-serif',
    backgroundColor: "#FFFFFF",
    marginTop: 20,
  },
  btn2: {
    borderRadius: 15,
    color: "#FFFFFF",
    textTransform: "none",
    marginRight: 10,
    fontFamily: '"Open Sans",sans-serif',
  },
  style2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  socialBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#06AEB8",
    marginRight: 8,
    width: 26,
    height: 26,
    borderRadius: 25,
    cursor: "pointer",
  },
  disabledButton: {
    color: 'red',
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#FFFFFF !important",
  },
}));

const ContactUsPage = (props) => {
  const classes = useStyles();
  const { item } = props;
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [companyDetails, setCompanyDetails] = useState({});
  const [socialLinks, setSocialLinks] = useState({});
  const [emailValid, setEmailValid] = useState(false);
  const [enableOtpField, setEnableOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [otp, setOtp] = useState("");

  const otpHandler = async () => {
    try {
      setVerifyLoader(true);
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/otp/createOTP",
        { mobile: mobile },
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
        { mobile: mobile, otp: value },
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
  const reset = () => {
    setVerifyLoader(false);
    setIsOtpVerified(false);
    setEnableOtpField(false);
    setMobile("");
    setOtp("");
  };
  const inputChange = (e) => {
    let { name, value } = e.target;
    setOtp(value);
    if (name === "otp" && value.length == 6 && !isOtpVerified) {
      checkOtpValidOrNot(value);
    }
  };

  const dispatch = useDispatch();
  const handleData = (e) => {
    const userData = {
      name: name,
      email: email,
      mobile: mobile,
      subject: subject,
      message: message,
    };

    dispatch(ContactusAction.ContactusRequestAsync(userData));
    // toast.success('Request Sent successfully', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
    setName("");
    setMobile("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  useEffect(() => {
    let company_detials = localStorage.getItem("company_detials");
    company_detials = JSON.parse(company_detials);
    setCompanyDetails(company_detials);

    let social_links = localStorage.getItem("social-links");
    social_links = JSON.parse(social_links);
    setSocialLinks(social_links);
  }, []);

  return (
    <div style={{ background: "#F7F7F7" }}>
      <PageBanner
        bgImage={bannerImage}
        title="Contact Us"
        currentPage="CONTACT US"
      />
      <Container
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Paper style={{ padding: 20 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} className={classes.style1}>
              <Typography className={classes.text1}>
                Let's get in touch
              </Typography>
              <Typography className={classes.text4}>
                Contact us with the following details. and fillup the form with
                the details.
              </Typography>
              <Grid container>
                <Grid item xs={12} md={12} className={classes.style2}>
                  <LocationOnIcon
                    style={{
                      color: "#FF7601",
                      fontSize: 25,
                      padding: 0,
                      marginRight: 8,
                    }}
                  />
                  <Typography className={classes.text3}>
                    {companyDetails?.adress} {companyDetails?.city}{" "}
                    {companyDetails?.state} - {companyDetails?.pinCode}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={12} className={classes.style2}>
                  <MailOutlineIcon
                    style={{
                      color: "#FF7601",
                      fontSize: 25,
                      padding: 0,
                      marginRight: 8,
                    }}
                  />
                  <Typography className={classes.text3}>
                    {companyDetails?.email}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={12} className={classes.style2}>
                  <PhoneIphoneIcon
                    style={{
                      color: "#FF7601",
                      fontSize: 25,
                      padding: 0,
                      marginRight: 8,
                    }}
                  />
                  <Typography className={classes.text3}>
                    {companyDetails?.mobile}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={12} className={classes.style2}>
                  <AccessTimeIcon
                    style={{
                      color: "#FF7601",
                      fontSize: 25,
                      padding: 0,
                      marginRight: 8,
                    }}
                  />
                  <Typography className={classes.text3}>
                    {companyDetails?.timming}
                  </Typography>
                </Grid>
              </Grid>
              <Typography className={classes.text4} style={{ marginTop: 30 }}>
                Connect with us :
              </Typography>
              <Grid container>
                <Grid item xs={12} md={12} className={classes.style2}>
                  <Box className={`${classes.socialBox} social_icon`}>
                    <a href={socialLinks?.facebook}>
                      <FacebookIcon
                        style={{ color: "#FFFFFF", fontSize: 20, padding: 0 }}
                      />
                    </a>
                  </Box>
                  <Box className={`${classes.socialBox} social_icon`}>
                    <a href={socialLinks?.twitter}>
                      <TwitterIcon
                        style={{ color: "#FFFFFF", fontSize: 20, padding: 0 }}
                      />
                    </a>
                  </Box>
                  <Box className={`${classes.socialBox} social_icon`}>
                    <a href={socialLinks?.instagram}>
                      <InstagramIcon
                        style={{ color: "#FFFFFF", fontSize: 20, padding: 0 }}
                      />
                    </a>
                  </Box>
                  <Box className={`${classes.socialBox} social_icon`}>
                    <a href={socialLinks?.linkedin}>
                      <LinkedInIcon
                        style={{ color: "#FFFFFF", fontSize: 20, padding: 0 }}
                      />
                    </a>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className={`${classes.style1} grid1`}
              style={{ background: "#FF7601", padding: 20 }}
            >
              <Typography className={classes.text5}>Contact Us</Typography>
              <TextField
                style={{ marginTop: 15 }}
                variant="outlined"
                label="Name"
                name="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                  style:{ color: "#FFFFFF"}
                }}
                InputLabelProps={{
                  style: { color: "#FFFFFF" },
                }}
              ></TextField>
              <TextField
                style={{ marginTop: 15 }}
                variant="outlined"
                label="Email"
                type="email"
                name="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailValid(e.target.value.includes("@"));
                }}
                fullWidth
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                  style:{ color: "#FFFFFF"}
                }}
                InputLabelProps={{
                  style: { color: "#FFFFFF" },
                }}
              ></TextField>

              <TextField
                style={{ marginTop: 15 }}
                variant="outlined"
                label="Subject"
                name="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                  style:{ color: "#FFFFFF"}
                }}
                InputLabelProps={{
                  style: { color: "#FFFFFF" },
                }}
              ></TextField>

              <TextField
                style={{ marginTop: 15 }}
                variant="outlined"
                label="Message"
                fullWidth
                name="Message"
                value={message}
                cols={40}
                rows={5}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                  style:{ color: "#FFFFFF"}
                }}
                InputLabelProps={{
                  style: { color: "#FFFFFF" },
                }}
              ></TextField>
              <div style={{ display: "block", width: "100%", marginTop: 15 }}>
                <div>
                  <TextField
                    className="EmiInputs"
                    style={{ marginTop: 15 }}
                    variant="outlined"
                    label="Phone Number"
                    name="Phone"
                    disabled={isOtpVerified}
                    type="number"
                    min="1000000"
                    max="9999999999999999"
                    value={mobile}
                    onChange={(e) => {
                      if (enableOtpField) {
                        setEnableOtpField(false);
                      }
                      if (e.target.value.length <= 10)
                        setMobile(e.target.value);
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                      style:{ color: "#FFFFFF"}
                    }}
                    InputLabelProps={{
                      style: { color: "#FFFFFF" },
                    }}
                    fullWidth
                  ></TextField>
                  {mobile.length === 10 &&
                    name.length > 0 &&
                    emailValid &&
                    !enableOtpField && (
                      <div>
                        <Button
                          style={{ width: "20%" }}
                          onClick={otpHandler}
                          variant="contained"
                          style={{
                            background: "green",
                            height: " 30px",
                            top: " 10px",
                            left: "5px",
                            color: "#fff",
                          }}
                        >
                          Verify
                        </Button>
                      </div>
                    )}
                </div>

                {enableOtpField && name.length > 0 && emailValid && (
                  <div>
                    <TextField
                      className="EmiInputs"
                      placeholder="Otp"
                      fullWidth
                      style={{ marginTop: 15 }}
                      value={otp}
                      disabled={isOtpVerified}
                      onChange={inputChange}
                      name="otp"
                      type="number"
                      variant="outlined"
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                        },
                        style: { color: "#FFFFFF" },
                      }}
                      InputLabelProps={{
                        style: { color: "#FFFFFF" },
                      }}
                    />
                    {!isOtpVerified && (
                      <Button
                        onClick={otpHandler}
                        variant="contained"
                        style={{
                          background: "green",
                          height: " 30px",
                          top: " 10px",
                          left: "5px",
                          color: "#fff",
                          marginTop: 15 
                        }}
                      
                    >
                        Resend OTP
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <Button
                className={`${classes.btn1} send-btn`}
                style={{ marginTop: 15 }}
                disabled={!isOtpVerified || name.length === 0 || !emailValid}
                variant="contained"
                onClick={(e) => handleData(e)}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default withRouter(ContactUsPage);
