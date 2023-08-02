import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import "./enquryForm.css";
import { Box, NativeSelect, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import {
  EnquirySuccess,
  EnquiryError,
} from "../../redux/actions/EnquiryAction";

import EditIcon from "@material-ui/icons//Edit";
import ApiClient from "../../api-client";
import * as Snackbar from "../../redux/actions/SnackbarActions";

const styles = (theme) => ({
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

const DialogTitle = withStyles(styles)((props) => {
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

// main function

function EnquryFormService(props) {
  const [open, setOpen] = useState(true);
  const { children, classes, onClose, ...other } = props;

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [type, setPropertyType] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pCity, setPCity] = useState("");
  const [pAddress, setPAddress] = useState("");
  const [pState, setPState] = useState("");
  const [pLocation, setPLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [floor, setFoor] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [address, setAddress] = useState("");

  const [isServicePage, setServicePage] = useState(true);
  const location = useLocation();

  const [enableOtpField, setEnableOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const handleData = (e) => {
    handleServiceFormSubmit();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setName("");
    setMobile("");
    setEmail("");

    setOpen(false);
  };

  const params = useParams();

  const handleServiceFormSubmit = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("address", address);
    formData.append("propertyType", type);
    formData.append("propertyAddress", pAddress);
    if(image)
      formData.append("image", image);
    formData.append("propertyCity", pCity);
    formData.append("propertyState", pState);
    formData.append("budget", budget);
    formData.append("totalArea", totalArea);
    formData.append("floor", floor);
    formData.append("message", message);
    formData.append("propertyLocation", pLocation);
    console.log("service enquiry form data ", formData);
    submitServiceEnquiry(formData);
  };

  const submitServiceEnquiry = async (payload) => {
    let response = null;
    try {
      response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/services/createServicesEnquiry",
        payload,
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      console.log("response submit service form", response);
      if (!response || response.error) {
        console.log("error submiting enquiry ", response.message);
        // show error
        dispatch(Snackbar.showFailSnackbar(response.message));
        return;
      }
      // toast.success('Service Enquiry Submitted successfully', {position: toast.POSITION.TOP_RIGHT, autoClose: 5000});
      clearFormData();
      dispatch(Snackbar.showSuccessSnackbar("Form submitted successfully"));
    } catch (e) {
      console.log("error::submitReview::", e.response);
      dispatch(Snackbar.showFailSnackbar(e.response.data.message));
    }
  };

  const clearFormData = () => {
    setName("");
    setEmail("");
    setMobile("");
    setCity("");
    setState("");
    setPropertyType("");
    setPCity("");
    setPState("");
    setFile("");
    setImage("");
    setFoor("");
    setAddress("");
    setPAddress("");
    setMessage("");
    setTotalArea("");
    setBudget("");
    setPLocation("");
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

  const constructFloorOptions = () => {
    const comp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((floorNo) => {
      // console.log("floor", floorNo);
      return <option value={`G+${floorNo}`}>{`G+${floorNo}`}</option>;
    });
    // console.log("comp", comp);
    comp.unshift(<option value={`Ground floor`}>{`Ground floor`}</option>);
    return comp;
  };

  return (
    <div className="EnquryForm2">
      <form id="ServicesEnquiryForm">
        <Box
          id="customized-dialog-title"
          //  onClose={handleClose}
        >
          ENQUIRY NOW
        </Box>
        <Box className={`emiForm`}>
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
            onChange={(e) => setPropertyType(e.target.value)}
            fullWidth
          >
            <option value={10}>Select Property Type</option>
            <option value={20}>Residential</option>
            <option value={30}>Commerical</option>
          </NativeSelect>
          <TextField
            className="EmiInputs"
            style={{ marginTop: 15 }}
            variant="outlined"
            label="Property Address"
            name="property-address"
            value={pAddress}
            onChange={(e) => setPAddress(e.target.value)}
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
            label="Your Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            label="City"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
            label="State"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
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
            label="property City"
            name="property-city"
            value={pCity}
            onChange={(e) => setPCity(e.target.value)}
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
            label="property State"
            name="property-state"
            value={pState}
            onChange={(e) => setPState(e.target.value)}
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
            label="Property location"
            name="property-location"
            value={pLocation}
            onChange={(e) => setPLocation(e.target.value)}
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
            label="Your Budget"
            type="number"
            name="your-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
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
            label="Total area"
            type="number"
            name="total-area"
            value={totalArea}
            onChange={(e) => setTotalArea(e.target.value)}
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
            value={floor}
            onChange={(e) => setFoor(e.target.value)}
            fullWidth
          >
            <option value={""}>Select Floor</option>
            {constructFloorOptions()}
          </NativeSelect>
          <TextField
            className="EmiInputs"
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={2}
            fullWidth
            defaultValue=""
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
          <TextField
            className="EmiInputs"
            style={{ marginTop: 15 }}
            variant="outlined"
            label="Upload file"
            type="file"
            name="floor"
            value={file}
            onChange={(e) => {
              setImage(e.target.files[0]);
              setFile(e.target.value);
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
          <TextField
            className="EmiInputs"
            style={{ marginTop: 15 }}
            variant="outlined"
            label="Phone Number"
            name="Phone"
            style={{ width: "50%" }}
            disabled={isOtpVerified}
            type="number"
            min="1000000"
            max="9999999999999999"
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
            fullWidth
          ></TextField>
          {
            mobile.length === 10 &&
              name.length > 0 &&
              emailValid &&
              email.length > 0 &&
              city.length > 0 &&
              state.length > 0 &&
              address.length > 0 &&
              type.length > 0 &&
              pAddress.length > 0 &&
              pCity.length > 0 &&
              pState.length > 0 &&
              budget.length > 0 &&
              totalArea.length > 0 &&
              floor.length > 0 &&
              message.length > 0 &&
              pLocation.length > 0 &&
              // time.length > 0 &&
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
          {enableOtpField &&
            email.length > 0 &&
            city.length > 0 &&
            state.length > 0 &&
            address.length > 0 &&
            type.length > 0 &&
            pAddress.length > 0 &&
            pCity.length > 0 &&
            pState.length > 0 &&
            budget.length > 0 &&
            totalArea.length > 0 &&
            floor.length > 0 &&
            message.length > 0 &&
            pLocation.length > 0 &&
            emailValid && (
              //  && time.length > 0
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

        <Box className="ParentButton">
          <Button
            disabled={
              !isOtpVerified ||
              name.length === 0 ||
              email.length === 0 ||
              mobile.length === 0 ||
              city.length === 0 ||
              state.length === 0 ||
              address.length === 0 ||
              type.length === 0 ||
              pAddress.length === 0 ||
              pCity.length === 0 ||
              pState.length === 0 ||
              budget.length === 0 ||
              totalArea.length === 0 ||
              floor.length === 0 ||
              message.length === 0 ||
              pLocation.length === 0 ||
              !emailValid
            }
            //  onClick={handleClose}
            onClick={(e) => handleData(e)}
          >
            Submit now
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default withStyles(styles)(EnquryFormService);
