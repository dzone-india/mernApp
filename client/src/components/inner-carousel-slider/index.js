import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./inner-carousel-slider.css";

import {Grid, makeStyles} from "@material-ui/core";

const InnerCarouselSlider = (props) => {
  return (
    <div style={{width: 350}}>
      <OwlCarousel items={1} className="owl-theme" loop nav={false} margin={8} autoPlay={false} dots={false}>
        <div>
          <img className="img" src={process.env.PUBLIC_URL + '/property_img3.jpeg'} />
        </div>
        <div>
          <img className="img" src={process.env.PUBLIC_URL + '/property_img3.jpeg'} />
        </div>
        <div>
          <img className="img" src={process.env.PUBLIC_URL + '/property_img3.jpeg'} />
        </div>
      </OwlCarousel>
    </div>
  );
};

export default InnerCarouselSlider;
