import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  Container,
  FormHelperText,
  Button,
  Box,
} from "@material-ui/core";
import "./online-form.css";
import FormControl from "@material-ui/core/FormControl";
// import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import SectionHeader from "../section-header";
import SectionTabs from "../section-tabs";
import APP_CONSTANTS from "../../constants/app-constants";

import { useDispatch } from "react-redux";
import * as Snackbar from "../../redux/actions/SnackbarActions";
import ApiClient from "../../api-client";
import EditIcon from "@material-ui/icons//Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#fff !important",
  },
}));

export default function OnlineBooking(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialState = {
    acknowledge: "",
    name: "",
    email: "",
    mobile: "",
    pan: "",
    country: "",
    states: "",
    city: "",
    pin: "",
    bankingAmount: "",
    propertyId: "",
    flatNumber: "",
  }
  const [propertyOptions, setproprttyOption] = useState([]);

  const [enableOtpField, setEnableOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifyLoader, setVerifyLoader] = useState(true);
  const [otp, setOtp] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [state, setState] = useState(initialState);

  const [mobile, setMobile] = useState(
    JSON.parse(localStorage.getItem("user"))?.mobile
  );
  useEffect(() => {
    let userDetails = JSON.parse(window.localStorage.getItem("user"));

    if (!localStorage.getItem("user")) {
      window.location.href = "/signin";
    }
  }, [])
  const otpHandler = async () => {
    try {
      setVerifyLoader(true);
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
  const reset = () => {
    setVerifyLoader(false);
    setIsOtpVerified(false);
    setEnableOtpField(false);
    setState(initialState);
    setOtp("");
  };

  const optionHandler = async (e) => {
    let { name, value } = e.target;
    try {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/property/getPropertyByType",
        { type: value },
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      //   dispatch(Snackbar.showSuccessSnackbar("Otp sent successfully"));
      setproprttyOption(response?.data);
    } catch (error) {
      console.error("this is the error::", error);
      dispatch(
        Snackbar.showFailSnackbar(
          "We are facing some issue Please try again later."
        )
      );
    }
  };
  const getProjectName = () => {
    const project = propertyOptions.find((p) => p._id === state.propertyId);
    if (project) return project.nameOfProject;
    return "";
  };
  const inputChange = (e) => {
    debugger
    let { name, value } = e.target;
    if (e.target.name === "acknowledge") {
      value = !!!state.acknowledge
    }
    setOtp(value);
    if (name === "otp" && value.length === 6 && !isOtpVerified) {
      checkOtpValidOrNot(value);
    }
    setState({ ...state, [name]: value });
  };

  const handleData = async () => {
    let userDetails = JSON.parse(window.localStorage.getItem("user"));

    if (!localStorage.getItem("user")) {
      window.location.href = "/signin";
    }

    try {
      setVerifyLoader(true);
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/booking/createBooking",
        {
          userId: userDetails?._id,
          propertyId: state.propertyId,
          name: state.name,
          email: state.email,
          mobile: mobile,
          country: state.country,
          city: state.city,
          state: state.states,
          panCard: state.pan,
          pinCode: state.pin,
          flatNumber: state.flatNumber,
          bookingAmount: state.bankingAmount,
          tandc: true,
        },
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        true
      );
      setVerifyLoader(false);
      dispatch(Snackbar.showSuccessSnackbar(response.message));
      reset()
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

  useEffect(() => {
    let userDetails = localStorage.getItem("user");
    console.log("userData", userDetails);
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      setState({
        ...state,
        email: userDetails.email,
        name: userDetails.firstName + " " + userDetails.lastName,
      });
      console.log("form state", state);
    }
  }, []);
  console.log("state", state)
  console.log("emailValid", emailValid)
  return (
    <div class="client-bgform">
      <div className={classes.root}>
        <Container>
          <SectionHeader
            title={APP_CONSTANTS.online_form_title}
            subtitle={APP_CONSTANTS.online_form_subtitles}
            style={{ marginTop: "30px" }}
          />
          {/* <SectionTabs tabItems={propertieslist} /> */}
          {/* <Box className="FormHeader">
                            <span className="FormHeaderSpan">
                                THE BEST PLACE TO FIND THE HOUSE YOU WANT
                            </span>
                            <h1 className="FormHeaderH1">ONLINE BOOKING</h1>
                        </Box> */}
          <Box className="WholeCont">
            <Grid container spacing={3} className="onlineFormControl">
              <Grid item xs={3}>
                <FormControl className={`${classes.margin} FormControl`} >
                  <NativeSelect
                    className="SelectBox"
                    id="demo-customized-select-native"
                    onChange={optionHandler}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                      style: { color: "#FFFFFF", border: "1px solid #fff" },
                    }}
                    InputLabelProps={{
                      style: { color: "#FFFFFF" },
                    }}

                  // input={<BootstrapInput />}
                  >
                    <option value="">Select Property Type</option>
                    <option value="RESIDENTIAL">Residential</option>
                    <option value="COMMERCIAL">Commercial</option>
                  </NativeSelect>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl className={`${classes.margin} FormControl`}>
                  <NativeSelect
                    className="SelectBox"
                    id="demo-customized-select-native"
                    value={state.propertyId}
                    name="propertyId"
                    onChange={inputChange}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                      style: { color: "#FFFFFF", border: "1px solid #fff" },
                    }}
                    InputLabelProps={{
                      style: { color: "#FFFFFF" },
                    }}
                  >
                    <option value={10}>Select Property Name</option>
                    {propertyOptions?.map((role, index) => (
                      <option value={role?._id}>{role?.nameOfProject}</option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Grid>

              <Grid item xs={3} className="TextfildGrid">
                <form
                  className={`${classes.root} OutForm`}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    className="InnerForm"
                    label="Enter Your Name"
                    variant="outlined"
                    value={state.name}
                    name="name"
                    onChange={inputChange}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                      style: { color: "#FFFFFF", border: "1px solid #fff" },
                    }}
                    InputLabelProps={{
                      style: { color: "#FFFFFF" },
                    }}
                  />
                </form>
              </Grid>
              <Grid item xs={3} className="TextfildGrid">
                <form
                  className={`${classes.root} OutForm`}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    className="InnerForm"
                    label="Enter Your Email"
                    variant="outlined"
                    value={state.email}
                    name="email"
                    onChange={(e) => {
                      setEmailValid(e.target.value.includes("@"));
                      inputChange(e);
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                      style: { color: "#FFFFFF", border: "1px solid #fff" },
                    }}
                    InputLabelProps={{
                      style: { color: "#FFFFFF" },
                    }}
                  />
                </form>
              </Grid>
              <Grid item xs={3} className="TextfildGrid">
                <form
                  className={`${classes.root} OutForm`}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id=""
                    className="InnerForm"
                    label="Pan Number"
                    variant="outlined"
                    value={state.pan}
                    name="pan"
                    onChange={inputChange}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                      style: { color: "#FFFFFF", border: "1px solid #fff" },
                    }}
                    InputLabelProps={{
                      style: { color: "#FFFFFF" },
                    }}
                  />
                </form>
              </Grid>
              <Grid item xs={3} className="TextfildGrid">
                <form
                  className={`${classes.root} OutForm`}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id=""
                    className="InnerForm"
                    label="Country Name"
                    variant="outlined"
                    value={state.country}
                    name="country"
                    onChange={inputChange}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                      style: { color: "#FFFFFF", border: "1px solid #fff" },
                    }}
                    InputLabelProps={{
                      style: { color: "#FFFFFF" },
                    }}
                  />
                </form>
              </Grid>

              <Grid item xs={3} className="TextfildGrid">
                <form
                  className={`${classes.root} OutForm`}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id=""
                    className="InnerForm"
                    label="State"
                    variant="outlined"
                    value={state.states}
                    name="states"
                    onChange={inputChange}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                      style: { color: "#FFFFFF", border: "1px solid #fff" },
                    }}
                    InputLabelProps={{
                      style: { color: "#FFFFFF" },
                    }}
                  />
                </form>
              </Grid>

              <Grid item xs={3} className="TextfildGrid">
                <form
                  className={`${classes.root} OutForm`}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id=""
                    className="InnerForm"
                    label="City"
                    variant="outlined"
                    value={state.city}
                    name="city"
                    onChange={inputChange}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                      style: { color: "#FFFFFF", border: "1px solid #fff" },
                    }}
                    InputLabelProps={{
                      style: { color: "#FFFFFF" },
                    }}
                  />
                </form>
              </Grid>
              <Grid item xs={3} className="TextfildGrid">
                <form
                  className={`${classes.root} OutForm`}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id=""
                    className="InnerForm"
                    label="Pin Code"
                    variant="outlined"
                    value={state.pin}
                    type="number"
                    name="pin"
                    onChange={inputChange}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                      style: { color: "#FFFFFF", border: "1px solid #fff" },
                    }}
                    InputLabelProps={{
                      style: { color: "#FFFFFF" },
                    }}
                  />
                </form>
              </Grid>
              <Grid item xs={3} className="TextfildGrid">
                <form
                  className={`${classes.root} OutForm`}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id=""
                    className="InnerForm"
                    label="Booking Amount"
                    variant="outlined"
                    value={state.bankingAmount}
                    name="bankingAmount"
                    type="number"
                    onChange={inputChange}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                      style: { color: "#FFFFFF", border: "1px solid #fff" },
                    }}
                    InputLabelProps={{
                      style: { color: "#FFFFFF" },
                    }}
                  />
                </form>
              </Grid>
              <Grid item xs={3} className="TextfildGrid">
                <form
                  className={`${classes.root} OutForm`}
                  noValidate
                  autoComplete="off"
                >
                  <div style={{ display: "block", width: "100%" }}>
                    <div style={{ display: "flex", width: "90%" }}>
                      <TextField
                        className="InnerForm"
                        label="Phone Number"
                        name="mobile"
                        disabled={isOtpVerified}
                        type="number"
                        min="1000000"
                        variant="outlined"
                        max="9999999999999999"
                        value={state.mobile}
                        onChange={(e) => {
                          debugger
                          if (enableOtpField) {
                            setEnableOtpField(false);
                          }
                          if (e.target.value.length <= 10)
                            inputChange(e);
                        }}
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutline,
                          },
                          style: { color: "#FFFFFF", border: "1px solid #fff" },
                        }}
                        InputLabelProps={{
                          style: { color: "#FFFFFF" },
                        }}
                        fullWidth
                      ></TextField>
                      {!enableOtpField &&
                        state.email.length > 0 &&
                        state.email.includes("@") &&
                        state.name.length > 0 &&
                        // state.flatNumber.length > 0 &&
                        state.pan.length > 0 &&
                        state.mobile.length === 10 &&
                        state.city.length > 0 &&
                        state.states.length > 0 &&
                        state.pin.length > 0 &&
                        state.bankingAmount.length > 0 &&
                        propertyOptions.length > 0 &&
                        state.country.length > 0 &&
                        state.propertyId.length > 0 && (
                          <Button
                            onClick={otpHandler}
                            variant="contained"
                            style={{
                              width: "20%",
                              background: "green",
                              height: " 30px",
                              top: " 10px",
                              left: "5px",
                              color: "#fff",
                            }}
                          >
                            Verify
                          </Button>
                        )}
                    </div>
                  </div>
                </form>
              </Grid>

              <Grid item xs={3} className="TextfildGrid">
                {enableOtpField &&
                  state.email.length > 0 &&
                  state.email.includes("@") &&
                  state.name.length > 0 &&
                  state.pan.length > 0 &&
                  state.mobile.length === 10 &&
                  state.city.length > 0 &&
                  state.states.length > 0 &&
                  // state.flatNumber.length > 0 &&
                  state.pin.length > 0 &&
                  state.bankingAmount.length > 0 &&
                  propertyOptions.length > 0 &&
                  state.country.length > 0 &&
                  state.propertyId.length > 0 && (
                    <>
                      <TextField
                        className="InnerForm"
                        placeholder="Otp"
                        style={{
                          width: "100%",
                        }}
                        variant="outlined"
                        fullWidth
                        value={state.otp}
                        disabled={isOtpVerified}
                        onChange={inputChange}
                        name="otp"
                        type="number"
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutline,
                          },
                          style: {
                            color: "#FFFFFF",
                            border: "1px solid #fff",
                          },
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
                            width: "23%",
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
              </Grid>
            </Grid>

            <div className="OutformP">
              <p className="formP">
                I {state.name} has paid Rs. {state.bankingAmount}
                (in numbers) as against my expression of interest for Flat No.{" "}
                <input
                  type="text"
                  onChange={inputChange}
                  name="flatNumber"
                  required
                />{" "}
                of Project {getProjectName()}.
              </p>
              <br />
              <input className="checkBox" onChange={inputChange} type="checkbox" name="acknowledge" required />{" "}
              <p className="formP">
                I acknowledge that I have read, understood, and agree to all the{" "}
                <a href="#">Terms & Conditions</a> mentioned herewith.terms &
                conditions.
              </p>
              <Box className="ParentBookButton">
                <Button
                  className="BookButton"
                  disabled={!isOtpVerified ||
                    state.email.length === 0 ||
                    !state.email.includes("@") ||
                    state.name.length === 0 ||
                    state.pan.length === 0 ||
                    state.flatNumber.length === 0 ||
                    state.mobile.length !== 10 ||
                    state.city.length === 0 ||
                    state.states.length === 0 ||
                    state.pin.length === 0 ||
                    state.bankingAmount.length === 0 ||
                    propertyOptions.length === 0 ||
                    state.country.length === 0 ||
                    state.propertyId.length === 0 ||
                    state.acknowledge !== true

                  }
                  onClick={(e) => handleData(e)}
                >
                  Book Now
                </Button>
              </Box>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  );
}
