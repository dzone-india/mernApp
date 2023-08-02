import React, {useState} from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./slider.css";

import {Grid} from "@material-ui/core";

const OwlCarouselSlider = (props) => {

  const images = props.images;

  const items = props.items || 1;


  // console.log("images check", images, props, (images || []));
  return (

    <Grid className="carousel-wrapper" container>
      <OwlCarousel items={items} className="carousel-item owl-theme" loop={true} nav={false} margin={0} autoplay={true} dots={true}>
        {(images || []).map((image, i) => {
          return < div className="carousel-wrap" key={i}>
            <img className="img" src={image.imageUrl} style={props.style} alt="" />
          </div>;
        })}
      </OwlCarousel>
    </Grid >
  );

};
export default OwlCarouselSlider;