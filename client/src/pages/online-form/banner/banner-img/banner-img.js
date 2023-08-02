import { Box, Container, Image } from "@material-ui/core";
import React from "react";
import BannerContent from "../banner-content/banner-content";
import "./banner-img.css";

function BannerImage() {
  return (
    <Box
      className="onlineFormHeader"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <img src={process.env.PUBLIC_URL + "/banner/bookonline.jpg"} />
      <BannerContent />
    </Box>
  );
}

export default BannerImage;
