import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box, Link } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import * as AboutUsAction from "../../redux/actions/AboutUsAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./aboutUsManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
// import Link from "next/link";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import API_ENDPOINTS from "../../constants/api-endpoints";
const MenuCreateUpdate = (props) => {
  let query = useQuery();
  let id = query.get("id");
  let aboutusData = props?.aboutus?.aboutusData;
  const [, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id != null) {
      dispatch(AboutUsAction.AboutUsDataRequestAsync());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (props.aboutus.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.aboutus.success]);

  const initialState = {
    header: aboutusData?.header || "",
    title: aboutusData?.title || "",
    description: aboutusData?.description || "",
    metaTitle: aboutusData?.metaTitle || "",
    metaKeywords: aboutusData?.metaKeywords || "",
    metaDescription: aboutusData?.metaDescription || "",
    image: [],
    id: aboutusData?._id,
  };

  const [state, setState] = useState(initialState);

  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    const {
      title,
      description,
      id,
      metaTitle,
      metaKeywords,
      metaDescription,
      header,
    } = state;
    var data = new FormData();
    state?.image.forEach((item, index) => {
      data.append("aboutImages", item);
    });
    if (id == null) {
      data.append("header", header);
      data.append("title", title);
      data.append("description", description);
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);
      dispatch(AboutUsAction.AboutUsAddRequestAsync(data));
    } else {
      data.append("header", header);
      data.append("title", title);
      data.append("description", description);
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);
      data.append("_id", id);

      dispatch(AboutUsAction.AboutUsUpdateRequestAsync(data));
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
        heading1={"About Us Module Management"}
        heading2={"Create and Update About Us Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"AboutUsManagement"}
            heading2={"Edit About Us Module"}
          />
          <SubHeading heading={"Edit About Us Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"AboutUsManagement"}
            heading2={"Add About Us Module"}
          />
          <SubHeading heading={"Add About Us Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} About Us
            </Typography>
          </div>
          <div class="card-body">
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Header*"
                    fullWidth
                    value={state.header}
                    onChange={inputChange}
                    name="header"
                    id="header"
                    validators={["required"]}
                    errorMessages={["header field is required"]}
                  />
                </Grid>
                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Title*"
                    fullWidth
                    value={state.title}
                    onChange={inputChange}
                    name="title"
                    id="title"
                    validators={["required"]}
                    errorMessages={["title field is required"]}
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
                  {aboutusData?.aboutImages?.map((item, index) => {
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

                <Link component={RouterLink} to="/aboutus">
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
  const { aboutus } = state;
  return {
    aboutus,
  };
}
export default connect(mapStateToProps)(MenuCreateUpdate);
