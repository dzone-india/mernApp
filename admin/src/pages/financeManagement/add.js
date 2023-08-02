import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box, Link } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import * as FinanceAction from "../../redux/actions/FinanceAction";
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

const FinanceCreateUpdate = (props) => {
  let query = useQuery();
  let id = query.get("id");
  let financeData = props?.finance?.financeData;
  const [, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      _id: id,
    };
    if (id != null) {
      dispatch(FinanceAction.FinanceDataRequestAsync(data));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (props.finance.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.finance.success]);

  const initialState = {
    title: financeData?.title || "",
    metaTitle: financeData?.metaTitle || "",
    metaKeywords: financeData?.metaKeywords || "",
    metaDescription: financeData?.metaDescription || "",
    bankImage: [],
    bannerImage: "",
    id: id,
  };

  const [state, setState] = useState(initialState);
  const [description, setDescription] = useState(financeData?.description);

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
      bankImage,
      bannerImage,
    } = state;
    var data = new FormData();

    bankImage?.forEach((item, index) => {
      data.append("bankImage", item);
    });

    if (id == null) {
      data.append("bannerImage", bannerImage);
      data.append("title", title);
      data.append("description", description);
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);

      dispatch(FinanceAction.FinanceAddRequestAsync(data));
    } else {
      data.append("bannerImage", bannerImage);
      data.append("title", title);
      data.append("description", description);
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);
      data.append("_id", id);
      dispatch(FinanceAction.FinanceUpdateRequestAsync(data));
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const handleChangeTextEditor = (content, editor) => {
    setDescription(content);
  };

  const handleBannerUpload = (file, status) => {
    let list = state;
    let data = [];
    if (status === "done") {
      if (list.bankImage && list.bankImage.length) {
        data = list.bankImage;
        data[list.bankImage.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setState({ ...state, ["bankImage"]: data });
    }
  };

  const handleBlogBannerUpload = (file, status) => {
    if (status === "done") {
      setState({ ...state, ["bannerImage"]: file.file });
    }
  };
  return (
    <Box className="MenuManagement_Data">
      <FormHeader
        heading1={"Finance Module Management"}
        heading2={"Create and Update Finance Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"FinanceManagement"}
            heading2={"Edit Finance Module"}
          />
          <SubHeading heading={"Edit Finance Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"FinanceManagement"}
            heading2={"Add Finance Module"}
          />
          <SubHeading heading={"Add Finance Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} Finance
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

                <Grid className="form-group-item" item xs={12} sm={12} md={12}>
                  {financeData?.description != null ? (
                    <>
                      <ReactQuill
                        onChange={handleChangeTextEditor}
                        value={
                          description ? description : financeData?.description
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
                  <Typography>Bank Image </Typography>
                  {financeData?.bankImage.map((item, index) => {
                    return (
                      <img
                        src={API_ENDPOINTS.BASE_URL + item.path}
                        height="80px"
                        width="80px"
                      />
                    );
                  })}

                  <Dropzone
                    onChangeStatus={handleBannerUpload}
                    accept="image/*"
                  />
                </Grid>
                <Grid className="form-group-item" item xs={12} sm={6} md={5}>
                  <Typography>Banner Image </Typography>
                  {financeData?.bannerImage?.map((item, index) => {
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

                <Link component={RouterLink} to="/finance">
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
  const { finance } = state;
  return {
    finance,
  };
}
export default connect(mapStateToProps)(FinanceCreateUpdate);
