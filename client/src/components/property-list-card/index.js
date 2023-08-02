// import { ThemeProvider } from '@material-ui/styles';
// import { createMuiTheme } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Grid,
  Typography,
  Box,
  makeStyles,
  Paper,
  Divider,
  Button,
  Card,
  Container,
  TextField,
  NativeSelect,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Rating from "@material-ui/lab/Rating";
import { Link as RouterLink } from "react-router-dom";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalHotelIcon from "@material-ui/icons/LocalHotel";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import BathtubIcon from "@material-ui/icons/Bathtub";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import StarIcon from "@material-ui/icons/Star";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

import { useDispatch, useSelector } from "react-redux";
import "../header/header.css";
import APP_CONSTANTS from "../../constants/app-constants";
import Dialog from "@material-ui/core/Dialog";
import "../enquryForm/enquryForm.css";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import * as SitevisitAction from "../../redux/actions/SitevisitAction";
import ApiClient from "../../api-client";
import "../../components/outer-carousel-slider/featured.css";

import * as Snackbar from "../../redux/actions/SnackbarActions";
// const baseTheme = createMuiTheme();
const useStyles = makeStyles((theme) => ({
  text1: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FF7601",
    fontSize: 14,
    marginTop: 10,
  },
  text2: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#333333",
    fontSize: 18,
    fontWeight: "bold",
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
    fontWeight: "bold",
  },
  text5: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FF7601",
    fontSize: 20,
    fontWeight: "bold",
  },
  features: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  icon: {
    color: "#FF7601",
    fontSize: 20,
    paddingRight: 10,
  },
  btn1: {
    borderRadius: 12,
    color: "#FFFFFF",
    textTransform: "none",
    fontFamily: '"Open Sans",sans-serif',
    backgroundColor: "#FF7601",
  },
  btn2: {
    borderRadius: 12,
    color: "#666666",
    textTransform: "none",
    fontFamily: '"Open Sans",sans-serif',
    backgroundColor: "#ECECEC",
  },
}));

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
    background: "#ECECEC",
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

const PropertyListCard = (props) => {
  // const largeScreen = useMediaQuery(theme => theme.breakpoints.up('sm'));

  const { item } = props;
  // console.log("item", item);
  // console.log("item?.favorite", item.favorite);
  const classes = useStyles();
  const [timeAgo, setTimeAgo] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [enableOtpField, setEnableOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [emailValid, setEmailValid] = useState("");
  const [otp, setOtp] = useState("");

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  function handleNull(val) {
    return val || "_ _ ";
  }
  // item.isFavorite=true
  console.log("item",item)
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
  const inputChange = (e) => {
    let { name, value } = e.target;
    setOtp(value);
    if (name === "otp" && value.length === 6 && !isOtpVerified) {
      checkOtpValidOrNot(value);
    }
  };
  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
  useEffect(() => {
    let dt = new Date(item.created);
    const years = new Date(new Date() - new Date(dt)).getFullYear() - 1970;
    if (years > 1) {
      setTimeAgo(`${years} years ago`);
      return;
    } else if (years === 1) {
      setTimeAgo(`${years} year ago`);
      return;
    }
    const months = monthDiff(dt, new Date());
    if (months > 1) {
      setTimeAgo(`${months} months ago`);
      return;
    }
    if (months === 1) {
      setTimeAgo(`${months} month ago`);
      return;
    }
    const days = Math.round((new Date() - dt) / (1000 * 60 * 60 * 24));
    if (days === 1) {
      setTimeAgo(`${days} day ago`);
      return;
    } else {
      setTimeAgo(`${days} days ago`);
    }
  }, [item]);
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
    setOpen(false);
  };
  const contentClickHandler = (item) => {
    history.push({
      pathname: "/home-detail",
      state: item?._id,
    });
  };
  const handleClickOpen = (e) => {
    setOpen(true);
  };
  const handleClose = () => {
    setName("");
    setMobile("");
    setEmail("");
    setTime("");

    setOpen(false);
  };

  const handleFavourite = async (itemId, e) => {
    e.stopPropagation();
    console.log(e);
    let userDetails = localStorage.getItem("user");
    if (!userDetails) {
      window.location.href = "/signin";
    }
    const endPoint = item.isFavorite ? "removeFromWishList" : "addToWishList";
    try {
      userDetails=JSON.parse(userDetails)
      const body = {
        userId: userDetails._id,
        propertyId: itemId,
      };
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        `/users/${endPoint}`,
        body,
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );

      dispatch(Snackbar.showSuccessSnackbar(response.message));
      props.onChange()
    } catch (error) {
      console.error("this is the error::", error);
      dispatch(
        Snackbar.showFailSnackbar(
          "We are facing some issue Please try again later."
        )
      );
    }
  };

  const mainImage = item?.images[0]?.mainImage[0]?.path
    ? ApiClient.SERVER_ADDRESS + "/" + item?.images[0]?.mainImage[0]?.path
    : "/no-image-available-icon-6.png";
  // console.log("mainImage", mainImage, item?.images[0]);
  const address = item?.features[0]?.address || {};
  const propertTag = item?.propertTag;
  return (
    // <ThemeProvider theme={baseTheme}>
    <div>
      <Paper style={{ borderRadius: 0, padding: 0, marginTop: 30 }}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            md={4}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <div
              onClick={contentClickHandler.bind(null, item)}
              style={{ position: "relative", cursor: "pointer" }}
            >
              {propertTag ? <span class="featured">{propertTag}</span> : null}
              <img
                className="image"
                src={mainImage}
                style={{
                  width: "100%",
                  height: 300,
                  objectFit: "cover",
                  backgroundColor: "red",
                }}
                alt=""
              />
            </div>
            {/* <span className="featured">FEATURED</span> */}
          </Grid>
          <Grid item xs={12} md={8} style={{ padding: 30 }}>
            <Grid container contaienr spacing={1}>
              <Grid
                item
                xs={12}
                md={8}
                onClick={contentClickHandler.bind(null, item)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  cursor: "pointer",
                }}
              >
                <Typography className={classes.text2}>
                  {item?.nameOfProject}
                </Typography>
                <Grid>
                  <Grid
                    item
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      marginTop: 10,
                    }}
                  >
                    <LocationOnIcon
                      style={{
                        color: "#FF7601",
                        fontSize: 20,
                        padding: 0,
                        marginRight: 8,
                      }}
                    />
                    <Typography className={classes.text3}>
                      {handleNull(address.latitude)},{" "}
                      {handleNull(address.longitude)}{" "}
                      {handleNull(address.address)} {handleNull(address.city)}{" "}
                      {handleNull(address.State)} {handleNull(address.pinCode)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} md={6} className={classes.features}>
                    <ZoomOutMapIcon className={classes.icon} />
                    <Typography className={classes.text4}>
                      {handleNull(item?.features[0]?.builtUpArea)} Sq-Ft
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} className={classes.features}>
                    <LocalHotelIcon className={classes.icon} />
                    <Typography className={classes.text4}>
                      {handleNull(item?.features[0]?.bedrooms)} Bedrooms
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} className={classes.features}>
                    <DriveEtaIcon className={classes.icon} />
                    <Typography className={classes.text4}>
                      {handleNull(item?.features[0]?.totalFloors)} TotalFloors
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} className={classes.features}>
                    <BathtubIcon className={classes.icon} />
                    <Typography className={classes.text4}>
                      {handleNull(item?.features[0]?.bathrooms)} Bathroom
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                onClick={contentClickHandler.bind(null, item)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <Grid contaienr>
                  <Grid
                    item
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      class="fs-2 mb-3"
                      onClick={(e) => handleFavourite(item?._id, e)}
                    >
                      {!item.isFavorite && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="44"
                          height="44"
                          fill="red"
                          class="bi bi-heart"
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "0",
                            cursor: "pointer",
                          }}
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                      )}
                      {item.isFavorite && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="44"
                          height="44"
                          fill="red"
                          class="bi bi-heart-fill"
                          viewBox="0 0 16 16"
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "0",
                            cursor: "pointer",
                          }}
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                          ></path>
                        </svg>
                      )}
                    </div>
                    <Grid
                      container
                      className="starts-from"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Typography className={classes.text3}>
                        Starts From
                      </Typography>
                      {/* <Typography
                      style={{
                        width: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        color: "#333333",
                      }}
                    >
                      /
                    </Typography> */}

                      <Typography className={classes.text5}>
                        Rs. {item.price[0].expectedPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12} md={8}>
                    <Grid container>
                      <Grid xs={12} md={6}>
                        <Grid contaienr>
                          <Grid
                            item
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            <EventAvailableIcon className={classes.icon} />
                            <Box style={{ width: 10 }}></Box>
                            <Typography className={classes.text3}>
                              {timeAgo}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid xs={12} md={6}>
                        <Grid contaienr>
                          <Grid
                            item
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Rating
                              name="review-rating"
                              // onChange={(event, newValue) =>
                              //   setRating(newValue)
                              // }
                              readOnly
                              style={{ marginBottom: 15 }}
                              precision={0.5}
                              value={item?.rating}
                            />

                            {/* <StarIcon className={classes.icon} />
                            <StarIcon className={classes.icon} />
                            <StarIcon className={classes.icon} />
                            <StarIcon className={classes.icon} />
                            <StarIcon className={classes.icon} /> */}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Grid contaienr>
                      <Grid
                        item
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          className={classes.btn1}
                          component={RouterLink}
                          to={{
                            pathname: "/home-detail",
                            state: item?._id,
                          }}
                        >
                          View Detail
                        </Button>
                        <Box style={{ width: 10 }}></Box>
                        <Button
                          variant="contained"
                          className={classes.btn2}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleClickOpen();
                          }}
                        >
                          Visit Site
                        </Button>

                        {/* <Button
                          variant="contained"
                          className={classes.btn2}
                          onClick={() => handleFavourite(item?._id)}
                        >
                          + Favourite
                        </Button> */}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="EnquryFormData"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {APP_CONSTANTS.titleSiteVisit}
        </DialogTitle>
        <Box className="emiForm">
          <TextField
            className="EmiInputs"
            style={{ marginTop: 15 }}
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
            style={{ marginTop: 15 }}
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
          <NativeSelect
            className="EmiInputs selectInput"
            onChange={(e) => setTime(e.target.value)}
            fullWidth
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
          <TextField
            className="EmiInputs"
            style={{ marginTop: 15 }}
            variant="outlined"
            label="Phone Number"
            name="Phone"
            max="9999999999"
            type="tel"
            value={mobile}
            onChange={(e) => {
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
            fullWidth
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
                style={{ width: "50%" }}
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
    </div>
    // </ThemeProvider>
  );
};

export default PropertyListCard;
