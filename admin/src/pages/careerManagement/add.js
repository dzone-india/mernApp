import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box, Link } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import * as CareerAction from "../../redux/actions/CareerAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./careerManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { connect } from "react-redux";
// import Link from "next/link";

const MenuCreateUpdate = (props) => {
  let careerData = props?.career?.careerData;
  let query = useQuery();
  let id = query.get("id");
  const dispatch = useDispatch();

  const [, setRefresh] = useState(false);

  const initialState = {
    degination: careerData?.degination || "",
    department: careerData?.department || "",
    desctiption: careerData?.desctiption || "",
    experiance: careerData?.experiance || "",
    location: careerData?.location || "",
    vacancy: careerData?.vacancy || "",
    id: id,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let data = {
      _id: id,
    };
    if (id != null) {
      dispatch(CareerAction.CareerDataRequestAsync(data));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (props.career.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.career.success]);

  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    const {
      degination,
      department,
      desctiption,
      experiance,
      location,
      vacancy,
      id,
    } = state;
    if (id == null) {
      let reqData = {
        degination: degination,
        department: department,
        desctiption: desctiption,
        experiance: experiance,
        location: location,
        vacancy: vacancy,
      };
      dispatch(CareerAction.CareerAddRequestAsync(reqData));
    } else {
      let reqData = {
        degination: degination,
        department: department,
        desctiption: desctiption,
        experiance: experiance,
        location: location,
        vacancy: vacancy,

        _id: id,
      };
      dispatch(CareerAction.CareerUpdateRequestAsync(reqData));
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return (
    <Box className="MenuManagement_Data">
      <FormHeader
        heading1={"Career Module Management"}
        heading2={"Create and Update Career Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"CareerManagement"}
            heading2={"Edit Career Module"}
          />
          <SubHeading heading={"Edit Career Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"CareerManagement"}
            heading2={"Add Career Module"}
          />
          <SubHeading heading={"Add Career Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} Career
            </Typography>
          </div>
          <div class="card-body">
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6} md={6}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Degination*"
                    fullWidth
                    value={state.degination}
                    onChange={inputChange}
                    name="degination"
                    id="degination"
                    validators={["required"]}
                    errorMessages={["Degination field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={6}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Department*"
                    fullWidth
                    value={state.department}
                    onChange={inputChange}
                    name="department"
                    id="department"
                    validators={["required"]}
                    errorMessages={["Department field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Experience*"
                    fullWidth
                    value={state.experiance}
                    onChange={inputChange}
                    name="experiance"
                    id="experiance"
                    validators={["required"]}
                    errorMessages={["Experiance field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Location*"
                    fullWidth
                    value={state.location}
                    onChange={inputChange}
                    name="location"
                    id="location"
                    validators={["required"]}
                    errorMessages={["Location field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="No Of Vacancy*"
                    fullWidth
                    value={state.vacancy}
                    onChange={inputChange}
                    name="vacancy"
                    id="vacancy"
                    type="number"
                    validators={["required"]}
                    errorMessages={["Vacancy field is required"]}
                  />
                </Grid>
                <Grid className="form-group-item" item xs={12} sm={6} md={12}>
                  <TextField
                    variant="outlined"
                    label="Description *"
                    multiline
                    rows={4}
                    fullWidth
                    defaultValue={state.desctiption}
                    onChange={inputChange}
                    name="desctiption"
                    id="desctiption"
                    validators={["required"]}
                    errorMessages={["Desctiption field is required"]}
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

                <Link component={RouterLink} to="/career">
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
  const { career } = state;
  return {
    career,
  };
}
export default connect(mapStateToProps)(MenuCreateUpdate);
