import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Box,
  Link,
  InputLabel,
  Select,
  FormControl,
} from "@material-ui/core";
import CheckboxField from "@material-ui/core/Checkbox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import * as RoleAction from "../../redux/actions/RoleAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./roleManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";

const MenuCreateUpdate = (props) => {
  let roleData = props?.role?.roleData;

  let query = useQuery();
  let id = query.get("id");
  const dispatch = useDispatch();
  const [, setRefresh] = useState(false);

  const initialState = {
    status: roleData?.status || "",
    name: roleData?.name || "",
    rights: roleData ? roleData?.rights : [],
    id: id,
  };
  const [state, setState] = useState(initialState);
  const [role, setRole] = useState(initialState);
  useEffect(() => {
    let data = {
      _id: id,
    };
    if (id != null) {
      dispatch(RoleAction.RoleDataRequestAsync(data));
    }
    dispatch(RoleAction.RoleMenuListRequestAsync(data));
  }, [id, dispatch]);

  useEffect(() => {
    if (props.role.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.role.success]);

  const handleDefaultCheck = (name) => {
    // console.log('named', name);
    return (
      roleData.rights &&
      roleData.rights.some((itr) => {
        return itr === name;
      })
    );
  };

  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    const { status, name, id } = state;
    const { rights } = role;
    let userData = JSON.parse(window.localStorage.getItem("user"));
    if (id == null) {
      let reqData = {
        status: status,
        name: name,
        rights: rights,
        createdBy: userData._id,
        updatedBy: userData._id,
      };
      dispatch(RoleAction.RoleAddRequestAsync(reqData));
    } else {
      let reqData = {
        status: status,
        name: name,
        rights: rights,
        createdBy: userData._id,
        updatedBy: userData._id,
        id: id,
      };
      dispatch(RoleAction.RoleUpdateRequestAsync(reqData));
    }
  };

  const handleChange = (event, isChecked) => {
    let value = event.target.value;

    if (isChecked) {
      setRole((states) => ({
        rights: [...states.rights, value],
      }));
    } else {
      setRole({
        rights: state.rights.filter((rights) => rights !== value),
      });
    }
    console.log("log", role);
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return (
    <Box className="MenuManagement_Data">
      <FormHeader
        heading1={"Role Module Management"}
        heading2={"Create and Update Role Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"RoleManagement"}
            heading2={"Edit Role Module"}
          />
          <SubHeading heading={"Edit Role Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"RoleManagement"}
            heading2={"Add Role Module"}
          />
          <SubHeading heading={"Add Role Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} Role
            </Typography>
          </div>
          <div class="card-body">
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6}>
                  <TextValidator
                    className="form-control-item"
                    label="name*"
                    variant="outlined"
                    fullWidth
                    onChange={inputChange}
                    name="name"
                    id="name"
                    value={state.name}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6}>
                  <FormControl
                    className="form-control-item"
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                    <InputLabel
                      id="demo-simple-select-outlined-label"
                      htmlFor="age-native-simple"
                    >
                      Select Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined-label"
                      label="Choose Country"
                      native
                      name="status"
                      value={state.status}
                      onChange={inputChange}
                      inputProps={{
                        name: "status",
                        id: "age-native-simple",
                      }}
                    >
                      <option aria-label="Select status" value="" />
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={12}>
                  <Typography component="h4" variant="h5">
                    Module Rights
                  </Typography>
                  <hr></hr>
                </Grid>

                {roleData
                  ? props?.role?.menuList &&
                    props?.role?.menuList?.map((items, index) => {
                      return (
                        <Grid item xs={4} sm={4}>
                          <CheckboxField
                            name="rights[]"
                            key={items._id}
                            label={items}
                            value={items._id}
                            onChange={handleChange}
                            defaultChecked={handleDefaultCheck(items._id)}
                          />
                          <label>{items.name}</label>
                        </Grid>
                      );
                    })
                  : props?.role?.menuList &&
                    props?.role?.menuList?.map((items, index) => {
                      return (
                        <Grid item xs={4} sm={4}>
                          <CheckboxField
                            name="rights[]"
                            key={items._id}
                            label={items}
                            value={items._id}
                            onChange={handleChange}
                          />
                          <label>{items.name}</label>
                        </Grid>
                      );
                    })}
                {/* {props?.role?.menuList && props?.role?.menuList?.map((items, index) => {
                  return (
                    <Grid item xs={4} sm={4}>
                      <CheckboxField
                        name="rights[]"
                        key={items._id}
                        label={items}
                        value={items._id}
                        onChange={handleChange}
                      />
                      <label>{items.name}</label>
                    </Grid>
                  )
                })} */}
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

                <Link component={RouterLink} to="/role">
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    className={"CanceForm"}
                  >
                    Cancel
                  </Button>
                </Link>
              </Box>
            </ValidatorForm>
          </div>
        </div>
      </Grid>
    </Box>
  );
};

function mapStateToProps(state) {
  const { role } = state;
  // console.log('role', role);
  return {
    role,
  };
}
export default connect(mapStateToProps)(MenuCreateUpdate);
