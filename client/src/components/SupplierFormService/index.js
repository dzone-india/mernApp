import React, { useState,useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import "./SupplierForm.css";
import { Box, NativeSelect, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as SupplierAction from "../../redux/actions/SupplierFormActions";
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

function SupplierForm(props) {
  const [open, setOpen] = useState(false);
  const { children, classes, onClose, ...other } = props;

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  //const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [positionJobRole, setPositionJobRole] = useState("");
  const [enableOtpField, setEnableOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [supplierOf, setSupplierOf] = useState("");
  const fileInputRef=useRef();
  const dispatch = useDispatch();
  const handleData = (e) => {
    debugger;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("supplierOf", supplierOf);
    formData.append("companyName", company);
    formData.append("message", message);
    formData.append("role", positionJobRole);
    formData.append("city", city);
    formData.append("location", location);
    for (const file of files) {
      formData.append("file", file);
    }

    dispatch(SupplierAction.SupplierRequestAsync(formData));

    // const formData = {
    //   name: name,
    //   email: email,
    //   mobile: mobile,
    //   supplierOf: supplierOf,
    //   companyName: company,
    //   message: message,
    //   role: positionJobRole,
    //   city: city,
    //   location: location,
    //   // type: type,
    //   // propertyname: propertyname,
    // };

    console.log("formData", formData);
    // dispatch(EnquiryAction.EnquiryRequestAsync(formData));
    // toast.success('Request Sent successfully', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
    setName("");
    setCompany("");
    setMobile("");
    setEmail("");
    setMessage("");
    setCity("");
    setLocation("");
    setPositionJobRole("");
    fileInputRef.current.value=[]
    setFiles([]);
    setSupplierOf("");
    setOtp("");
    setIsOtpVerified(false);
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
    setFiles([]);
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
    setCompany("");
    setEmail("");
    setMessage("");
    setCity("");
    setSupplierOf("");
    setPositionJobRole("");
    setLocation("");
    setPositionJobRole("");
    setFiles([]);
    setOpen(false);
  };
  debugger;
  return (
    <div className="SupplierForm" id="SupplierForm">
      <Box
        id="customized-dialog-title"
        //  onClose={handleClose}
      >
        SUPPLIER FORM
      </Box>
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
        />
        <TextField
          className="EmiInputs"
          style={{ marginTop: 15 }}
          variant="outlined"
          label="Company Name"
          name="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
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
          value={positionJobRole}
          onChange={(e) => setPositionJobRole(e.target.value)}
          fullWidth
        >
          <option value={""}>Select Position/Job Role</option>
          <option value={"Owner"}>Owner</option>
          <option value={"Manager"}>Manager</option>
          <option value={"Staff"}>Staff</option>
        </NativeSelect>
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
          value={supplierOf}
          onChange={(e) => setSupplierOf(e.target.value)}
          fullWidth
        >
          <option value={""}>Select Supplier of</option>
          <option value={"Marble"}>Marble</option>
          <option value={"Tiles"}>Tiles</option>
          <option value={"Bricks"}>Bricks</option>
          <option value={"Decorative Items"}>Decorative Items</option>
          <option value={"Sand"}>Sand</option>
          <option value={"cement"}>cement</option>
          <option value={"Electrical Items"}>Electrical Items</option>
          <option value={"Furniture"}>Furniture</option>
          <option value={"Furniture Hardware"}>Furniture Hardware</option>
          <option value={"Paint"}>Paint</option>
          <option value={"Security Services"}>Security Services</option>
          <option value={"Still Equipments"}>Still Equipments</option>
          <option value={"Sanitary Hardware"}>Sanitary Hardware</option>
          <option value={"Ro Services"}>Ro Services</option>
          <option value={"Electronic Item"}>Electronic Item</option>
          <option value={"Electrical services"}>Electrical services</option>
          <option value={"Safety Guards"}>Safety Guards</option>
          <option value={"Building Material"}>Building Material</option>
          <option value={"Glass House"}>Glass House</option>
          <option value={"Fabrication"}>Fabrication</option>
          <option value={"JVNL services"}>JVNL services</option>
          <option value={"JDA Work"}>JDA Work</option>
          <option value={"Solar Equipments"}>Solar Equipments</option>
          <option value={"Manpower Supplier"}>Manpower Supplier</option>
          <option value={"Construction Hardware"}>Construction Hardware</option>
        </NativeSelect>
        <br/>
        <TextField
          className="EmiInputs"
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          rows={3}
          fullWidth
          defaultValue=""
          variant="outlined"
          style={{
            width: "100%"}}
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
        <div
          style={{
            width: "100%",
            textAlign: "center",
            color: "#fff",
            border: "2px solid #fff",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-around",
            alignItems:"center",
            marginBottom: "30px",
          }}
        >
          <label htmlFor="file" style={{ color: "#FFF" }}>
            Price list/ Quotation:
          </label>

          <input
            className="EmiInputs"
            style={{
              marginTop: "30px",
              marginLeft: "30px",
              textAlign: "right",
              color: "#fff",
            }}
            // label="Price list/ Quotation"
            type="file"
            name="file"
            id="file"
            multiple            
            accept=".png,.jpeg,.pdf"
            ref={fileInputRef}
            onChange={(event) => {
              // setImage(e.target.files[0]);
              debugger;
              event.preventDefault();
              const filesUpl = [];
              if (event.target.files && event.target.files.length > 0) {
                for (const file of event.target.files) {
                  filesUpl.push(file);
                }
                setFiles(filesUpl);
              }
            }}
          />
        </div>
        <TextField
          className="EmiInputs"
          variant="outlined"
          label="Phone Number"
          // style={{ marginTop: 15 }}
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
            (email ? emailValid : true) &&
            message.trim().length > 0 &&
            positionJobRole.trim().length > 0 &&
            supplierOf.trim().length > 0 &&
              location.trim().length > 0 &&
            city.trim().length > 0 &&
            company.trim().length > 0 &&
            !enableOtpField && (
              <Button
                style={{ width: "23%", marginTop: "15px" }}
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
          (email ? emailValid : true) &&
          positionJobRole.trim().length > 0 &&
          message.trim().length > 0 &&
          positionJobRole.trim().length > 0 &&
          supplierOf.trim().length > 0 &&
          location.trim().length > 0 &&
          city.trim().length > 0 &&
          company.trim().length > 0 && (
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
          //  onClick={handleClose}
          disabled={
            !isOtpVerified ||
            name.length === 0 ||
            name.length === 0 ||
            (email && !emailValid) ||
            supplierOf.trim().length === 0 ||
            positionJobRole.trim().length === 0 ||
            location.trim().length === 0 ||
            city.trim().length === 0 ||
            message.trim().length === 0 ||
            company.trim().length === 0
          }
          onClick={(e) => handleData(e)}
        >
          Submit now
        </Button>
      </Box>
    </div>
  );
}

export default withStyles(styles)(SupplierForm);
