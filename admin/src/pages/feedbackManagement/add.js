import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box, Link } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import * as FeedbackAction from "../../redux/actions/FeedbackAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./blogManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import Rating from "@mui/material/Rating";
import API_ENDPOINTS from "../../constants/api-endpoints";

const MenuCreateUpdate = (props) => {
  let query = useQuery();
  let id = query.get("id");
  let feedbackData = props?.feedback?.feedbackData;
  const [, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      _id: id,
    };
    if (id != null) {
      dispatch(FeedbackAction.FeedbackDataRequestAsync(data));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (props.feedback.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.feedback.success]);

  const initialState = {
    name: feedbackData?.name || "",
    city: feedbackData?.city || "",
    rating: feedbackData?.rating || "",
    message: feedbackData?.message || "",
    image: [],
    iconImage: "",
    id: id,
  };

  const [state, setState] = useState(initialState);

  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    const { name, city, id, rating, message, iconImage } = state;
    var data = new FormData();
    state?.image.forEach((item, index) => {
      data.append("image", item);
    });
    if (id === null) {
      data.append("iconImage", iconImage);
      data.append("name", name);
      data.append("city", city);
      data.append("rating", rating);
      data.append("message", message);
      dispatch(FeedbackAction.FeedbackAddRequestAsync(data));
    } else {
      data.append("iconImage", iconImage);
      data.append("name", name);
      data.append("city", city);
      data.append("rating", rating);
      data.append("message", message);
      data.append("_id", id);
      dispatch(FeedbackAction.FeedbackUpdateRequestAsync(data));
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const handleIconUpload = (file, status) => {
    if (status === "done") {
      setState({ ...state, ["iconImage"]: file.file });
    }
  };

  const handleBannerUpload = (file, status) => {
    let list = state;
    let data = [];
    if (status === "done") {
      if (list.image && list.image.length) {
        data = list.image;
        data[list.image.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setState({ ...state, ["image"]: data });
    }
  };

  return (
    <Box className="MenuManagement_Data">
      <FormHeader
        heading1={"Feedback Module Management"}
        heading2={"Create and Update Feedback Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"FeedbackManagement"}
            heading2={"Edit Feedback Module"}
          />
          <SubHeading heading={"Edit Feedback Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"FeedbackManagement"}
            heading2={"Add Feedback Module"}
          />
          <SubHeading heading={"Add Feedback Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} Feedback
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

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="City*"
                    fullWidth
                    value={state.city}
                    onChange={inputChange}
                    name="city"
                    id="city"
                    validators={["required"]}
                    errorMessages={["city field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <Typography>Rating </Typography>
                  <Rating
                    name="rating"
                    value={state.rating}
                    onChange={inputChange}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Comment*"
                    fullWidth
                    value={state.message}
                    onChange={inputChange}
                    name="message"
                    id="message"
                  />
                </Grid>
              </Grid>
              <br />
              <SubHeading heading={"Upload Image"} />
              <br />
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6} md={5}>
                  <Typography>Icon Image </Typography>

                  {feedbackData?.image[0]?.iconImage?.map((item, index) => {
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
                    onChangeStatus={handleIconUpload}
                    accept="image/*"
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={5}>
                  <Typography>Property Image </Typography>
                  {feedbackData?.image[0]?.image?.map((item, index) => {
                    return (
                      <img
                        src={API_ENDPOINTS.BASE_URL + item.path}
                        height="80px"
                        width="80px"
                      />
                    );
                  })}

                  <Dropzone
                    maxFiles="3"
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

                <Link component={RouterLink} to="/feedback">
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
  const { feedback } = state;
  return {
    feedback,
  };
}
export default connect(mapStateToProps)(MenuCreateUpdate);
