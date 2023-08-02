import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
  TextField,
  Button,
} from "@material-ui/core";
import PageBanner from "../../../components/page-banner";
import "../my-account.css";
import ApiClient from "../../../api-client/index";
import { useDispatch } from "react-redux";
import * as Snackbar from "../../../redux/actions/SnackbarActions";
import EditIcon from "@material-ui/icons//Edit";

const useStyles = makeStyles((theme) => ({}));

const MyProfile = (props) => {
  const [name, setName] = useState("user");
  const [email, setEmail] = useState("-");
  const [mobile, setMobile] = useState("-");
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setName(user.firstName + " " + user.lastName);
    setEmail(user.email);
    setMobile(user.countryCode + "-" + user.mobile);
    console.log("user.", user);
  }, []);

  console.log("user.", name, email, mobile);

  const classes = useStyles();
  return (
    <div>
      <PageBanner
        bgImage={"/about_us.jpeg"}
        title="My Profile"
        currentPage="My Profile"
      />

      <Container>
        <Box className="content-wrapper">
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} className="sidebar-section">
              <Box className="box-item">
                <Box className="box-wrap box-border-bottom box-radius">
                  <Box className="user-intro box-body">
                    {/* <Box className="user-icon">
                      {" "}
                      <img src="images/profile-img.jpg" alt="" />{" "}
                    </Box> */}
                    <Box className="user-info">
                      <h4> {name}</h4>
                      {/* <p>Permium</p> */}
                    </Box>
                  </Box>
                  <Box className="box-body p-0">
                    <ul className="sidebar-account-menu">
                      <li>
                        <a href="/my-account">
                          {" "}
                          <i className="fas fa-house-user"></i>My Account{" "}
                        </a>{" "}
                      </li>
                      <li className="active">
                        {" "}
                        <a href="/my-profile">
                          {" "}
                          <i className="far fa-user"></i>My Profile{" "}
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        <a href="/my-property">
                          {" "}
                          <i className="fas fa-building"></i>My Property{" "}
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        <a href="/my-booking">
                          {" "}
                          <i className="far fa-list-alt"></i>My Booking{" "}
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        <a href="my-favorite">
                          {" "}
                          <i className="far fa-heart"></i>My Favorite{" "}
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        <a className="logout" href="#">
                          <i className="fas fa-sign-out-alt"></i>Log out
                        </a>{" "}
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Box>
            </Grid>
            {/* <!-- sidebar-section --> */}
            <Grid item xs={12} md={9} className="content-area">
              <Box className="content-section">
                <Box className="box-item">
                  <Box className="box-wrap box-border-bottom box-radius">
                    <Box className="box-header">
                      <h5 className="box-title">Profile Information</h5>
                    </Box>
                    <Box className="box-body">
                      <Grid container spacing={3}>
                        {/* <Grid item xs={12} md={12}>
                          <Box className="myaccount-profileimg">
                            <img src="../images/profile-img.jpg" alt="" />
                            <Box className="myaccount-profileimg-edit">
                              <Button variant="contained" component="label">
                                <i className="fas fa-pencil-alt"></i>
                                <input
                                  id="profileimg-upload"
                                  type="file"
                                  hidden
                                />
                              </Button>
                            </Box>
                          </Box>
                        </Grid> */}
                        <Grid item xs={12} md={12}>
                          <form action="" method="post" role="form">
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={4}>
                                <h4 className="font-weight-semibold">
                                  Personal Information
                                </h4>
                              </Grid>
                              <Grid item xs={12} md={8}>
                                <Box className="form-group">
                                  <TextField
                                    required
                                    className="form-control"
                                    id="name"
                                    label="Full Name"
                                    value={name}
                                    // defaultValue={name}
                                    variant="outlined"
                                  />
                                </Box>
                                <Box className="form-group">
                                  <TextField
                                    required
                                    className="form-control"
                                    id="email"
                                    label="Email"
                                    // defaultValue={email}
                                    value={email}
                                    variant="outlined"
                                  />
                                </Box>
                                <Box className="form-group">
                                  <div
                                    style={{
                                      display: "block",
                                      width: "100%",
                                      marginTop: 15,
                                    }}
                                  >
                                    <div
                                      style={{ display: "flex", width: "80%" }}
                                    >
                                      <TextField
                                        className="form-control"
                                        variant="outlined"
                                        label="Phone Number"
                                        name="Phone"
                                        style={{ width: "76%" }}
                                        disabled={isOtpVerified}
                                        // type="number"
                                        min="1000000"
                                        max="9999999999999999"
                                        value={mobile}
                                        onChange={(e) => {
                                          if (enableOtpField) {
                                            setEnableOtpField(false);
                                          }
                                          setMobile(e.target.value);
                                        }}
                                        InputProps={{
                                          classes: {
                                            notchedOutline:
                                              classes.notchedOutline,
                                          },
                                        }}
                                        InputLabelProps={
                                          {
                                            // style: {color: '#FFFFFF'}
                                          }
                                        }
                                        fullWidth
                                      ></TextField>
                                      {mobile.length === 10 &&
                                      !enableOtpField ? (
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
                                      ) : (
                                        isOtpVerified && (
                                          <div onClick={reset}>
                                            {" "}
                                            <EditIcon />{" "}
                                          </div>
                                        )
                                      )}
                                    </div>
                                    {enableOtpField && (
                                      <TextField
                                        className="EmiInputs"
                                        placeholder="Otp"
                                        style={{ width: "100%", marginTop: 15 }}
                                        fullWidth
                                        value={otp}
                                        disabled={isOtpVerified}
                                        onChange={inputChange}
                                        name="otp"
                                        type="number"
                                        variant="outlined"
                                        InputProps={{
                                          classes: {
                                            notchedOutline:
                                              classes.notchedOutline,
                                          },
                                        }}
                                        InputLabelProps={{
                                          style: { color: "#FFFFFF" },
                                        }}
                                      />
                                    )}
                                  </div>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={4}>
                                <h4 className="font-weight-semibold">
                                  Password
                                </h4>
                              </Grid>
                              <Grid item xs={12} md={8}>
                                <Box className="form-group">
                                  <TextField
                                    required
                                    className="form-control"
                                    id="new_password"
                                    label="New Password"
                                    defaultValue="New Password"
                                    variant="outlined"
                                  />
                                </Box>
                                <Box className="form-group">
                                  <TextField
                                    required
                                    className="form-control"
                                    id="confirm_new_password"
                                    label="Confirm New Password"
                                    defaultValue="Confirm New Password"
                                    variant="outlined"
                                  />
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={4}></Grid>
                              <Grid item xs={12} md={8}>
                                <Box className="form-group">
                                  <Button
                                    type="submit"
                                    className="btn btn-primary"
                                    variant="contained"
                                  >
                                    Submit
                                  </Button>
                                </Box>
                              </Grid>
                            </Grid>
                          </form>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            {/* <!--content-area--> */}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default MyProfile;
