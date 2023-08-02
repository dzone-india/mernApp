import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box, Link } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import * as HomeSliderAction from "../../redux/actions/HomeSliderAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./sliderManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import API_ENDPOINTS from "../../constants/api-endpoints";

const MenuCreateUpdate = (props) => {
  let query = useQuery();
  let id = query.get("id");
  let sliderData = props?.slider?.sliderData;
  const [, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      _id: id,
    };
    if (id != null) {
      dispatch(HomeSliderAction.SliderDataRequestAsync(data));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (props.slider.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.slider.success]);

  const initialState = {
    name: sliderData?.name || "",
    sortDescription: sliderData?.sortDescription || "",
    metaTitle: sliderData?.metaTitle || "",
    metaKeywords: sliderData?.metaKeywords || "",
    metaDescription: sliderData?.metaDescription || "",
    description: sliderData?.description || "",
    image: [],
    id: id,
  };

  const [state, setState] = useState(initialState);
  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    const {
      name,
      id,
      metaTitle,
      metaKeywords,
      metaDescription,
      description,
      image,
    } = state;
    var data = new FormData();
    image?.forEach((item, index) => {
      data.append("image", item);
    });

    if (id == null) {
      data.append("name", name);
      data.append("description", description);
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);

      dispatch(HomeSliderAction.SliderAddRequestAsync(data));
    } else {
      data.append("name", name);
      data.append("description", description);
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);
      data.append("_id", id);
      dispatch(HomeSliderAction.SliderUpdateRequestAsync(data));
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const handleImageExteriorView = (file, status) => {
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
        heading1={"Slider Module Management"}
        heading2={"Create and Update Slider Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"SliderManagement"}
            heading2={"Edit Slider Module"}
          />
          <SubHeading heading={"Edit Slider Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"HomeSliderManagement"}
            heading2={"Add Slider Module"}
          />
          <SubHeading heading={"Add Slider Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} Home Slider
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

                <Grid className="form-group-item" item xs={12} sm={12} md={8}>
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
                    errorMessages={["description field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Meta Title *"
                    fullWidth
                    value={state.metaTitle}
                    onChange={inputChange}
                    name="metaTitle"
                    id="metaTitle"
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Meta Keywords*"
                    fullWidth
                    value={state.metaKeywords}
                    onChange={inputChange}
                    name="metaKeywords"
                    id="metaKeywords"
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Meta Description*"
                    fullWidth
                    value={state.metaDescription}
                    onChange={inputChange}
                    name="metaDescription"
                    id="metaDescription"
                  />
                </Grid>
              </Grid>
              <br />
              <SubHeading heading={"Upload Image"} />
              <br />
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6} md={5}>
                  {sliderData?.image?.map((item, index) => {
                    return (
                      <img
                        src={API_ENDPOINTS.BASE_URL + item.path}
                        height="80px"
                        width="80px"
                      />
                    );
                  })}

                  <Dropzone
                    onChangeStatus={handleImageExteriorView}
                    accept="image/*,audio/*,video/*"
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

                <Link component={RouterLink} to="/slider">
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
  const { slider } = state;
  return {
    slider,
  };
}
export default connect(mapStateToProps)(MenuCreateUpdate);
