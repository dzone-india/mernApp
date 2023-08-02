import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
  TextField,
  Button,
} from "@material-ui/core";
import PageBanner from "../../../components/page-banner";
import "../my-account.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LocalHotelIcon from "@material-ui/icons/LocalHotel";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import BathtubIcon from "@material-ui/icons/Bathtub";
import API_ENDPOINTS from "./../../../constants/api-endpoints";
import ApiClient from "./../../../api-client/index";
import { Link, useHistory } from "react-router-dom";
import "../my-account.css";
const settings1 = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  cssEase: "linear",
};

const useStyles = makeStyles((theme) => ({}));
function handleNull(val) {
  return val || " --";
}
const MyProperty = (props) => {
  const history = useHistory();
  const [propertyList, setPropertyList] = useState([]);
  // const populatePropertyListDetails = () => {
  const propertyClickHandler = (propertyId) => {
    history.push({
      pathname: "/home-detail",
      // search: "?update=true", // query string
      state: propertyId,
    });
  };
  const getData = async () => {
    debugger;
    const user = JSON.parse(localStorage.getItem("user"));

    const response = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.USER_PROPERTY_LIST_ENDPOINT,
      { userId: user._id },
      {},
      { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
      true
    );

    setPropertyList(response?.data?.list || []);
    // console.log('About us details', aboutUsInfo, aboutSection);
  };
  // };
  useEffect(() => {
    getData();
  }, []);
  // if(property.length>0){
  //   debugger
  // }
  return (
    <div>
      <PageBanner
        bgImage={"/about_us.jpeg"}
        title="My Property"
        currentPage="My Property"
      />

      <Container>
        <Box className="content-wrapper">
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} className="sidebar-section">
              <Box className="box-item">
                <Box className="box-wrap box-border-bottom box-radius">
                  {/* <Box className="user-intro box-body">
                    <Box className="user-icon">
                      {" "}
                      <img src="images/profile-img.jpg" alt="" />{" "}
                    </Box>
                    <Box className="user-info">
                      <h4> Arjun Singh</h4>
                      <p>Permium</p>
                    </Box>
                  </Box> */}
                  <Box className="box-body p-0">
                    <ul className="sidebar-account-menu">
                      <li>
                        <Link to="/my-account">
                          {" "}
                          <i className="fas fa-house-user"></i>My Account{" "}
                        </Link>{" "}
                      </li>
                      <li>
                        {" "}
                        <Link to="/my-profile">
                          {" "}
                          <i className="far fa-user"></i>My Profile{" "}
                        </Link>{" "}
                      </li>
                      <li className="active">
                        {" "}
                        <Link to="/my-property">
                          {" "}
                          <i className="fas fa-building"></i>My Property{" "}
                        </Link>{" "}
                      </li>
                      <li>
                        {" "}
                        <Link to="/my-booking">
                          {" "}
                          <i className="far fa-list-alt"></i>My Booking{" "}
                        </Link>{" "}
                      </li>
                      <li>
                        {" "}
                        <Link to="/my-favorite">
                          {" "}
                          <i className="far fa-heart"></i>My Favorite{" "}
                        </Link>{" "}
                      </li>
                      {/* <li>
                        {" "}
                        <Link className="logout" to="#">
                          <i className="fas fa-sign-out-alt"></i>Log out
                        </Link>{" "}
                      </li> */}
                    </ul>
                  </Box>
                </Box>
              </Box>
            </Grid>
            {/* <!-- sidebar-section --> */}
            <Grid item xs={12} md={9} className="content-area">
              <Box className="content-section">
                <Box className="box-item">
                  <Box className="box-wrap box-border-bottom box-radius ">
                    <Box className="box-header">
                      <h5 className="box-title">My Property Lists</h5>
                    </Box>
                    <Box className="box-body">
                      <Grid
                        container
                        spacing={2}
                        className="my-property-wrapper"
                      >
                        {propertyList.map((property) => {
                          debugger;
                          let mainImage = property?.images[0]?.mainImage || [];
                          const exteriorView =
                            property?.images[0]?.exteriorView || [];
                          mainImage = [...mainImage, ...exteriorView];
                          return (
                            <>
                              <Grid item xs={12} sm={6} md={4}>
                                <Box className="property-item my-property-item">
                                  <Grid contaienr className="property-wrap">
                                    <Grid className="property-image">
                                      <Slider {...settings1}>
                                        {mainImage?.map((img) => (
                                          <Box className="property-image-thumb">
                                            <img
                                              src={
                                                img?.path
                                                  ? ApiClient.SERVER_ADDRESS +
                                                    "/" +
                                                    img?.path
                                                  : "/no-image-available-icon-6.png"
                                              }
                                            />
                                          </Box>
                                        ))}
                                      </Slider>
                                    </Grid>

                                    {/* <Grid className="property-image">
                                      <Slider {...settings1}>
                                        {mainImage.map((image) => {
                                          return (
                                            <Box className="property-image-thumb">
                                              <img
                                                src={
                                                  ApiClient.SERVER_ADDRESS +
                                                  "/" +
                                                  image.path
                                                }
                                              />
                                            </Box>
                                          );
                                        })}
                                      </Slider>
                                    </Grid> */}
                                    <Grid className="property-summery">
                                      <Box
                                        component="span"
                                        className="property-tag"
                                      >
                                        {property?.pType || ""}
                                      </Box>
                                      <Typography
                                        variant="h3"
                                        className="property-title"
                                      >
                                        {property?.nameOfProject || ""}
                                      </Typography>
                                      <Grid
                                        container
                                        className="property-information"
                                      >
                                        <Grid
                                          item
                                          xs={6}
                                          md={6}
                                          className="property-feature"
                                        >
                                          <Typography>
                                            BEDROOMS {property?.bedrooms}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={6}
                                          md={6}
                                          className="property-feature"
                                        >
                                          <LocalHotelIcon />
                                          <Typography>
                                            BATHROOMS {property?.bathrooms}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={6}
                                          md={6}
                                          className="property-feature"
                                        >
                                          <LocalHotelIcon />
                                          <Typography>
                                            BALCONY {property?.balconies}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={6}
                                          md={6}
                                          className="property-feature"
                                        >
                                          <BathtubIcon />
                                          <Typography>
                                            STATUS {property?.possessionStatus}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={6}
                                          md={6}
                                          className="property-feature"
                                        >
                                          <BathtubIcon />
                                          <Typography>
                                            FURNISHING{" "}
                                            {property?.furnishedStatus}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid container className="property-button">
                                      <button
                                        onClick={propertyClickHandler.bind(
                                          null,
                                          property?._id
                                        )}
                                        state={property?._id}
                                        className="btn btn-primary"
                                      >
                                        {/* <a className="btn btn-primary" to="/"> */}{" "}
                                        MORE DETAIL
                                        {/* </a> */}
                                      </button>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </Grid>
                            </>
                            // </Box>
                          );
                        })}
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            {/* <!--content-area--> */}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default MyProperty;
