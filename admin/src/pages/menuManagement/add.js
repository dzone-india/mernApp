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

import * as MenuAction from "../../redux/actions/MenuAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./menuManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { connect } from "react-redux";
// import Link from "next/link";

const MenuCreateUpdate = (props) => {
  let menuData = props?.menu?.menuData;
  let query = useQuery();
  let id = query.get("id");
  const dispatch = useDispatch();
  const [, setRefresh] = useState(false);

  const initialState = {
    name: menuData?.name || "",
    description: menuData?.description || "",
    id: id,
    status: true,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let data = {
      _id: id,
    };
    if (id != null) {
      dispatch(MenuAction.MenuDataRequestAsync(data));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (props.menu.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.menu.success]);

  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    const { name, description, status, id } = state;
    let userData = JSON.parse(window.localStorage.getItem("user"));
    if (id == null) {
      let reqData = {
        name: name,
        description: description,
        status: status,
        createdBy: userData._id,
      };

      dispatch(MenuAction.MenuAddRequestAsync(reqData));
    } else {
      let reqData = {
        name: name,
        description: description,
        status: status,
        updatedBy: userData._id,
        _id: id,
      };
      dispatch(MenuAction.MenuUpdateRequestAsync(reqData));
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return (
    <Box className="MenuManagement_Data">
      <FormHeader
        heading1={"Menu Module Management"}
        heading2={"Create and Update Menu Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"MenuManagement"}
            heading2={"Edit Menu Module"}
          />
          <SubHeading heading={"Edit Menu Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"MenuManagement"}
            heading2={"Add Menu Module"}
          />
          <SubHeading heading={"Add Menu Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} Menu
            </Typography>
          </div>
          <div class="card-body">
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Name*"
                    fullWidth
                    value={state.name}
                    onChange={inputChange}
                    name="name"
                    id="name"
                    validators={["required"]}
                    errorMessages={["Name field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Description*"
                    fullWidth
                    value={state.description}
                    onChange={inputChange}
                    name="description"
                    id="description"
                    validators={["required"]}
                    errorMessages={["Description field is required"]}
                  />
                </Grid>
                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel
                      id="demo-simple-select-outlined-label"
                      htmlFor="age-native-simple"
                    >
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined-label"
                      label="Status"
                      native
                      name="status"
                      value={menuData?.status ? menuData.status : state.status}
                      onChange={inputChange}
                      inputProps={{
                        name: "status",
                        id: "age-native-simple",
                      }}
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </Select>
                  </FormControl>
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

                <Link component={RouterLink} to="/menu">
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
  const { menu } = state;
  return {
    menu,
  };
}
export default connect(mapStateToProps)(MenuCreateUpdate);
