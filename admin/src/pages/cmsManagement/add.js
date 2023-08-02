import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Box,
  Link,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import * as CmsAction from "../../redux/actions/CmsAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./blogManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
// import Link from "next/link";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import API_ENDPOINTS from "../../constants/api-endpoints";

const MenuCreateUpdate = (props) => {
  let query = useQuery();
  let id = query.get("id");
  let cmsData = props?.cms?.cmsData;
  const [, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      _id: id,
    };
    if (id != null) {
      dispatch(CmsAction.CmsDataRequestAsync(data));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (props.cms.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.cms.success]);

  const initialState = {
    position: cmsData?.position || "Bottom",
    pageName: cmsData?.pageName || "",
    type: cmsData?.type || "Page",
    pageUrl: cmsData?.pageUrl || null,
    pageTitle: cmsData?.pageTitle || "",

    pageSortDescription: cmsData?.pageSortDescription || "",
    metaTitle: cmsData?.metaTitle || "",
    metaKeywords: cmsData?.metaKeywords || "",
    metaDescription: cmsData?.metaDescription || "",
    iconImage: "",
    id: id,
  };

  const [state, setState] = useState(initialState);
  const [description, setDescription] = useState(
    cmsData?.pageDescription || ""
  );

  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    const {
      position,
      pageName,
      type,
      pageUrl,
      pageTitle,
      pageSortDescription,
      id,
      metaTitle,
      metaKeywords,
      metaDescription,
      image,
      iconImage,
    } = state;
    var data = new FormData();
    if (id == null) {
      data.append("image", iconImage);
      data.append("position", position);
      data.append("pageSortDescription", pageSortDescription);
      data.append("pageDescription", description);
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);

      data.append("pageName", pageName);
      data.append("type", type);
      data.append("pageUrl", pageUrl);
      data.append("pageTitle", pageTitle);

      dispatch(CmsAction.CmsAddRequestAsync(data));
    } else {
      data.append("image", iconImage);
      data.append("position", position);
      data.append("pageSortDescription", pageSortDescription);
      data.append("pageDescription", description);
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);

      data.append("pageName", pageName);
      data.append("type", type);
      data.append("pageUrl", pageUrl);
      data.append("pageTitle", pageTitle);
      data.append("id", id);
      dispatch(CmsAction.CmsUpdateRequestAsync(data));
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const handleChangeTextEditor = (content, editor) => {
    setDescription(content);
  };

  const handleBannerUpload = (file, status) => {
    if (status === "done") {
      setState({ ...state, ["image"]: file.file });
    }
  };

  const handleBlogBannerUpload = (file, status) => {
    if (status === "done") {
      setState({ ...state, ["iconImage"]: file.file });
    }
  };

  return (
    <Box className="MenuManagement_Data">
      <FormHeader
        heading1={"Cms Module Management"}
        heading2={"Create and Update Cms Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"CmsManagement"}
            heading2={"Edit Cms Module"}
          />
          <SubHeading heading={"Edit Cms Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs heading1={"CmsManagement"} heading2={"Add Cms Module"} />
          <SubHeading heading={"Add Cms Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} Cms
            </Typography>
          </div>
          <div class="card-body">
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel
                      id="demo-simple-select-outlined-label"
                      htmlFor="age-native-simple"
                    >
                      position
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined-label"
                      label="Role"
                      native
                      name="position"
                      value={state.position}
                      onChange={inputChange}
                      inputProps={{
                        name: "position",
                        id: "age-native-simple",
                      }}
                    >
                      <option value="bottom">Bottom</option>
                      <option value="location">Location</option>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel
                      id="demo-simple-select-outlined-label"
                      htmlFor="age-native-simple"
                    >
                      Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined-label"
                      label="Role"
                      native
                      name="type"
                      value={state.type}
                      onChange={inputChange}
                      inputProps={{
                        name: "type",
                        id: "age-native-simple",
                      }}
                    >
                      <option value="Page">Page</option>
                      <option value="url">URL</option>
                    </Select>
                  </FormControl>
                </Grid>

                {state.type === "Page" ? (
                  <>
                    <Grid
                      className="form-group-item"
                      item
                      xs={12}
                      sm={6}
                      md={4}
                    >
                      <TextValidator
                        className="form-control-item"
                        variant="outlined"
                        label="Page Name*"
                        fullWidth
                        value={state.pageName}
                        onChange={inputChange}
                        name="pageName"
                        id="pageName"
                      />
                    </Grid>

                    <Grid
                      className="form-group-item"
                      item
                      xs={12}
                      sm={6}
                      md={4}
                    >
                      <TextValidator
                        className="form-control-item"
                        variant="outlined"
                        label="Page Title*"
                        fullWidth
                        value={state.pageTitle}
                        onChange={inputChange}
                        name="pageTitle"
                        id="pageTitle"
                      />
                    </Grid>

                    <Grid
                      className="form-group-item"
                      item
                      xs={12}
                      sm={6}
                      md={4}
                    >
                      <TextValidator
                        className="form-control-item"
                        variant="outlined"
                        label="Short Description*"
                        fullWidth
                        value={state.pageSortDescription}
                        onChange={inputChange}
                        name="pageSortDescription"
                        id="pageSortDescription"
                        validators={["required"]}
                        errorMessages={[
                          "pageSortDescription field is required",
                        ]}
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid
                      className="form-group-item"
                      item
                      xs={12}
                      sm={6}
                      md={4}
                    >
                      <TextValidator
                        className="form-control-item"
                        variant="outlined"
                        label="Page Url*"
                        fullWidth
                        value={state.pageUrl}
                        onChange={inputChange}
                        name="pageUrl"
                        id="pageUrl"
                      />
                    </Grid>
                    <Grid
                      className="form-group-item"
                      item
                      xs={12}
                      sm={6}
                      md={4}
                    >
                      <TextValidator
                        className="form-control-item"
                        variant="outlined"
                        label="Page Name*"
                        fullWidth
                        value={state.pageName}
                        onChange={inputChange}
                        name="pageName"
                        id="pageName"
                      />
                    </Grid>
                  </>
                )}

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

                {state.type === "Page" ? (
                  <Grid
                    className="form-group-item"
                    item
                    xs={12}
                    sm={12}
                    md={12}
                  >
                    {cmsData?.pageDescription != null ? (
                      <>
                        <ReactQuill
                          onChange={handleChangeTextEditor}
                          value={
                            description ? description : cmsData?.pageDescription
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
                ) : (
                  ""
                )}
              </Grid>
              <br />
              {state.type === "Page" ? (
                <>
                  <SubHeading heading={"Upload Image"} />
                  <br />
                  <Grid container spacing={3} className="FormFildes">
                    <Grid
                      className="form-group-item"
                      item
                      xs={12}
                      sm={6}
                      md={5}
                    >
                      <Typography>Icon Image </Typography>
                      {cmsData?.image[0]?.image?.map((item, index) => {
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
                        onChangeStatus={handleBlogBannerUpload}
                        accept="image/*"
                      />
                    </Grid>
                  </Grid>
                </>
              ) : (
                ""
              )}
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

                <Link component={RouterLink} to="/cms">
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
  const { cms } = state;
  return {
    cms,
  };
}
export default connect(mapStateToProps)(MenuCreateUpdate);
