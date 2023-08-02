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
import * as ConstructionAction from "../../redux/actions/ConstructionAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./blogManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import API_ENDPOINTS from "../../constants/api-endpoints";

const ConstructionCreateUpdate = (props) => {
  let query = useQuery();
  let id = query.get("id");
  let constructionData = props?.construction?.constructionData;
  const [, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      _id: id,
    };
    if (id != null) {
      dispatch(ConstructionAction.ConstructionDataRequestAsync(data));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (props.construction.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.construction.success]);

  const initialState = {
    title: constructionData?.title || "",
    metaTitle: constructionData?.metaTitle || "",
    metaKeywords: constructionData?.metaKeywords || "",
    metaDescription: constructionData?.metaDescription || "",
    image: "",
    imagePosition: constructionData?.imagePosition || "",
    id: id,
  };

  const [state, setState] = useState(initialState);
  const [description, setDescription] = useState(constructionData?.description);

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
      image,
      imagePosition,
    } = state;
    var data = new FormData();
    if (id == null) {
      data.append("image", image);
      data.append("title", title);
      data.append("description", description);
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);
      data.append("imagePosition", imagePosition);

      dispatch(ConstructionAction.ConstructionAddRequestAsync(data));
    } else {
      data.append("image", image);
      data.append("title", title);
      data.append("description", description);
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);
      data.append("_id", id);
      data.append("imagePosition", imagePosition);

      dispatch(ConstructionAction.ConstructionUpdateRequestAsync(data));
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

  return (
    <Box className="MenuManagement_Data">
      <FormHeader
        heading1={"Construction Module Management"}
        heading2={"Create and Update Construction Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"ConstructionManagement"}
            heading2={"Edit Construction Module"}
          />
          <SubHeading heading={"Edit Construction Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"ConstructionManagement"}
            heading2={"Add Construction Module"}
          />
          <SubHeading heading={"Add Construction Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} Construction
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

                {/* <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Image Position*"
                    fullWidth
                    value={state.imagePosition}
                    onChange={inputChange}
                    name="imagePosition"
                    id="imagePosition"
                  />
                </Grid> */}

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel
                      id="demo-simple-select-outlined-label"
                      htmlFor="age-native-simple"
                    >
                      Image position
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined-label"
                      label="Role"
                      native
                      name="imagePosition"
                      value={state.imagePosition}
                      onChange={inputChange}
                      inputProps={{
                        name: "imagePosition",
                        id: "age-native-simple",
                      }}
                    >
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={12} md={12}>
                  {constructionData?.description != null ? (
                    <>
                      <ReactQuill
                        onChange={handleChangeTextEditor}
                        value={
                          description
                            ? description
                            : constructionData?.description
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
                  {constructionData?.image[0]?.image?.map((item, index) => {
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

                <Link component={RouterLink} to="/construction">
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
  const { construction } = state;
  return {
    construction,
  };
}
export default connect(mapStateToProps)(ConstructionCreateUpdate);
