import React, {useState} from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {Grid, Box} from '@material-ui/core';
import "./section-building-materials.css";

const options = {
  margin: 0,
  responsiveClass: true,
  nav: true,
  dots: false,
  autoplay: true,
  loop: true,
  navText: ["Prev", "Next"],
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 2,
    },
    576: {
      items: 2,
    },
    768: {
      items: 3,
    },
    992: {
      items: 4,
    }
  },
};

const SectionBM = (props) => {
  console.log("props for building material ", props.images);
  const images = props.images;
  return (

    <Grid className="building-material-wrapper" container>
      <OwlCarousel className="building-material-carousel owl-theme" {...options}>
        {(images || []).map((image, i) => {
          console.log("=> ", image);
          return <Box key={i} className="building-material-wrap">
            <img src={image.imageUrl} alt={image.name} />
            <Box className="mask mask-1"></Box>
            <Box className="mask mask-2"></Box>
            <Box className="content"><h3>{image.name}</h3></Box>
          </Box>;
        })}
      </OwlCarousel>
    </Grid>
  );

};
export default SectionBM;;