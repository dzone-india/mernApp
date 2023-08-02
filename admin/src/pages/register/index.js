import React, {useState} from "react";

import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Link,
  Checkbox,
} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import loginImage from "./adminLogin.jpg";
import * as RegisterAction from "../../redux/actions/RegisterAction";

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {Link as RouterLink} from 'react-router-dom';

const styles = (theme) => ({
  container: {
    height: "100vh",
    backgroundColor: "#fffff",
    color: "#000",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },

  logotypeContainer: {
    backgroundImage: "url(" + loginImage + ")",
    backgroundSize: "cover",
    width: "55%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  googleButton: {
    fontWeight: "bolder",
    color: "#000",
    marginRight: 6,
  },
  logotypeImage: {
    width: "42%",
    padding: "20px",
    backgroundColor: "#fff",
    marginBottom: theme.spacing(4),
  },
  logotypeText: {
    color: "#000",
    fontWeight: 500,
    fontSize: 65,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  formContainer: {
    width: "45%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },

  mainHeading: {
    fontWeight: "bolder",
    letterSpacing: 4,
    fontSize: 23,
    paddingBottom: 10,
  },

  welcomeHeading: {
    fontWeight: "bold",
  },
  form: {
    width: 320,
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
  },
  checkbox: {
    position: "relative",
    left: -9,
    top: -10,
  },
  alignCheckboxHeading: {
    top: -10,
    position: "relative",
    left: -15,
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(2),
  },

  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing(2),
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40",
  },
  errorMessage: {
    textAlign: "center",
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light,
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  },
  textField: {
    borderColor: theme.palette.background.light,
    borderWidth: "5px",
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: theme.spacing(2),
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400,
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
  },
  copyright: {
    marginTop: theme.spacing(4),
    whiteSpace: "nowrap",
    fontSize: "14px",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing(2),
    },
  },
  createAccount: {
    marginTop: theme.spacing(2),
    whiteSpace: "nowrap",
    fontSize: "14px",
    color: "white",
  },

  PhoneInput: {
    marginTop: theme.spacing(3),
  },

  // PhoneInput input:{
  //   marginTop: theme.spacing(3),
  // }
});

const Register = (props) => {
  const initialState = {
    email: "",
    password: "",
    fname: "",
    lname: "",
    phone: "",
  };

  const [state, setState] = useState(initialState);
  const [country, setCountry] = useState("+91");

  const inputChange = (e) => {
    let {name, value} = e.target;

    setState({...state, [name]: value});
  };


  const handleSubmit = (e) => {

    const {email, password, fname, lname, phone} = state;

    let reqData = {
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
      mobile: phone,
      countryCode: country,
      userRole: '60e84c1c8494c904475e8270',
    };

    console.log("reqData  ", reqData);
    props.dispatch(RegisterAction.RegisterRequestAsync(reqData));

    // props.dispatch(userActions.login({ fname: email, password }));
  };

  const {classes} = props;
  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Typography className={classes.mainHeading}>
            Vishal Properties
          </Typography>
          <Typography className={classes.welcomeHeading}>
            New here?
          </Typography>
          <Typography>Join us today! it takes only few steps</Typography>
          <React.Fragment>
            <TextField
              id="fname"
              variant="outlined"
              name="fname"
              className={classes.textField}
              label="First Name"
              value={state.fname}
              onChange={inputChange}
              margin="normal"
              placeholder="First name"
              type="text"
              fullWidth
            />

            <TextField
              id="lname"
              variant="outlined"
              name="lname"
              className={classes.textField}
              label="Last Name"
              value={state.lname}
              onChange={inputChange}
              margin="normal"
              placeholder="Last name"
              type="text"
              fullWidth
            />

            <TextField
              id="email"
              variant="outlined"
              name="email"
              className={classes.textField}
              label="Email"
              value={state.email}
              onChange={inputChange}
              margin="normal"
              placeholder="Email Address"
              type="email"
              fullWidth
            />

            <TextField
              id="password"
              label="Password"
              variant="outlined"
              name="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={state.password}
              onChange={inputChange}
              margin="normal"
              placeholder="Password"
              type="password"
              fullWidth
            />

            <Grid container spacing={1}>
              <Grid item xs={12} sm={2}>
                <PhoneInput
                  className={classes.PhoneInput}
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="IN"
                  value={country}
                  onChange={setCountry} />
              </Grid>
              <Grid item xs={12} sm={10}>

                <TextField
                  id="mobile"
                  variant="outlined"
                  name="phone"
                  className={classes.textField}
                  label="Mobile"
                  value={state.phone}
                  onChange={inputChange}
                  margin="normal"
                  placeholder="Mobile number"
                  type="number"
                  fullWidth
                />
              </Grid>
            </Grid>

            {/* Signup k time userRole me Ye Id Send karn hha    60e84c1c8494c904475e827 OKK  */}


            <Grid container>
              <Grid item xs>
                <Grid item xs>
                  <Checkbox
                    className={classes.checkbox}
                    value="checkedA"
                    inputProps={{"aria-label": "Checkbox A"}}
                  />
                  <Link
                    to="/"
                    variant="body2"
                    className={classes.alignCheckboxHeading}
                  >
                    Remember me
                  </Link>
                </Grid>
              </Grid>
              <Grid item>
                <Link to="#" variant="body2">
                  Forget password?
                </Link>
              </Grid>
            </Grid>
            <div className={classes.formButtons}>
              {false ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  fullWidth
                  // disabled={
                  //   state?.email?.length === 0 || state?.password?.length === 0
                  // }
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Register
                </Button>
              )}
            </div>
          </React.Fragment>
        </div>
        <Typography color="primary" className={classes.createAccount}>
          Already have an Account? <Link component={RouterLink} to="/login">Login</Link>
        </Typography>
      </div>

      <div className={classes.logotypeContainer}>
        {/* <img src={logo} alt="logo" className={classes.logotypeImage} /> */}
      </div>

    </Grid>

  );
};

function mapStateToProps(state) {
  console.log("state  ", state);
  // const { loggingIn } = state.authentication;
  const {users} = state;
  return {
    // loggingIn,
    users,
  };
}
export default connect(mapStateToProps)(withStyles(styles)(Register));