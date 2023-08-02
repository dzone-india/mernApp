import React, { useState, useEffect } from "react";
import "./header.css";
import {
  Grid,
  Container,
  Typography,
  Button,
  makeStyles,
  Box,
  TextField,
  NativeSelect,
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import APP_CONSTANTS from "../../constants/app-constants";
import MenuItemList from "../menu-item";
import menuItems from "../../utils/menu.json";
import { withRouter, Link as RouterLink } from "react-router-dom";
//import Logo from "../../images/logo.png";
import Logo from "../../images/vishal-logo.png";
import Mobilemenu from "./mobilemenu";
import ApiClient from "../../api-client";
import EditIcon from "@material-ui/icons//Edit";
import * as Snackbar from "../../redux/actions/SnackbarActions";

import Dialog from "@material-ui/core/Dialog";

import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import "../enquryForm/enquryForm.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import BookNowModal from "../book-now/book-now";

import { useDispatch } from "react-redux";
import * as SitevisitAction from "../../redux/actions/SitevisitAction";

import ReactDOM from "react-dom";
import $ from "jquery";

const stylessd = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#FFFFFF !important",
  },
});

const DialogTitle = withStyles(stylessd)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  contact: {
    padding: 0,
    color: "#FFFFFF",
    marginRight: 10,
    fontFamily: '"Open Sans",sans-serif',
  },
  icon: {
    padding: 0,
    color: "#FFFFFF",
    marginRight: 10,
  },
  menu: {
    padding: 0,
    color: "#000000",
    marginRight: 10,
    fontFamily: '"Open Sans",sans-serif',
    fontWeight: 400,
    cursor: "pointer",
  },
  btn1: {
    borderRadius: 15,
    color: "#FFFFFF",
    textTransform: "none",
    marginRight: 10,
    fontFamily: '"Open Sans",sans-serif',
  },
  btn2: {
    borderRadius: 15,
    background: "#FF7601",
    color: "#FFFFFF",
    textTransform: "none",
    fontFamily: "Open Sans,sans-serif",
  },
  btn3: {
    borderRadius: 15,
    marginRight: 10,
    color: "#000000",
    textTransform: "none",
    fontFamily: '"Open Sans",sans-serif',
  },
  btn4: {
    borderRadius: 15,
    color: "#000000",
    textTransform: "none",
    fontFamily: '"Open Sans",sans-serif',
  },
}));
const Header = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [time, setTime] = useState("");

  const [open, setOpen] = useState(false);
  const [userdata, setUserdata] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [bookNow, setBookNow] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState({});

  const [enableOtpField, setEnableOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [otp, setOtp] = useState("");

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
    if (name === "otp" && value.length === 6 && !isOtpVerified) {
      checkOtpValidOrNot(value);
    }
  };

  useEffect(() => {
    let userdata = localStorage.getItem("user");
    if (userdata) {
      setUserdata(true);
    } else {
      setUserdata(false);
    }
  }, []);

  useEffect(() => {
    const company_detials = localStorage.getItem("company_detials");
    if (!company_detials) populateOwnerDetails();
    else {
      setOwnerDetails(JSON.parse(company_detials));
    }
  }, []);

  const populateOwnerDetails = () => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/home/getFooterAddress",
        {},
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      setOwnerDetails(response.data);
      localStorage.setItem("company_detials", JSON.stringify(response.data));
    };
    getData();
  };

  const handleData = (e) => {
    const formData = {
      name: name,
      email: email,
      phone: mobile,
      time: time,
      // type: type,
      // propertyname: propertyname,
    };
    console.log("formData", formData);
    dispatch(SitevisitAction.SitevisitRequestAsync(formData));
    // toast.success('Request Sent successfully', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
    setName("");
    setMobile("");
    setEmail("");
    setTime("");
    setIsOtpVerified(false);
    setOtp("");
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setName("");
    setMobile("");
    setEmail("");
    setTime("");
    setOpen(false);
    setIsOtpVerified(false);
    setOtp("");
    setEnableOtpField(false);
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    setAnchorEl(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("bookNow");
      localStorage.removeItem("postProperty");
      window.location.href = "/";
    }
  };

  const handleClickUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const gotoProfileHandler = () => {
    setAnchorEl(null);
    // window.location.href = "/my-profile";
    props.history.push("/my-profile");
  };
  // Window Scroll Function Start
  $(window).scroll(function () {
    var sticky = $("#HeaderonScroll"),
      scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass("Headerfixed");
    else sticky.removeClass("Headerfixed");
  });
  // Window Scroll Function End

  const handleNull = (val) => {
    return val || "-";
  };

  return (
    <>
      <Grid container className="MainMenu forMobilehide">
        <Grid item xs={12} md={12} className="bg-green">
          <Container className="auto-container">
            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 8,
                paddingBottom: 8,
              }}
            >
              <Grid
                item
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PhoneIcon className={classes.icon} />
                <Typography className={classes.contact}>
                  {/* {APP_CONSTANTS.phoneNumber} */}
                  {handleNull(ownerDetails?.mobile)}
                </Typography>
                <MailOutlineIcon className={classes.icon} />
                <Typography className={classes.contact}>
                  {/* {APP_CONSTANTS.email} */}
                  {handleNull(ownerDetails?.email)}
                </Typography>
              </Grid>
              <Grid
                item
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  className={`${classes.btn1} btn-book-online`}
                  component={RouterLink}
                  to="/book-online"
                >
                  {APP_CONSTANTS.btnBookOnlineText}
                </Button>

                <Button
                  variant="contained"
                  className={classes.btn2}
                  component={RouterLink}
                  // to="/post-property"
                  onClick={() => {
                    if (!localStorage.getItem("user")) {
                      localStorage.setItem("postProperty", true);
                      return props.history.push("/signin");
                    } else {
                      return props.history.push("/post-property");
                    }
                  }}
                >
                  Post Property
                </Button>

                {userdata ? (
                  <>
                    <Button
                      className={classes.btn3}
                      onClick={handleClickUserMenu}
                    >
                      <PermIdentityIcon />
                    </Button>

                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={gotoProfileHandler}>Profile</MenuItem>
                      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={12} md={12} className="bg-white">
          <Container className="auto-container">
            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 8,
                paddingBottom: 8,
              }}
            >
              <Box className="logoImage">
                <div className="logo">
                  <a href="/">
                    {" "}
                    <img src={Logo} />{" "}
                  </a>
                </div>
              </Box>
              <Grid
                item
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="primary-menu"
              >
                {menuItems.map((menu) => {
                  return <MenuItemList menu={menu} />;
                })}
              </Grid>
              <Grid
                item
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  className={classes.btn3}
                  onClick={handleClickOpen}
                >
                  {APP_CONSTANTS.btnRegisterASiteVisit}
                </Button>
                {userdata ? (
                  ""
                ) : (
                  <Button
                    variant="outlined"
                    className={classes.btn4}
                    component={RouterLink}
                    to="/signin"
                  >
                    Login / Signup
                  </Button>
                )}
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      {/* Mobile Menu Start */}
      <Grid container className="desktopViewforNone" id="HeaderonScroll">
        <Mobilemenu />
      </Grid>
      {/* Mobile Menu End */}
      {/* </Grid>
          </Grid>
        </Container>
      </Grid> */}

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="EnquryFormData"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {APP_CONSTANTS.titleSiteVisit}
        </DialogTitle>
        <Box className={`emiForm`}>
          <TextField
            className="EmiInputs"
            style={{ marginTop: 15, color: "#FFFFFF" }}
            variant="outlined"
            label="Your Name"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
              style: { color: "#FFFFFF" },
            }}
            InputLabelProps={{
              style: { color: "#FFFFFF" },
            }}
            fullWidth
          ></TextField>
          <TextField
            className="EmiInputs"
            style={{ marginTop: 15, color: "#FFFFFF" }}
            variant="outlined"
            label="Email Address"
            type="email"
            name="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailValid(e.target.value.includes("@"));
            }}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
              style: { color: "#FFFFFF" },
            }}
            InputLabelProps={{
              style: { color: "#FFFFFF" },
            }}
            fullWidth
          ></TextField>
          {/* <div
            style={{
              // display: "flex",
              // flexWrap: "wrap",              
              // justifyContent: "center",
              width:"100%"
            }}
          > */}
          <NativeSelect
            className="EmiInputs selectInput"
            style={{ width: "48%", boxSizing: "border-box" }}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Choose Time</option>
            <option value="8:00 AM">8:00 AM</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 AM">12:00 AM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
            <option value="6:00 PM">6:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
          </NativeSelect>
          {/* </div> */}
          <TextField
            className="EmiInputs"
            style={{ marginTop: 15, width: "48%", color: "#FFFFFF" }}
            variant="outlined"
            label="Phone Number"
            name="Phone"
            disabled={isOtpVerified}
            type="number"
            min="1000000"
            max="9999999999"
            value={mobile}
            onChange={(e) => {
              if (enableOtpField) {
                setEnableOtpField(false);
              }
              if (e.target.value.length <= 10) setMobile(e.target.value);
            }}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
              style: { color: "#FFFFFF" },
            }}
            InputLabelProps={{
              style: { color: "#FFFFFF" },
            }}
            // fullWidth
          ></TextField>
          {
            mobile.length === 10 &&
              name.length > 0 &&
              emailValid &&
              time.length > 0 &&
              !enableOtpField && (
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
                  }}
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
          {enableOtpField && name.length > 0 && emailValid && time.length > 0 && (
            <>
              <TextField
                className="EmiInputs"
                placeholder="Otp"
                style={{ width: "50%", color: "#FFFFFF" }}
                fullWidth
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
                  style={{ width: "23%" }}
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
                  Resend OTP
                </Button>
              )}
            </>
          )}
        </Box>
        <DialogActions>
          <Box className="ParentButton">
            <Button
              disabled={
                !isOtpVerified ||
                name.length === 0 ||
                !emailValid ||
                time.length === 0
              }
              onClick={(e) => handleData(e)}
            >
              Submit
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withRouter(Header);
