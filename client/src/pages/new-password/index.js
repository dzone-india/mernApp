import React, { useState } from 'react';
import './login.css';
import {
  Grid,
  Typography,
  Paper,
  Box, makeStyles,
  TextField,
  Button,
  Link
} from '@material-ui/core';
import bannerImage from "../../images/banner-2.jpeg";
import * as NewPasswordAction from "../../redux/actions/NewPasswordAction";
import { useDispatch } from "react-redux";
import * as Snackbar from "../../redux/actions/SnackbarActions";
import {
  Link as RouterLink,
  useLocation
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  bannerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#4B2353",
    fontSize: 30,
    marginBottom: 20
  },
  text2: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#8C8C8C",
    fontSize: 14,
    marginTop: 10,
  },
  text3: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FFFFFF",
    fontSize: 14,
  },
  text4: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  login: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridStyle2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  gridStyle3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  textField: {
    borderRadius: 5,
    borderColor: '#FFFFFF',
  },
  notchedOutline: {
    borderWidth: "1px",
    borderRadius: 25,
    borderColor: "#dddddd !important",
    boxShadow: 1,
  },
  btn2: {
    borderRadius: 20,
    background: '#FF7601',
    color: '#FFFFFF',
    textTransform: 'none',
    fontFamily: 'Open Sans,sans-serif',
    paddingLeft: 30,
    paddingRight: 30
  },
  iconContainer: {
    borderRadius: 40,
    padding: 10,
    cursor: 'pointer'
  },
  icon: {
    width: 25,
    height: 25,
  },
  main: {
    marginTop: 100,
    marginBottom: 100,
    width: 400,
    padding: 40,
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 10
  }
}));

const NewPasswordPage = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  let query = useQuery();
  let token = query.get("token");

  const initialState = {
    password: "",
    cpassword: "",
    token: token
  };
  const [state, setState] = useState(initialState);

  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };
  const loginSubmit = (e) => {
    const { password, cpassword, token } = state;
    if (password === cpassword) {
      let reqData = {
        newPassword: password,
        token: token

      };
      dispatch(NewPasswordAction.NewPasswordRequestAsync(reqData));
    }
    else {
      dispatch(Snackbar.showFailSnackbar('Both password must be same'));
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return (
    <div
      className={`${classes.bannerContainer}`}
      style={{
        backgroundImage: `url(${bannerImage}`,
        // height: 326,
        overflow: "hidden",
        textAlign: "center",
        backgroundSize: 'cover',
        position: "relative",
        backgroundPosition: "center",
      }}>
      <Paper className={classes.main}>
        <Grid container>
          <Grid item sm={12} md={12} className={classes.login}>
            <Typography className={classes.text1}>Set New Password</Typography>
            <TextField
              className={classes.textField}
              placeholder="New Password"
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              value={state.password}
              onChange={inputChange}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline
                }
              }}
            />
            <Box style={{ height: 20 }} />
            <TextField
              className={classes.textField}
              placeholder="Confirm Password"
              variant="outlined"
              fullWidth
              name="cpassword"
              type="password"
              value={state.cpassword}
              onChange={inputChange}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline
                }
              }}
            />

          </Grid>

          <Grid item xs={12} md={12}>
            <Box style={{ height: 20 }} />
            <Button variant="contained" className={classes.btn2}
              disabled={state?.password?.length === 0 || state?.cpassword?.length === 0}
              onClick={loginSubmit}
            >Submit</Button>
          </Grid>

          <Grid item xs={12} md={12} className={classes.gridStyle3}>
            <Link component={RouterLink} to="/signin">Back to login</Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default NewPasswordPage;