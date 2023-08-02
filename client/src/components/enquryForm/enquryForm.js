import React, { useState } from "react";
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
import * as EnquiryAction from "../../redux/actions/EnquiryAction";
import ApiClient from "../../api-client";
import * as Snackbar from "../../redux/actions/SnackbarActions";
import EditIcon from "@material-ui/icons//Edit";

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

function EnquryForm(props) {
  const [open, setOpen] = useState(false);
  const { children, classes, onClose, ...other } = props;

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  //const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [type, setPropertyType] = useState("");
  const [propertyname, setPropertyName] = useState("");
  const [enableOtpField, setEnableOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailValid, setEmailValid] = useState("");

  const dispatch = useDispatch();
  const handleData = (e) => {
    const formData = {
      name: name,
      email: email,
      phone: mobile,
      city: city,
      location: location,
      lookingFor: lookingFor,
      // type: type,
      // propertyname: propertyname,
    };
    console.log("formData", formData);
    dispatch(EnquiryAction.EnquiryRequestAsync(formData));
    // toast.success('Request Sent successfully', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
    setName("");
    setMobile("");
    setEmail("");
    setCity("");
    setLocation("");
    setLookingFor("");
    setPropertyType("");
    setPropertyName("");
    setOpen(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setName("");
    setMobile("");
    setEmail("");
    setCity("");
    setLocation("");
    setLookingFor("");
    setPropertyType("");
    setPropertyName("");
    setOpen(false);
  };

  return (
    <div className="EnquryForm">
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        className="enquryButton"
      >
        <i class="fas fa-comments"></i>
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="EnquryFormData"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          ENQUIRY NOW
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
          <TextField
            className="EmiInputs"
            style={{ marginTop: 15 }}
            variant="outlined"
            label="Enter City"
            name="City"
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
            label="Enter Location"
            name="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
          <NativeSelect
            className="EmiInputs selectInput"
            onChange={(e) => setLookingFor(e.target.value)}
          >
            <option value={10}>Looking For</option>
            <option value={20}>Villa</option>
            <option value={30}>Flats</option>
            <option value={30}>Plot</option>
            <option value={50}>Commerical Property</option>
          </NativeSelect>

          <TextField
            className="EmiInputs"
            variant="outlined"
            label="Phone Number"
            name="Phone"
            // style={{width: '76%'}}
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
          {/* {mobile.length === 10 && !enableOtpField ? <Button style={{ width: '23%' }} onClick={otpHandler} variant="contained" style={{ background: "green", height: " 30px", top: " 10px", left: "5px", color: '#fff' }}
          >Verify</Button> : isOtpVerified && <div onClick={reset}> <EditIcon /> </div>}
          {enableOtpField && <TextField
            className="EmiInputs"
            placeholder="Otp"
            style={{ width: '50%' }}

            fullWidth
            value={otp}
            disabled={isOtpVerified}
            onChange={inputChange}
            name="otp"
            type="number"
            variant="outlined"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline
              }
            }}
            InputLabelProps={{
              style: { color: '#FFFFFF' }
            }}
          />} */}
          {
            mobile.length === 10 &&
              name.length > 0 &&
              email.length > 0 &&
              type > 10 &&
              lookingFor > 10 &&
              location.trim().length > 0 &&
              city.trim().length > 0 &&
              emailValid &&
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
            name.length > 0 &&
            email.length > 0 &&
            type > 10 &&
            lookingFor > 10 &&
            location.trim().length > 0 &&
            city.trim().length > 0 &&
            emailValid && (
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
              //  onClick={handleClose}
              disabled={
                !isOtpVerified || name.length === 0 || !emailValid||
                email.length===0 ||
                type===10 ||
                lookingFor===10 ||
                location.trim().length===0 ||
                city.trim().length===0 ||
                !emailValid 
              }
              onClick={(e) => handleData(e)}
            >
              Send Enqury
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(EnquryForm);
