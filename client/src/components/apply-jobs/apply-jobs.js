import React, {useEffect, useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import "./apply-jobs.css";
import {Box, Grid, NativeSelect, TextField} from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ApiClient from "../../api-client";
import {useDispatch} from "react-redux";
import * as Snackbar from "../../redux/actions/SnackbarActions";
import EditIcon from '@material-ui/icons//Edit';
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
    borderColor: "#000 !important",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
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

function ApplyJobs(props) {
  const [open, setOpen] = React.useState(false);
  const {children, classes, onClose, ...other} = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState("");
  const [enableOtpField, setEnableOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [otp, setOtp] = useState("");

  const otpHandler = async () => {
    try {
      setVerifyLoader(true);
      const response = await ApiClient.call(ApiClient.REQUEST_METHOD.POST, '/otp/createOTP', {mobile: mobile}, {}, {Cookie: ApiClient.cookie, Authorization: ApiClient.authorization}, false);
      setEnableOtpField(true);
      setVerifyLoader(false);
      dispatch(Snackbar.showSuccessSnackbar('Otp sent successfully'));
    } catch (error) {
      console.error('this is the error::', error);
      dispatch(Snackbar.showFailSnackbar('We are facing some issue Please try again later.'));
      setVerifyLoader(false);
    }

  };

  const checkOtpValidOrNot = async (value) => {
    try {
      const response = await ApiClient.call(ApiClient.REQUEST_METHOD.POST, '/otp/verifyOTP', {mobile: mobile, otp: value}, {}, {Cookie: ApiClient.cookie, Authorization: ApiClient.authorization}, false);
      if (response.status) {
        setIsOtpVerified(true);
        dispatch(Snackbar.showSuccessSnackbar('Otp Verified SuccessFully'));
      } else {
        setIsOtpVerified(false);
        dispatch(Snackbar.showFailSnackbar('Please type Valid otp.'));
      }
    } catch (error) {
      setIsOtpVerified(false);
      dispatch(Snackbar.showFailSnackbar('We are facing some issue Please try again later.'));
    }

  };
  const reset = () => {
    setVerifyLoader(false);
    setIsOtpVerified(false);
    setEnableOtpField(false);
    setMobile('');
    setOtp('');

  };

  const inputChange = (e) => {

    let {name, value} = e.target;
    setOtp(value);
    if (name === 'otp' && value.length == 6 && !isOtpVerified) {
      checkOtpValidOrNot(value);
    }
  };

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    setMobile('')
    setEmail('')
    
    
    setOpen(false);
  };

  const handleData = (e) => {
    var data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("mobile", mobile);
    data.append("email", email);
    data.append("qualification", qualification);
    data.append("message", message);
    data.append("resume", resume);
    data.append("careerID", props.careerId);

    const getData = async () => {
      try {
        const response = await ApiClient.call(
          ApiClient.REQUEST_METHOD.POST,
          "/career/applyForJob",
          data,
          null,
          null,
          true
        );

        setFirstName("");
        setLastName("");
        setMobile("");
        setEmail("");
        setQualification("");
        setMessage("");
        setResume("");
        setOpen(false);

        dispatch(Snackbar.showSuccessSnackbar(response.message));
      } catch (error) {
        dispatch(Snackbar.showFailSnackbar(error.response.data.message));
      }
    };
    getData();
  };

  const handleResumeFile = (event) => {
    setResume(event.target.files[0]);
  };
  return (
    <div className="JobForm">
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        className="ApplyJobbutton"
      >
        {props.buttonName}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="JobFormData"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.Jobsheading}
        </DialogTitle>
        <Box className="Inputin">
          <TextField
            className="jobInputs"
            style={{marginTop: 15}}
            variant="outlined"
            label="Your Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            InputLabelProps={{
              style: {color: "#000"},
            }}
            fullWidth
          ></TextField>
          <TextField
            className="jobInputs"
            style={{marginTop: 15}}
            variant="outlined"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            InputLabelProps={{
              style: {color: "#000"},
            }}
            fullWidth
          ></TextField>
          <TextField
            className="jobInputs"
            style={{marginTop: 15}}
            variant="outlined"
            label="Last Qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            InputLabelProps={{
              style: {color: "#000"},
            }}
            fullWidth
          ></TextField>

          <TextField
            className="jobInputs"
            style={{marginTop: 15}}
            variant="outlined"
            label="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            InputLabelProps={{
              style: {color: "#000"},
            }}
            fullWidth
          ></TextField>
          {/* <TextField
            className="jobInputs"
            style={{marginTop: 15}}
            variant="outlined"
            label="Contect Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            InputLabelProps={{
              style: {color: "#000"},
            }}
            fullWidth
          ></TextField> */}
          <div style={{display: 'block', width: '100%', marginTop: 15}}>
            <div style={{display: 'flex', width: "80%"}}>
              <TextField
                className="EmiInputs"
                style={{marginTop: 15}}
                variant="outlined"
                label="Phone Number"
                name="Phone"
                style={{width: '76%'}}
                disabled={isOtpVerified}
                type="number"
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
                    notchedOutline: classes.notchedOutline
                  }
                }}
                // InputLabelProps={{
                //   style: {color: '#FFFFFF'}
                // }}
                fullWidth >
              </TextField>
              {mobile.length === 10 && !enableOtpField ? <Button style={{width: '20%'}} onClick={otpHandler} variant="contained" style={{background: "green", height: " 30px", top: " 10px", left: "5px", color: '#fff'}}
              >Verify</Button> : isOtpVerified && <div onClick={reset}> <EditIcon /> </div>}
            </div>
            {enableOtpField && <TextField
              className="EmiInputs"
              placeholder="Otp"

              style={{width: '70%', marginTop: 15}}

              
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
                style: {color: '#FFFFFF'}
              }}
            />}
            
            {!isOtpVerified && enableOtpField && (
                    <Button
                      style={{ width: "23%" }}
                      onClick={otpHandler}
                      variant="contained"
                      style={{
                        background: "green",
                        height: "30px",
                        display: "inline-block",
                        marginTop: "27px",
                        marginLeft:"15px",
                        // top: " 10px",
                        // left: "5px",
                        color: "#fff",
                      }}
                    >
                      Resend OTP
                    </Button>
                  )}
          </div>
        </Box>

        <Grid item xs={12} lg={12} className="Inputin">
          <TextField
            type="file"
            variant="outlined"
            // label="Select File"
            onChange={handleResumeFile}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            InputLabelProps={{
              style: {color: "#000"},
            }}
            fullWidth
          ></TextField>
          <TextareaAutosize
            className="textArea"
            rows={6}
            aria-label="minimum height"
            minRows={6}
            placeholder="Enter Description"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Grid>
        <DialogActions>
          <Box className="JobButton">
            <Button 
            disabled={!isOtpVerified}
            onClick={(e) => handleData(e)}>Send</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(ApplyJobs);
