import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
  Paper,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  NativeSelect,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useParams } from "react-router";
import "./property-detail.css";
import PageBanner from "../../components/page-banner";
import bannerImage from "../../images/property_header_2.jpeg";
import InfoCard from "./components/info-card";
import FactAndFeature from "./components/fact-and-feature";
import CarouselSlider from "./components/property-carousel-slider";
import familyIcon from "../../images/icon-family.svg";
import yearIcon from "../../images/icon-year.svg";
import Aminities from "./components/amenities";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import StarIcon from "@material-ui/icons/Star";
import APP_CONSTANTS from "../../constants/app-constants";
import { useDispatch, useSelector } from "react-redux";
import * as PropertyAction from "../../redux/actions/PropertyAction";
import { Link as RouterLink, useLocation } from "react-router-dom";
import propertyDetail from "../property-detail";
import MapContainer from "../../components/section-map/MapContainer";
import BookNowModal from "../../components/book-now/book-now";
import { NoDataAvailable } from "../../components/no-details-available/no-details-available";
import CircularProgress from "@mui/material/CircularProgress";
import ApiClient from "../../api-client";
import HtmlParser from "react-html-parser";
import Moment from "react-moment";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import * as Snackbar from "../../redux/actions/SnackbarActions";
import * as CallbackRequestAction from "../../redux/actions/CallbackRequestAction";
// import * as Snackbar from "../../redux/actions/SnackbarActions";
const options = {
  margin: 10,
  responsiveClass: true,
  nav: true,
  dots: false,
  autoplay: true,
  navText: ["Prev", "Next"],
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 2,
    },
    992: {
      items: 2,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  text1: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#777777",
    fontSize: 13,
    marginTop: 10,
    marginBottom: 10,
  },
  text3: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#666666",
    fontSize: 14,
  },
  text4: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#333333",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text5: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FF7601",
    fontSize: 20,
    fontWeight: "bold",
  },
  text6: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#888888",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.8,
  },
  text7: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#333333",
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 10,
  },
  icon: {
    color: "#FF7601",
    fontSize: 20,
    paddingRight: 10,
  },
  style1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  btn1: {
    borderRadius: 8,
    color: "#FFFFFF",
    textTransform: "none",
    fontFamily: '"Open Sans",sans-serif',
    backgroundColor: "#FF7601",
  },
  btn2: {
    borderRadius: 15,
    color: "#FFFFFF",
    textTransform: "none",
    marginRight: 10,
    fontFamily: '"Open Sans",sans-serif',
  },
  style2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  style3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  style4: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  box1: {
    width: 10,
    paddingRight: 5,
    paddingLeft: 5,
    color: "#333333",
  },
  teamimage: {
    backgroundColor: "#fff",
    height: 120,
    width: 120,
    borderRadius: "10px",
  },
  avatar: {
    height: "60px",
    width: "60px",
    borderRadius: "50%",
  },
}));

function handleNull(val) {
  return val || " --";
}

const HouseDetailPage = (props) => {
  const [nameFeedback, setNameFeedback] = useState("");
  const [mobile, setMobile] = useState("");
  const [emailFeedback, setEmailFeedback] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [otp, setOtp] = useState("");
  const [enableOtpField, setEnableOtpField] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  const { item } = props;
  const dispatch = useDispatch();
  let query = useQuery();
  const [viewDetails, setViewDetails] = React.useState(false);
  let token = query.get("token");
  const [PropertyDetail, setPropertyDetail] = React.useState({});
  debugger;
  const propertyListItem = useSelector((state) => state.PropertyDetail.data);
  const [bookNow, setBookNow] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [message, setMessage] = useState("");
  const [isvisit, setIsvisit] = React.useState("yes");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  console.log("PropertyDetail", PropertyDetail);
  console.log("item", item);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const isbookNowActive = localStorage.getItem("bookNow");
    // console.log("isBookNow", typeof isbookNowActive, isbookNowActive);
    let userDetails = localStorage.getItem("user");
    if (isbookNowActive === "true" && userDetails) {
      setBookNow(true);
      // console.log('setBookNow(true);', bookNow);
      localStorage.setItem("bookNow", false);
    }
    dispatch(PropertyAction.ResetPropertyDetail());
  }, []);
  const pId = location?.state;
  debugger;
  const { isFavorite: isFavoriteState } = propertyListItem?.data || {
    isFavorite: false,
  };
  useEffect(() => {
    debugger;
    reset();
    let reqData = {
      propertyId: location?.state,
      // || localStorage.getItem("pid")
      // propertyId: "6125373540f10f2712e43db5"
    };
    // console.log('GetPropertyDetailRequestAsync');
    dispatch(PropertyAction.GetPropertyDetailRequestAsync(reqData));
  }, [propertyDetail, pId, isFavoriteState]);
  const reset = () => {
    setVerifyLoader(false);
    setIsOtpVerified(false);
    setEnableOtpField(false);
    setMobile("");
    setOtp("");
    setNameFeedback("");
    setEmailFeedback("");
    setMessage("");
    setViewDetails(false);
    setPropertyDetail({});
  };
  const inputChange = (e) => {
    let { name, value } = e.target;
    setOtp(value);
    if (name === "otp" && value.length === 6 && !isOtpVerified) {
      checkOtpValidOrNot(value);
    }
  };
  if (propertyListItem) {
    if (viewDetails === false) {
      console.log(propertyListItem);
      setViewDetails(true);
      setPropertyDetail(propertyListItem.data);
      setReviews(propertyListItem?.data?.review || []);
      console.log("review ", propertyListItem?.data?.review);
    }
  }

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const otpHandler = async () => {
    const cookie =
      "connect.sid=s%3AOTR7JRcRLkCbykuoWLRX4yOvqEZu20Is.4utrypcpaXicNe3A0foHiWeVNP8fQDryd6%2FdCibio%2BI";
    const authorization =
      "Bearer eyJhbGciOiJIUzI1NiJ9.VmlrcmFtSmVldFNpbmdoSkk.MaACpq-fK6F02rVz3vEAUgAYvTqDAEVKpq9zNbmWCPs";
    try {
      setVerifyLoader(true);
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/otp/createOTP",
        { mobile: mobile },
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

  const checkOtpValidOrNot = async (value) => {
    try {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/otp/verifyOTP",
        { mobile: mobile, otp: value },
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      if (response.status) {
        setIsOtpVerified(true);
        dispatch(Snackbar.showSuccessSnackbar("Otp Verified SuccessFully"));
      } else {
        setIsOtpVerified(false);
        dispatch(Snackbar.showFailSnackbar("Please type Valid otp."));
      }
    } catch (error) {
      setIsOtpVerified(false);
      dispatch(
        Snackbar.showFailSnackbar(
          "We are facing some issue Please try again later."
        )
      );
    }
  };

  const setDefaultReview = () => {
    setName("");
    setEmail("");
    setComment("");
    setRating(0);
  };

  const submitReview = async (payload) => {
    try {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/review/createReviewRequest",
        payload,
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );

      if (!response || response.error) {
        console.log("error submiting review ", response.message);
        return;
      }

      const reviewList = [
        {
          name,
          email,
          rating,
          comment,
        },
        ...reviews,
      ];
      setReviews(reviewList);
      setDefaultReview();
    } catch (e) {
      console.log("error::submitReview::", e);
    }
  };
  const handleData = (e) => {
    const formData = {
      propertyId: PropertyDetail._id,
      name: nameFeedback,
      email: emailFeedback,
      phone: mobile,
      message: message,
      isVisit: isvisit === "yes",
      // type: type,
      // propertyname: propertyname,
    };
    console.log("formData", formData);
    dispatch(CallbackRequestAction.CallbackRequestRequestAsync(formData));
    // toast.success('Request Sent successfully', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
    setNameFeedback("");
    setMobile("");
    setEmailFeedback("");
    // setTime("");
    setIsOtpVerified(false);
    setMessage("");
    setIsvisit("yes");
    setOtp("");
    setOpen(false);
    reset();
  };
  const updateSelection = (event) => {
    setIsvisit(event.target.value);
  };
  const onReviewSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !comment || !rating) {
      return;
    }

    const propertyId = PropertyDetail._id;

    const payload = {
      name,
      email,
      comment,
      rating,
      propertyId,
    };

    await submitReview(payload);
    //TODO
    console.log("name,email.comment", name, email, comment);
  };

  const closeBookNow = () => {
    setBookNow(false);
  };
  const createImagePath = (data) => {
    let imgs = data.imgs;
    let itemsfor = data.value;
    if (!imgs || imgs.length == 0) {
      return [
        {
          original: "no-image-available-icon-6.png",
          thumbnail: "no-image-available-icon-6.png",
          description: "",
        },
      ];
    } else {
      return imgs.map((imgInfo) => {
        return {
          imageFor: itemsfor,
          original: ApiClient.SERVER_ADDRESS + "/" + imgInfo.path,
          thumbnail: ApiClient.SERVER_ADDRESS + "/" + imgInfo.path,
          description: "",
        };
      });
    }
  };
  let Images = [],
    imagesData = [],
    masterPlan = [],
    floorPlan = [],
    propertyPlan = [];

  if (viewDetails) {
    let mainImage = PropertyDetail?.images?.mainImage || [];
    let exteriorView = PropertyDetail?.images?.exteriorView || [];
    let livingRoom = PropertyDetail?.images?.livingRoom || [];
    let badrooms = PropertyDetail?.images?.badrooms || [];
    let bathrooms = PropertyDetail?.images?.bathrooms || [];
    let kitchen = PropertyDetail?.images?.kitchen || [];
    let locationMap = PropertyDetail?.images?.locationMap || [];
    let other = PropertyDetail?.images?.other || [];

    Images = [
      ...mainImage,
      ...exteriorView,
      ...livingRoom,
      ...badrooms,
      ...kitchen,
      ...bathrooms,
      ...locationMap,
      ...other,
    ];
    let masterPlanImages = PropertyDetail?.images?.masterPlan;
    let floorPlanImages = PropertyDetail?.images?.floorPlan;
    masterPlan = createImagePath({
      imgs: masterPlanImages,
      value: "Master Plan",
    });
    floorPlan = createImagePath({ imgs: floorPlanImages, value: "Floor Plan" });
    imagesData = createImagePath({ imgs: Images, value: null });
    propertyPlan = [...masterPlan, ...floorPlan];
  }
  const handleFavourite = async (itemId, isFavorite, e) => {
    debugger;
    e.stopPropagation();
    console.log(e);
    let userDetails = localStorage.getItem("user");
    if (!userDetails) {
      window.location.href = "/signin";
    }
    const endPoint = isFavorite ? "removeFromWishList" : "addToWishList";
    try {
      userDetails = JSON.parse(userDetails);
      const body = {
        userId: userDetails._id,
        propertyId: itemId,
      };
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        `/users/${endPoint}`,
        body,
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );

      dispatch(Snackbar.showSuccessSnackbar(response.message));
      let reqData = {
        propertyId: location?.state,
        // || localStorage.getItem("pid")
        // propertyId: "6125373540f10f2712e43db5"
      };
      // console.log('GetPropertyDetailRequestAsync');
      dispatch(PropertyAction.GetPropertyDetailRequestAsync(reqData));
    } catch (error) {
      console.error("this is the error::", error);
      dispatch(
        Snackbar.showFailSnackbar(
          "We are facing some issue Please try again later."
        )
      );
    }
  };
  console.log("property details *** ", PropertyDetail);
  return (
    <div style={{ background: "#F7F7F7" }}>
      <PageBanner
        bgImage={bannerImage}
        title="Property"
        currentPage="PROPERTY DETAIL"
      />
      {/* <Gallery /> */}
      {viewDetails ? (
        <Container>
          <Paper elevation={1} style={{ padding: 20, marginTop: 20 }}>
            <Grid container>
              <Grid item xs={12} md={8} className={classes.style2}>
                <Typography className={classes.text7}>
                  {PropertyDetail?.nameOfProject}
                </Typography>
                <Typography
                  style={{
                    textTransform: "capitalize",
                    backgroundColor: "#00afb8",
                    padding: "3px 7px",
                    borderRadius: 5,
                    fontSize: 10,
                    color: "#fff",
                  }}
                >
                  FOR {PropertyDetail?.for}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} className={classes.style3}>
                <Typography className={classes.text3}>Starts From</Typography>
                <Box className={classes.box1}>/</Box>
                <Typography className={classes.text5}>
                  {PropertyDetail?.price?.expectedPrice}
                </Typography>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 10 }}>
              <Grid item xs={12} md={8} className={classes.style2}>
                <LocationOnIcon
                  style={{
                    color: "#FF7601",
                    fontSize: 20,
                    padding: 0,
                    marginRight: 8,
                  }}
                />
                <Typography className={classes.text3}>
                  {PropertyDetail?.address?.latitude}{" "}
                  {PropertyDetail?.address?.longitude}{" "}
                  {PropertyDetail?.address?.address}{" "}
                  {PropertyDetail?.address?.city}{" "}
                  {PropertyDetail?.address?.State}{" "}
                  {PropertyDetail?.address?.pinCode}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                className={classes.style3}
                style={{ flexDirection: "column", alignItems: "flex-end" }}
              >
                <div
                  class="fs-2 mb-3"
                  onClick={(e) =>
                    handleFavourite(
                      PropertyDetail?._id,
                      PropertyDetail?.isFavorite,
                      e
                    )
                  }
                >
                  {!PropertyDetail?.isFavorite && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="44"
                      fill="red"
                      class="bi bi-heart"
                      style={{
                        position: "relative",
                        right: "5",
                        top: "5",
                        cursor: "pointer",
                      }}
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  )}
                  {PropertyDetail?.isFavorite && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="44"
                      fill="red"
                      class="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                      style={{
                        position: "relative",
                        right: "5",
                        top: "5",
                        cursor: "pointer",
                      }}
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      ></path>
                    </svg>
                  )}
                </div>
                <br />
                <Rating
                  name="half-rating-read"
                  defaultValue={PropertyDetail?.rating}
                  precision={0.5}
                  value={propertyDetail?.rating}
                  readOnly
                />
              </Grid>
              <Grid item xs={12} md={12} style={{ marginTop: 20 }}>
                <Button
                  variant="contained"
                  className={`${classes.btn2} btn-book-online`}
                  onClick={() => {
                    if (!localStorage.getItem("user")) {
                      localStorage.setItem("bookNow", true);
                      localStorage.setItem("pid", location?.state);
                      return props.history.push("/signin");
                    }
                    setBookNow(true);
                    console.log("book now clicked");
                  }}
                >
                  {APP_CONSTANTS.btnBookNowText}
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={1} style={{ padding: 20, marginTop: 20 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} className={classes.style4}>
                <CarouselSlider images={imagesData} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography className={classes.text7}>
                  {" "}
                  Property Brief
                </Typography>
                <Typography
                  className={classes.text3}
                  style={{ lineHeight: "2.3em" }}
                >
                  {/* Vishal Construction Company is a Jaipur based construction company which today is a renowned name in providing best in class real estate services to its clients located all over India. Vishal Construction Company specializes in its area of work wherein they are expert in the real estate services, construction process of housing, commercial and other types of properties. They majorly serve clientele of Rajasthan, Hyderabad, Kolkata and other metro cities of India. Vishal Construction Company has a long-standing reputation wherein they deliver excellence catering to services and workmanship. They believe in providing quality projects with timely delivery. */}
                  {HtmlParser(handleNull(PropertyDetail?.projectDescription))}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Grid container mt={2} spacing={2}>
            <Grid
              item
              xs={12}
              md={8}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <InfoCard item={{ title: "Facts and Features" }}>
                <Grid container>
                  <Grid item xs={12} md={3}>
                    <FactAndFeature
                      icon={"fa-bed"}
                      title="BEDROOMS"
                      value={handleNull(PropertyDetail?.bedrooms)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FactAndFeature
                      icon={"fa-bath"}
                      title="BATHROOMS"
                      value={handleNull(PropertyDetail?.bathrooms)}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FactAndFeature
                      icon={"fa-university"}
                      title="BALCONY"
                      value={handleNull(PropertyDetail?.balconies)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FactAndFeature
                      icon={"fa-check-circle"}
                      title="STATUS"
                      value={handleNull(PropertyDetail?.possessionStatus)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FactAndFeature
                      icon={"fa-gift"}
                      title="FURNISHING"
                      value={handleNull(PropertyDetail?.furnishedStatus)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FactAndFeature
                      icon={"fa-home"}
                      title="PROPERTY TYPE"
                      value={handleNull(PropertyDetail?.pType)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FactAndFeature
                      icon={"fa-calculator"}
                      title="TRANSACTION TYPE"
                      value={handleNull(PropertyDetail?.transactionType)}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FactAndFeature
                      icon={"fa-bars"}
                      title="TOTAL FLOOR"
                      value={`${handleNull(
                        PropertyDetail?.floorNo
                      )}/${handleNull(PropertyDetail?.totalFloors)}`}
                    />
                  </Grid>
                </Grid>
              </InfoCard>
              <InfoCard item={{ title: "Property Details" }}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <Typography className={classes.text1}>
                      Property Code : {handleNull(PropertyDetail?.propertyCode)}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <Typography className={classes.text1}>
                      Property Price :{" "}
                      {handleNull(PropertyDetail?.price?.expectedPrice)}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <Typography className={classes.text1}>
                      Guard Room:{" "}
                      {PropertyDetail?.gaurdRoom == true ? "Yes" : "No"}
                    </Typography>
                    {/* <Typography className={classes.text1}>
                      Garages: 1
                    </Typography> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <Typography className={classes.text1}>
                      Property status : For {handleNull(PropertyDetail?.for)}
                    </Typography>
                  </Grid>
                  {PropertyDetail?.propertyDetails.map((prop) => {
                    return (
                      <Grid
                        key={prop.key}
                        item
                        xs={12}
                        md={4}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <Typography className={classes.text1}>
                          {prop.key} : {prop.Value}
                        </Typography>
                      </Grid>
                    );
                  })}
                </Grid>
              </InfoCard>

              <InfoCard item={{ title: "Amenities" }}>
                <Grid container>
                  {(PropertyDetail?.amenities || []).map((amenities) => {
                    debugger;
                    return (
                      <Grid item xs={12} md={4}>
                        <Aminities
                          icon={""}
                          title={
                            amenities[0]?.toUpperCase() +
                            (amenities[0] ? amenities.slice(1) : "")
                          }
                        />
                      </Grid>
                    );
                  })}
                  {/* {PropertyDetail?.amenities?.basketballcourt ? (
                    <Grid item xs={12} md={4}>
                      <Aminities icon={familyIcon} title="Basketball Court" />
                    </Grid>
                  ) : null}
                  {PropertyDetail?.amenities?.airConditioned ? (
                    <Grid item xs={12} md={4}>
                      <Aminities icon={yearIcon} title="Air Conditioned" />
                    </Grid>
                  ) : null}
                  {PropertyDetail?.amenities?.swimmingPool ? (
                    <Grid item xs={12} md={4}>
                      <Aminities icon={familyIcon} title="Swimming Pool" />
                    </Grid>
                  ) : null}
                  {PropertyDetail?.amenities?.noSmokingZone ? (
                    <Grid item xs={12} md={4}>
                      <Aminities icon={yearIcon} title="No Smoking Zone" />
                    </Grid>
                  ) : null}
                  {PropertyDetail?.amenities?.gym ? (
                    <Grid item xs={12} md={4}>
                      <Aminities icon={familyIcon} title="Gym" />
                    </Grid>
                  ) : null}
                  {PropertyDetail?.amenities?.petFriendly ? (
                    <Grid item xs={12} md={4}>
                      <Aminities icon={yearIcon} title="Pet Friendly" />
                    </Grid>
                  ) : null}
                  {PropertyDetail?.amenities?.freeParkingOnPremises ? (
                    <Grid item xs={12} md={4}>
                      <Aminities
                        icon={familyIcon}
                        title="Free Parking on premises"
                      />
                    </Grid>
                  ) : null}
                  {PropertyDetail?.amenities?.wheelchairFriendly ? (
                    <Grid item xs={12} md={4}>
                      <Aminities icon={yearIcon} title="Wheelchair Friendly" />
                    </Grid>
                  ) : null}
                  {PropertyDetail?.amenities?.homeTheater ? (
                    <Grid item xs={12} md={4}>
                      <Aminities icon={yearIcon} title="Home Theater" />
                    </Grid>
                  ) : null} */}
                </Grid>
              </InfoCard>
              <InfoCard item={{ title: "Price Details" }}>
                <Grid container>
                  {Object.keys(PropertyDetail?.price || []).map((priceInfo) => {
                    if (
                      priceInfo === "_id" ||
                      priceInfo === "propertyId" ||
                      priceInfo === "priceIncludes" ||
                      priceInfo === "__v" ||
                      priceInfo === "created" ||
                      priceInfo === "updated"
                    ) {
                      return null;
                    }

                    return (
                      <Grid item xs={12} md={4}>
                        <Grid
                          container
                          style={{ marginTop: 10, marginBottom: 10 }}
                        >
                          <Grid item xs={12} md={12} className={classes.style2}>
                            <Typography className={classes.text1}>
                              {priceInfo} :{" "}
                              {handleNull(PropertyDetail?.price[priceInfo])}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </InfoCard>
              <Paper elevation={1} style={{ padding: 20, marginTop: 20 }}>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Typography className={classes.text4}>
                      Property Plan
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12} className={classes.style4}>
                    <Box className="plan-carousel-wrapper">
                      {/* <CarouselSlider images={masterPlan} /> */}
                      <OwlCarousel
                        className="owl-theme plan-carousel"
                        {...options}
                      >
                        {(propertyPlan || []).map((plan, i) => (
                          <div className="plan-item" key={i}>
                            <a
                              className="plan-download"
                              href={plan.original}
                              download
                              target="_blank"
                            >
                              <i class="fa fa-download"></i>
                            </a>
                            <div
                              data-fancybox="dialog"
                              data-src={plan.original}
                            >
                              <img className="img" src={plan.original} />
                            </div>
                            <p>{plan.imageFor}</p>
                          </div>
                        ))}
                      </OwlCarousel>
                    </Box>
                  </Grid>
                  <Box className="download-all">
                    <button className="btn btn-secondary">Download all</button>
                  </Box>
                </Grid>
              </Paper>
              {/* {Reviews Component} */}
              <InfoCard
                style={{ marginBottom: "40px" }}
                item={{ title: "Reviews" }}
                reviewCount={
                  PropertyDetail?.review?.length != 0
                    ? PropertyDetail?.review?.length
                    : "0"
                }
              >
                {(reviews || []).map((review, i) => (
                  <Paper elevation={0} style={{ borderRadius: 20 }}>
                    <Grid
                      key={i}
                      container
                      style={{
                        backgroundColor: "whitesmoke",
                        padding: 20,
                        borderRadius: 20,
                        marginTop: 20,
                      }}
                    >
                      {/* <Grid item md={2}>
                      <Box style={{ textOverflow: 'ellipsis', overflow: 'hidden', fontSize: 10, justifyContent: 'center' }} >
                        <Box style={{ display: "flex", justifyContent: 'center' }}> <img className={classes.teamimage} src={'no-image-available-icon-6.png'} className={classes.avatar} alt='' />
                        </Box>
                        <Box style={{ textAlign: 'center', width: '100%' }}>
                          {review.name}
                        </Box>
                      </Box>
                    </Grid> */}
                      {/* <Grid item md={10}> */}
                      <Grid item md={12}>
                        <h3>{review.name}</h3>
                        {/* <div>{review.email}</div> */}
                        <p>
                          <h6>
                            <Moment format="MMM DD, YYYY">
                              {review.created}
                            </Moment>
                          </h6>
                        </p>
                        <Rating
                          name="half-rating-read"
                          style={{ marginBottom: 15, marginTop: 10 }}
                          defaultValue={0}
                          precision={0.5}
                          value={review.rating || 0}
                        />
                        <Box mt={1} style={{ fontSize: 14 }}>
                          {review.comment}
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </InfoCard>
              {/* {Reviews Form} */}
              <Grid
                item
                xs={12}
                md={12}
                style={{ marginTop: 20, marginBottom: 20 }}
              >
                <Paper style={{ padding: 20 }}>
                  <Grid container>
                    <Grid item xs={12} md={12} className={classes.style1}>
                      <Typography className={classes.text4}>
                        Rate us and Write a Review
                      </Typography>
                      <Typography className={classes.text1}>
                        Your rating for this listing:
                      </Typography>
                      <form
                        onSubmit={(e) => onReviewSubmit(e)}
                        style={{ width: "100%" }}
                      >
                        <Rating
                          name="review-rating"
                          onChange={(event, newValue) => setRating(newValue)}
                          style={{ marginBottom: 15 }}
                          precision={0.5}
                          value={rating}
                        />
                        <Container style={{ display: "flex", padding: 0 }}>
                          <Grid md={6}>
                            <TextField
                              label="Your Name *"
                              fullWidth
                              variant="outlined"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              style={{ marginBottom: 15 }}
                            ></TextField>
                          </Grid>
                          <Grid md={6}>
                            <TextField
                              label="Email *"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              fullWidth
                              variant="outlined"
                              style={{ marginBottom: 15 }}
                            ></TextField>
                          </Grid>
                        </Container>
                        <TextField
                          id="filled-multiline-static"
                          label="Comment *"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          multiline
                          rows={2}
                          fullWidth
                          defaultValue=""
                          variant="outlined"
                          style={{ marginBottom: 15 }}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          className={classes.btn1}
                        >
                          Submit
                        </Button>
                      </form>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <Grid container>
                <Grid item item xs={12} md={12} style={{ marginTop: 20 }}>
                  <Paper style={{ padding: 20 }}>
                    <Grid container>
                      <Grid item xs={12} md={12} className={classes.style1}>
                        <Box
                          item
                          xs={12}
                          md={12}
                          className={classes.box1}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <Typography>Location</Typography>
                          <Typography>
                            <Button
                              variant="contained"
                              className={classes.btn1}
                            >
                              <a
                                target="_blank"
                                style={{
                                  color: "#fff",
                                  textDecoration: "none",
                                }}
                                href={`https://www.google.com/maps/search/?api=1&query=${PropertyDetail?.address?.latitude},${PropertyDetail?.address?.longitude}`}
                                class="location-map"
                              >
                                View Map <i class="far fa-map-marker-alt"></i>
                              </a>
                            </Button>
                          </Typography>
                        </Box>
                        <Box
                          item
                          className={classes.box1}
                          style={{ display: "flex", width: "100%" }}
                        >
                          <Typography
                            xs={6}
                            md={6}
                            style={{ flexBasis: "20%" }}
                            className={classes.text1}
                          >
                            Address :
                          </Typography>
                          <Typography xs={6} md={6} className={classes.text1}>
                            {handleNull(PropertyDetail?.address?.address)}
                          </Typography>
                        </Box>
                        <Box
                          item
                          className={classes.box1}
                          style={{ display: "flex", width: "100%" }}
                        >
                          <Typography
                            style={{ flexBasis: "25%" }}
                            xs={6}
                            md={6}
                            className={classes.text1}
                          >
                            State/county :
                          </Typography>
                          <Typography xs={6} md={6} className={classes.text1}>
                            {handleNull(PropertyDetail?.address?.State)}
                          </Typography>
                        </Box>
                        {/* <Typography className={classes.text1}>
                          Neighborhood
                        </Typography> */}
                        <Box
                          item
                          className={classes.box1}
                          style={{ display: "flex", width: "100%" }}
                        >
                          <Typography
                            style={{ flexBasis: "32%" }}
                            xs={6}
                            md={6}
                            className={classes.text1}
                          >
                            Zip/Postal Code :
                          </Typography>
                          <Typography xs={6} md={6} className={classes.text1}>
                            {handleNull(PropertyDetail?.address?.pinCode)}
                          </Typography>
                        </Box>
                        {/* <Typography className={classes.text1}>
                          Country
                        </Typography> */}
                        <Box
                          item
                          className={classes.box1}
                          style={{ display: "flex", width: "100%" }}
                        >
                          <Typography
                            style={{ flexBasis: "10%" }}
                            xs={6}
                            md={6}
                            className={classes.text1}
                          >
                            City :
                          </Typography>
                          <Typography xs={6} md={6} className={classes.text1}>
                            {handleNull(PropertyDetail?.address?.city)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                {/* <Grid item item xs={12} md={12} style={{marginTop: 20}}>
                    <Paper style={{padding: 20}}>
                        <Grid container>
                            <Grid item xs={12} md={12} className={classes.style1}>
                                <Typography className={classes.text4}>Property Brief</Typography>
                                <Typography className={classes.text6}>
                                    Vishal Construction Company is a Jaipur based construction
                                    company which today is a renowned name in providing best in
                                    class real estate services to its clients located all over
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid> */}
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{ marginTop: 20, marginBottom: 20 }}
                >
                  <Paper style={{ padding: 20 }}>
                    <Grid container>
                      <Grid item xs={12} md={12} className={classes.style1}>
                        <Typography className={classes.text4}>
                          Request A Call Back
                        </Typography>
                        <TextField
                          label="Your Name"
                          fullWidth
                          name="Name"
                          value={nameFeedback}
                          onChange={(e) => setNameFeedback(e.target.value)}
                          variant="outlined"
                          style={{ marginBottom: 15 }}
                        ></TextField>
                        <TextField
                          label="Email"
                          fullWidth
                          type="email"
                          name="Email"
                          value={emailFeedback}
                          onChange={(e) => {
                            setEmailFeedback(e.target.value);
                            setEmailValid(e.target.value.includes("@"));
                          }}
                          variant="outlined"
                          style={{ marginBottom: 15 }}
                        ></TextField>

                        <TextField
                          label="Message"
                          multiline
                          fullWidth
                          variant="outlined"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          style={{ marginBottom: 15 }}
                        ></TextField>
                        <Typography className={classes.text1}>
                          Request a Site Visit
                        </Typography>
                        <RadioGroup
                          aria-label="gender"
                          name="gender1"
                          row
                          value={isvisit}
                          onChange={updateSelection}
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>

                        <TextField
                          label="Phone"
                          fullWidth
                          name="Phone"
                          disabled={isOtpVerified}
                          type="number"
                          min="1000000"
                          max="9999999999"
                          value={mobile}
                          onChange={(e) => {
                            if (enableOtpField) {
                              setEnableOtpField(false);
                            }
                            if (e.target.value.length <= 10)
                              setMobile(e.target.value);
                          }}
                          variant="outlined"
                          style={{ marginBottom: 15 }}
                        ></TextField>
                        {
                          mobile.length === 10 &&
                            nameFeedback.length > 0 &&
                            emailValid &&
                            !enableOtpField && (
                              <Button
                                style={{ width: "23%" }}
                                onClick={otpHandler}
                                variant="contained"
                                style={{ marginBottom: 15 }}
                              >
                                Verify
                              </Button>
                            )
                          // : (
                          //   isOtpVerified && (
                          //     <div onClick={reset}>
                          //       {" "}
                          //       <EditIcon />{" "}
                          //     </div>
                          //   )
                          // )
                        }
                        {enableOtpField &&
                          nameFeedback.length > 0 &&
                          emailValid && (
                            <>
                              <TextField
                                className="EmiInputs"
                                placeholder="Otp"
                                fullWidth
                                style={{ marginBottom: 15 }}
                                value={otp}
                                disabled={isOtpVerified}
                                onChange={inputChange}
                                name="otp"
                                type="number"
                                variant="outlined"
                                // InputProps={{
                                //   classes: {
                                //     notchedOutline: classes.notchedOutline,
                                //   },
                                // }}
                                // InputLabelProps={{
                                //   style: { color: "#FFFFFF" },
                                // }}
                              />
                              {!isOtpVerified && (
                                <Button
                                  style={{ width: "23%" }}
                                  onClick={otpHandler}
                                  variant="contained"
                                  style={{ marginBottom: 15 }}
                                >
                                  Resend OTP
                                </Button>
                              )}
                            </>
                          )}
                        {/* <Button
                          disabled={
                            !isOtpVerified ||
                            name.length === 0 ||
                            !emailValid 
                            
                          }
                          onClick={(e) => handleData(e)}
                          className={classes.btn1}
                        >
                          Submit
                        </Button> */}

                        <Button
                          variant="contained"
                          disabled={
                            !isOtpVerified ||
                            nameFeedback.length === 0 ||
                            !emailValid
                          }
                          onClick={(e) => handleData(e)}
                          className={classes.btn1}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                  <Paper elevation={1} style={{ padding: 20, marginTop: 20 }}>
                    <Grid container>
                      <Grid item xs={12} md={12} className={classes.style2}>
                        <LocationOnIcon
                          style={{
                            color: "#FF7601",
                            fontSize: 20,
                            padding: 0,
                            marginRight: 8,
                          }}
                        />
                        <Typography className={classes.text3}>
                          {PropertyDetail?.address?.latitude}{" "}
                          {PropertyDetail?.address?.longitude}{" "}
                          {PropertyDetail?.address?.address}{" "}
                          {PropertyDetail?.address?.city}{" "}
                          {PropertyDetail?.address?.State}{" "}
                          {PropertyDetail?.address?.pinCode}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        className="map-container"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          overflow: "hidden",
                        }}
                      >
                        <MapContainer
                          markers={[
                            {
                              lat: PropertyDetail?.address?.latitude,
                              lng: PropertyDetail?.address?.longitude,
                            },
                          ]}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      ) : (
        NoDataAvailable("Details Unavailable")
        // <CircularProgress />
      )}
      <BookNowModal
        open={bookNow}
        detail={PropertyDetail}
        closeBookNow={closeBookNow}
      />
    </div>
  );
};

export default withRouter(HouseDetailPage);
