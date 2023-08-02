import { Box, Container } from "@material-ui/core";
import React from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import OnlineBooking from "../../components/online-form/online-form";
import BannerContent from "./banner/banner-content/banner-content";
import BannerImage from "./banner/banner-img/banner-img";

function BookOnline() {
  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <BannerImage />
      <OnlineBooking />
    </Box>
  );
}

export default BookOnline;
