import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./outer-carousel-slider.css";
import CircularProgress from "@mui/material/CircularProgress";
import PropertyViewCard from "../property-view-card";
import {useDispatch} from "react-redux";
import {
  Typography,
  Grid,
  Container,
  makeStyles,
  Button,
  Box,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalHotelIcon from "@material-ui/icons/LocalHotel";
import { Link as RouterLink } from "react-router-dom";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import BathtubIcon from "@material-ui/icons/Bathtub";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
// import './property-view-card.css';
import InnerCarouselSlider from "../inner-carousel-slider";
import { CustomNoRowsOverlay } from "../../components/no-data-found/no-data-found";
import ApiClient from "../../api-client";
import "./featured.css";
import { map } from "jquery";
import * as Snackbar from "../../redux/actions/SnackbarActions";
const useStyles = makeStyles((theme) => ({}));

const settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  initialSlide: 0,
  draggable: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

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

const OuterCarouselSlider = (props) => {
  // console.log("property props", props);
  const dispatch = useDispatch();
  let total = 0;
  let data = [];
  if (props && props.items) {
    total = props.items.total;
    data = props.items.data;
  }
  console.log("data",data)
  const classes = useStyles();
  const handleFavourite = async (itemId,isFavorite, e) => {
    debugger
    e.stopPropagation();
    console.log(e);
    let userDetails = localStorage.getItem("user");
    if (!userDetails) {
      window.location.href = "/signin";
    }
    const endPoint = isFavorite ? "removeFromWishList" : "addToWishList";
    try {
      userDetails=JSON.parse(userDetails)
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
      props.onChange()
    } catch (error) {
      console.error("this is the error::", error);
      dispatch(
        Snackbar.showFailSnackbar(
          "We are facing some issue Please try again later."
        )
      );
    }
  };
  return (
    <div>
      {total > 0 ? (
        <Slider
          items={Math.min(3, total)}
          className="property-carousel"
          {...settings}
        >
          {data.map((item, i) => {
            const {
              _id,
              userId,
              propertyDetails,
              status,
              iAm,
              pType,
              postingAs,
              nameOfProject,
              propertTag,
              created,
              updated,
              __v,
              features,
              images,
              isFavorite
            } = item;
            // const img = images && images[0]?.mainImage && images[0]?.mainImage[0]?.path ? ApiClient.SERVER_ADDRESS + "/" + images[0]?.mainImage[0]?.path : 'no-image-available-icon-6.png';
            // console.log("img path", img, images);
            const propertyFor = item.for;

            let imgs = images[0]?.mainImage;

            if (!imgs || imgs.length == 0) {
              imgs = ["no-image-available-icon-6.png"];
            } else {
              imgs = imgs.map((imgInfo) => {
                return ApiClient.SERVER_ADDRESS + "/" + imgInfo.path;
              });
            }

            return (
              <Box key={i} className="property-item" component={RouterLink}
              to={{
                pathname: "/home-detail",
                state: _id,
              }}
              style={{cursor:"pointer"}}
              >
                <Grid contaienr className="property-wrap">
                  {/* <InnerCarouselSlider /> */}
                  <Grid
                    className="property-image"
                    style={{ position: "relative" }}
                  >
                    {propertTag ? (
                      <span class="featured">{propertTag}</span>
                    ) : null}
                    {/* <img className="img" src={process.env.PUBLIC_URL + '/property_img3.jpeg'} /> */}
                    <Slider {...settings1}>
                      {imgs.map((imgPath) => {
                        return (
                          <Box className="property-image-thumb">
                            <img src={imgPath} alt="" style={{cursor:"pointer"}} />
                          </Box>
                        );
                      })}
                    </Slider>
                    <div
                      class="fs-2 mb-3"
                      onClick={e=>{e.preventDefault(); e.stopPropagation();handleFavourite(_id,isFavorite, e)}}
                      // onClick={(e) => handleFavourite(_id,isFavorite, e)}
                    >
                      {!isFavorite && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="44"
                          height="44"
                          fill="red"
                          class="bi bi-heart"
                          style={{
                            position: "absolute",
                            right: "5",
                            top: "5",
                            cursor: "pointer",
                            
                          }}
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                      )}
                      {isFavorite && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="44"
                          height="44"
                          fill="red"
                          class="bi bi-heart-fill"
                          viewBox="0 0 16 16"
                          style={{
                            position: "absolute",
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
                  </Grid>

                  <Grid className="property-summery">
                    <Box component="span" className="property-tag">
                      {pType}
                    </Box>
                    <Typography variant="h3" className="property-title">
                      {nameOfProject}
                    </Typography>

                    <Grid container className="property-information">
                      <Grid item xs={6} md={6} className="property-feature">
                        <ZoomOutMapIcon />
                        <Typography>
                          {features[0]?.builtUpArea} Sq-Ft
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={6} className="property-feature">
                        <LocalHotelIcon />
                        <Typography>
                          {features[0]?.bedrooms} Bedrooms
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={6} className="property-feature">
                        <LocalHotelIcon />
                        <Typography>
                          {features[0]?.balconies} Balconies
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={6} className="property-feature">
                        <BathtubIcon />
                        <Typography>
                          {features[0]?.bathrooms} Bathroom
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container className="property-button">
                      <Box
                        className="btn btn-primary"
                        component={RouterLink}
                        to={{
                          pathname: "/home-detail",
                          state: _id,
                        }}
                      >
                        MORE DETAIL
                      </Box>
                      <Box className="btn btn-secondary">
                        <a
                          // href="tel:+91 9571647680"
                          onClick={e=>{e.preventDefault(); e.stopPropagation();window.location.href ="tel:+91 9571647680";}}
                          style={{
                            textDecoration: "none",
                            color: "ActiveCaption",
                          }}
                        >
                          CALL NOW
                        </a>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* <Grid contaienr>
                                        <Grid item style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10}}>
                                            <LocationOnIcon style={{color: '#FF7601', fontSize: 20, padding: 0, marginRight: 8}} />
                                            <Typography className={classes.text3}>{iAm}</Typography>
                                        </Grid>
                                    </Grid> */}
                </Grid>
              </Box>
            );
          })}
        </Slider>
      ) : (
        // <CustomNoRowsOverlay />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default OuterCarouselSlider;
