import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box, Link } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import * as BuildingAction from "../../redux/actions/BuildingAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./blogManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
// import Link from "next/link";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import API_ENDPOINTS from "../../constants/api-endpoints";

const BuildingCreateUpdate = (props) => {
  let query = useQuery();
  let id = query.get("id");
  let buildingData = props?.building?.buildingData;
  const [, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      _id: id,
    };
    if (id != null) {
      dispatch(BuildingAction.BuildingDataRequestAsync(data));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (props.building.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.building.success]);

  const initialState = {
    name: buildingData?.name || "",
    image: "",
    id: id,
  };

  const [state, setState] = useState(initialState);

  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    const { name, id, image } = state;
    var data = new FormData();
    if (id == null) {
      data.append("image", image);
      data.append("name", name);

      dispatch(BuildingAction.BuildingAddRequestAsync(data));
    } else {
      data.append("image", image);
      data.append("name", name);
      data.append("id", id);
      dispatch(BuildingAction.BuildingUpdateRequestAsync(data));
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
        heading1={"Building Module Management"}
        heading2={"Create and Update Building Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"BuildingManagement"}
            heading2={"Edit Building Module"}
          />
          <SubHeading heading={"Edit Building Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"BuildingManagement"}
            heading2={"Add Building Module"}
          />
          <SubHeading heading={"Add Building Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} Building
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
                    errorMessages={["name field is required"]}
                  />
                </Grid>
              </Grid>
              <br />
              <SubHeading heading={"Upload Image"} />
              <br />
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6} md={5}>
                  <Typography>Image </Typography>

                  {buildingData?.image?.map((item, index) => {
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

                <Link component={RouterLink} to="/Building">
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
  const { building } = state;
  return {
    building,
  };
}
export default connect(mapStateToProps)(BuildingCreateUpdate);
