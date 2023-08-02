import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import * as SocialAction from "../../redux/actions/SocialAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./blogManagement.css";
import SubHeading from "../../common/SubHeadingBox";

import { connect } from "react-redux";

const SocialCreateUpdate = (props) => {
  let socialData = props?.social?.socialData;
  const [, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SocialAction.SocialDataRequestAsync());
  }, [dispatch]);

  useEffect(() => {
    if (props.social.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.social.success]);

  const initialState = {
    facebook: socialData?.facebook || "",
    twitter: socialData?.twitter || "",
    instagram: socialData?.state || "",
    linkedin: socialData?.linkedin || "",
    youtube: socialData?.youtube || "",
    id: socialData?._id || "",
  };

  const [state, setState] = useState(initialState);

  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    const { facebook, twitter, id, instagram, linkedin, youtube } = state;
    if (id === null || id === undefined) {
      let reqData = {
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        linkedin: linkedin,
        youtube: youtube,
      };
      dispatch(SocialAction.SocialAddRequestAsync(reqData));
    } else {
      let reqData = {
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        linkedin: linkedin,
        youtube: youtube,
        _id: id,
      };
      dispatch(SocialAction.SocialUpdateRequestAsync(reqData));
    }
  };

  return (
    <Box className="MenuManagement_Data">
      <FormHeader
        heading1={"Social Media Module Management"}
        heading2={"Create and Update Social Media Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"SocialMediaManagement"}
            heading2={"Edit Social Media Module"}
          />
          <SubHeading heading={"Edit Social Media Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"SocialMediaManagement"}
            heading2={"Add Social Media Module"}
          />
          <SubHeading heading={"Add Social Media Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} Social Media
            </Typography>
          </div>
          <div class="card-body">
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Facebook*"
                    fullWidth
                    value={
                      state.facebook ? state.facebook : socialData?.facebook
                    }
                    onChange={inputChange}
                    name="facebook"
                    id="facebook"
                    validators={["required"]}
                    errorMessages={["facebook field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Twitter*"
                    fullWidth
                    value={state.twitter ? state.twitter : socialData?.twitter}
                    onChange={inputChange}
                    name="twitter"
                    id="twitter"
                    validators={["required"]}
                    errorMessages={["twitter field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Instagram"
                    fullWidth
                    value={
                      state.instagram ? state.instagram : socialData?.instagram
                    }
                    onChange={inputChange}
                    name="instagram"
                    id="instagram"
                    validators={["required"]}
                    errorMessages={["instagram field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Linkedin"
                    fullWidth
                    value={
                      state.linkedin ? state.linkedin : socialData?.linkedin
                    }
                    onChange={inputChange}
                    name="linkedin"
                    id="linkedin"
                    validators={["required"]}
                    errorMessages={["linkedin field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Youtube"
                    fullWidth
                    value={state.youtube ? state.youtube : socialData?.youtube}
                    onChange={inputChange}
                    name="youtube"
                    id="youtube"
                    validators={["required"]}
                    errorMessages={["youtube field is required"]}
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
              </Box>
            </ValidatorForm>
          </div>
        </div>
      </Grid>
    </Box>
  );
};

function mapStateToProps(state) {
  const { social } = state;
  console.log("adad", social);
  return {
    social,
  };
}
export default connect(mapStateToProps)(SocialCreateUpdate);
