import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box, Link } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import * as DealingItemAction from "../../redux/actions/DealingItemAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./dealingManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import API_ENDPOINTS from "../../constants/api-endpoints";

const MenuCreateUpdate = (props) => {
  const dispatch = useDispatch();
  let query = useQuery();
  let id = query.get("id");
  let dealingItemData = props?.dealingItem?.dealingItemData;
  useEffect(() => {
    let data = {
      _id: id,
    };
    if (id != null) {
      dispatch(DealingItemAction.DealingItemDataRequestAsync(data));
    }
  }, [id, dispatch]);

  const [, setRefresh] = useState(false);
  useEffect(() => {
    if (props.dealingItem.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.dealingItem.success]);

  const initialState = {
    title: dealingItemData?.title || "",
    metaTitle: dealingItemData?.metaTitle || "",
    metaKeywords: dealingItemData?.metaKeywords || "",
    metaDescription: dealingItemData?.metaDescription || "",
    shortDescription: dealingItemData?.shortDescription || "",
    icon: dealingItemData?.icon || "",
    banner: dealingItemData?.banner || "",
    // video: dealingItemData?.video || "",
    id: id,
    image: [],
  };

  const [state, setState] = useState(initialState);
  const [description, setDescription] = useState(dealingItemData?.description);
  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    const {
      title,
      id,
      metaTitle,
      metaKeywords,
      metaDescription,
      shortDescription,
      icon,
      banner,
      // video,
    } = state;

    var data = new FormData();
    state?.image.forEach((item, index) => {
      data.append("image", item);
    });
    if (id === null) {
      data.append("title", title);
      data.append("description", description);
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);
      data.append("shortDescription", shortDescription);
      data.append("icon", icon);
      data.append("banner", banner);
      // data.append("video", video);
      dispatch(DealingItemAction.DealingItemAddRequestAsync(data));
    } else {
      data.append("title", title);
      data.append("description", description);
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);
      data.append("shortDescription", shortDescription);
      data.append("icon", icon);
      data.append("banner", banner);
      // data.append("video", video);
      data.append("_id", id);
      dispatch(DealingItemAction.DealingItemUpdateRequestAsync(data));
    }
  };

  const handleChangeTextEditor = (content, editor) => {
    setDescription(content);
  };

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

  // const handleVideouplaod = (file, status) => {
  //   if (status === "done") {
  //     setState({ ...state, ["video"]: file.file });
  //   }
  // };

  const handleBannerUpload = (file, status) => {
    if (status === "done") {
      setState({ ...state, ["banner"]: file.file });
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  return (
    <Box className="MenuManagement_Data">
      <FormHeader
        heading1={"Dealing Item Module Management"}
        heading2={"Create and Update Dealing Item Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"DealingItemManagement"}
            heading2={"Edit Dealing Item Module"}
          />
          <SubHeading heading={"Edit Dealing Item Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"DealingItemManagement"}
            heading2={"Add Dealing Item Module"}
          />
          <SubHeading heading={"Add Dealing Item Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} Dealing Item
            </Typography>
          </div>
          <div class="card-body">
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={3} className="FormFildes">
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
                    label="Short Description*"
                    fullWidth
                    value={state.shortDescription}
                    onChange={inputChange}
                    name="shortDescription"
                    id="shortDescription"
                    validators={["required"]}
                    errorMessages={["shortDescription field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="icon*"
                    fullWidth
                    value={state.icon}
                    onChange={inputChange}
                    name="icon"
                    id="icon"
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

                <Grid className="form-group-item" item xs={12} sm={12} md={12}>
                  {dealingItemData?.description != null ? (
                    <>
                      <ReactQuill
                        onChange={handleChangeTextEditor}
                        value={
                          description
                            ? description
                            : dealingItemData?.description
                        }
                        placeholder="Enter description"
                        theme="snow"
                      />
                    </>
                  ) : (
                    <>
                      <ReactQuill
                        onChange={handleChangeTextEditor}
                        placeholder="Enter description"
                        theme="snow"
                      />
                    </>
                  )}
                </Grid>
              </Grid>
              <br />
              <SubHeading heading={"Upload Image"} />
              <br />
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6} md={5}>
                  <Typography>Image </Typography>
                  {dealingItemData?.media[0]?.image?.map((item, index) => {
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

                <Grid className="form-group-item" item xs={12} sm={6} md={5}>
                  <Typography>Banner </Typography>
                  {dealingItemData?.media[0]?.banner?.map((item, index) => {
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

                {/* <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <Typography>Video </Typography>
                  <Dropzone
                    maxFiles="1"
                    onChangeStatus={handleVideouplaod}
                    accept="video/*"
                  />
                </Grid> */}
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

                <Link component={RouterLink} to="/dealingItem">
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
  const { dealingItem } = state;
  return {
    dealingItem,
  };
}
export default connect(mapStateToProps)(MenuCreateUpdate);
