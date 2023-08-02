import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box, Button, Container } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import "./index.css";
import PageBanner from "../../components/page-banner";
import bannerImage from "../../images/clientbg.jpeg";
import ApplyJobs from "../../components/apply-jobs/apply-jobs";
import ApiClient from "../../api-client";
import { useDispatch } from "react-redux";
import * as Snackbar from "../../redux/actions/SnackbarActions";

import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

// import { Gallery, Item } from "react-photoswipe-gallery";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Carrer() {
  const classes = useStyles();
  const [allActiveCareer, setAllActiveCareer] = useState([]);
  const [enableOtpField, setEnableOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [workSpaceDetail, setWorkSpaceDetail] = React.useState({});
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const otpHandler = async () => {
    try {
      setVerifyLoader(true);
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/otp/createOTP",
        { mobile: "" },
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      setEnableOtpField(true);
      setVerifyLoader(false);
      dispatch(Snackbar.showSuccessSnackbar("Otp sent successfully"));
    } catch (error) {
      console.error("this is the error::", error);
      dispatch(
        Snackbar.showFailSnackbar(
          "We are facing some issue Please try again later."
        )
      );
      setVerifyLoader(false);
    }
  };

  // const checkOtpValidOrNot = async (value) => {
  //   try {
  //     const response = await ApiClient.call(
  //       ApiClient.REQUEST_METHOD.POST,
  //       "/otp/verifyOTP",
  //       { mobile: "", otp: value },
  //       {},
  //       { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
  //       false
  //     );
  //     if (response.status) {
  //       setIsOtpVerified(true);
  //       dispatch(Snackbar.showSuccessSnackbar("Otp Verified SuccessFully"));
  //     } else {
  //       setIsOtpVerified(false);
  //       dispatch(Snackbar.showFailSnackbar("Please type Valid otp."));
  //     }
  //   } catch (error) {
  //     setIsOtpVerified(false);
  //     dispatch(
  //       Snackbar.showFailSnackbar(
  //         "We are facing some issue Please try again later."
  //       )
  //     );
  //   }
  // };
  // const reset = () => {
  //   setVerifyLoader(false);
  //   setIsOtpVerified(false);
  //   setEnableOtpField(false);
  //   setOtp("");
  // };

  useEffect(() => {
    populateBlogList();
    // fetchServiceDetails();
  }, []);

  // const fetchServiceDetails = () => {
  //   const getData = async () => {
  //     const response = await ApiClient.call(
  //       ApiClient.REQUEST_METHOD.POST,
  //       "/home/getServiceDetails",
  //       { _id: "6159b9015b1c61746b42e0ea" },
  //       {},
  //       { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
  //       false
  //     );

  //     //   console.log("Service Details Info ", response.data);
  //     setWorkSpaceDetail(response.data);
  //     //   setViewDetails(true);
  //   };
  //   getData();
  // };

  const populateBlogList = () => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/career/getAllActiveCareer",
        {},
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      setAllActiveCareer(response.data);
      console.log("setAllActiveCareer details", response.data);
    };
    getData();
  };

  let images = [];
  // if (
  //   workSpaceDetail !== {} &&
  //   workSpaceDetail.media &&
  //   workSpaceDetail.media.length > 0 &&
  //   workSpaceDetail.media[0].image &&
  //   workSpaceDetail.media[0].image.length > 0
  // ) {
  //   // img1 = ApiClient.SERVER_ADDRESS + "/" + workSpaceDetail.media[0].image[0].path;

  //   images = workSpaceDetail.media[0].image.map((imgInfo) => {
  //     return ApiClient.SERVER_ADDRESS + "/" + imgInfo.path;
  //   });
  // }
  //   console.log("workSpaceDetail", workSpaceDetail);

  return (
    <>
      <PageBanner bgImage={bannerImage} title="Career" currentPage="CAREER" />
      <Box className="CareerPageText">
        <Container>
          <div className={classes.root} className="headingtext">
            <Box className="middel-content">
              {/* <CarrierBannerImg /> */}
              <h2>
                Come, Join Us!{" "}
                <span style={{ color: "#00afb8" }}>We’re Hiring.</span>
              </h2>

              <p>
                We believe that each one of us should be able to find our dream
                job, and we constantly strive hard to make that possible. Apply
                now!
              </p>

              <div className="job-list">
                <div className="row">
                  {(allActiveCareer || []).map((career, i) => {
                    const {
                      _id,
                      degination,
                      department,
                      vacancy,
                      experiance,
                      location,
                    } = career;

                    return (
                      <div className=" job_inner wow fadeInUp">
                        <Grid item xs={9}>
                          <h3 className="job-title">
                            {degination} - {department} - {vacancy || 0}{" "}
                            Position
                          </h3>
                          <div className="job-details-section">
                            <div className="job-detail">
                              <span className="detail-value">
                                {" "}
                                <DateRangeIcon style={{ color: "#FF7601" }} />
                                {experiance}
                              </span>
                            </div>
                            <div className="job-detail">
                              <span className="detail-value">
                                <LocationOnIcon style={{ color: "#FF7601" }} />{" "}
                                {location}
                              </span>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={3}>
                          <Box className="ParentButton">
                            <ApplyJobs
                              buttonName={"Apply Now"}
                              careerId={_id}
                            />
                          </Box>
                        </Grid>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Box>
            <Box className="work-space">
              {/* <h2>
                Vishal <span style={{ color: "#00afb8" }}>Work Space</span>
              </h2> */}
              {/* <Grid container spacing={3}>
                <Gallery>
                  {(images || []).map((img) => {
                    //   {workSpaceDetail?.media[0]?.image?.map((imgInfo) => {
                    return (
                      <Grid item xs={4} className="workSpaceImgaes">
                        <Item
                          original={img}
                          thumbnail={img}
                          width="1024"
                          height="768"
                        >
                          {({ ref, open }) => (
                            <img ref={ref} onClick={open} src={img} />
                          )}
                        </Item>
                      </Grid>

                      // <Grid item xs={4} className="workSpaceImgaes">
                      //   <Zoom>
                      //     <img src={img} alt="" />
                      //   </Zoom>
                      // </Grid>
                    );
                  })}
                </Gallery>
              </Grid> */}
              {/* <Grid container spacing={3}>
                <Grid item xs={4} className="workSpaceImgaes">
                  <Zoom>
                    <img src={process.env.PUBLIC_URL + Workspace1} />
                  </Zoom>
                </Grid>
                <Grid item xs={4} className="workSpaceImgaes">
                  <img src={process.env.PUBLIC_URL + Workspace2} />
                </Grid>
                <Grid item xs={4} className="workSpaceImgaes">
                  <img src={process.env.PUBLIC_URL + Workspace3} />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} className="workSpaceImgaes">
                  <img src={process.env.PUBLIC_URL + Workspace4} />
                </Grid>
                <Grid item xs={4} className="workSpaceImgaes">
                  <img src={process.env.PUBLIC_URL + Workspace5} />
                </Grid>
                <Grid item xs={4} className="workSpaceImgaes">
                  <img src={process.env.PUBLIC_URL + Workspace6} />
                </Grid>
              </Grid> */}
            </Box>
          </div>
        </Container>
      </Box>
    </>
  );
}
