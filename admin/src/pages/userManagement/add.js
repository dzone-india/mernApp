import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  FormControl,
  Select,
  InputLabel,
  Box,
  Link,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import * as UserAction from "../../redux/actions/UserAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./userManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { connect } from "react-redux";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import API_ENDPOINTS from "../../constants/api-endpoints";

const MenuCreateUpdate = (props) => {
  let query = useQuery();
  let id = query.get("id");
  let userData = props?.user?.userData;
  const [, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const initialState = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
    country: userData?.countryCode || "",
    mobile: userData?.mobile || "",
    id: id,
    userRole: userData?.userRole || "",
    image: userData?.image || "",
  };

  useEffect(() => {
    let data = {
      _id: id,
    };
    if (id != null) {
      dispatch(UserAction.UserDataRequestAsync(data));
    }
    dispatch(UserAction.RoleListRequestAsync());
  }, [id, dispatch]);

  useEffect(() => {
    if (props.user.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.user.success]);

  const [state, setState] = useState(initialState);
  const [country, setCountry] = useState(userData?.countryCode || "+91");

  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    const { firstName, lastName, id, email, mobile, userRole, image } = state;
    var data = new FormData();
    if (id == null) {
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("email", email);
      data.append("countryCode", country);
      data.append("mobile", mobile);
      data.append("userRole", userRole);
      data.append("image", image);

      // console.log('reqdsd',reqData);
      dispatch(UserAction.UserAddRequestAsync(data));
    } else {
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("email", email);
      data.append("countryCode", country);
      data.append("mobile", mobile);
      data.append("userRole", userRole);
      data.append("image", image);
      // data.append("_id", id);

      dispatch(UserAction.UserUpdateRequestAsync(data));
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const handleBannerUpload = (file, status) => {
    if (status === "done") {
      setState({ ...state, ["image"]: file.file });
    }
  };

  return (
    <Box className="MenuManagement_Data">
      <FormHeader
        heading1={"User Module Management"}
        heading2={"Create and Update User Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"UserManagement"}
            heading2={"Edit User Module"}
          />
          <SubHeading heading={"Edit User Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"UserManagement"}
            heading2={"Add User Module"}
          />
          <SubHeading heading={"Add User Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} User
            </Typography>
          </div>
          <div class="card-body">
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="First Name*"
                    fullWidth
                    value={state.firstName}
                    onChange={inputChange}
                    name="firstName"
                    id="firstName"
                    validators={["required"]}
                    errorMessages={["firstName field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Last Name*"
                    fullWidth
                    value={state.lastName}
                    onChange={inputChange}
                    name="lastName"
                    id="lastName"
                    validators={["required"]}
                    errorMessages={["lastName field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Email*"
                    fullWidth
                    value={state.email}
                    onChange={inputChange}
                    name="email"
                    id="email"
                    type="email"
                    validators={["required"]}
                    errorMessages={["email field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={2}>
                      <PhoneInput
                        className="PhoneInput"
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="IN"
                        value={country}
                        onChange={setCountry}
                      />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <TextValidator
                        className="form-control-item"
                        variant="outlined"
                        label="Mobile*"
                        fullWidth
                        value={state.mobile}
                        onChange={inputChange}
                        name="mobile"
                        id="mobile"
                        validators={["required"]}
                        errorMessages={["Mobile field is required"]}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel
                      id="demo-simple-select-outlined-label"
                      htmlFor="age-native-simple"
                    >
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined-label"
                      label="Role"
                      native
                      name="userRole"
                      value={state.userRole}
                      onChange={inputChange}
                      inputProps={{
                        name: "userRole",
                        id: "age-native-simple",
                      }}
                    >
                      {props?.user?.roleList?.map((role, index) => (
                        <option value={role?._id}>{role?.name}</option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <br />
              <SubHeading heading={"Upload Image"} />
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <Typography>Uplaod Image </Typography>
                  {userData?.image?.map((item, index) => {
                    return (
                      <img
                        src={API_ENDPOINTS.BASE_URL + item.path}
                        height="80px"
                        width="80px"
                      />
                    );
                  })}
                  <Dropzone
                    maxFiles="1"
                    onChangeStatus={handleBannerUpload}
                    accept="image/*"
                  />
                </Grid>
              </Grid>

              <br />
              <Box className="footer">
                <Button
                  // fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={"SaveData"}
                >
                  Save
                </Button>

                <Link component={RouterLink} to="/user">
                  <Button
                    // fullWidth
                    variant="contained"
                    color="primary"
                    // onClick={() => history.goBack()}
                    type="button"
                    className={"CanceForm"}
                  >
                    Cancel
                  </Button>
                </Link>
                {/* <button type="button">
                                  Click Me!
                            </button> */}
              </Box>

              {/* </Grid> */}
            </ValidatorForm>
          </div>
        </div>
      </Grid>
    </Box>
  );
};

function mapStateToProps(state) {
  const { user } = state;
  return {
    user,
  };
}
export default connect(mapStateToProps)(MenuCreateUpdate);
