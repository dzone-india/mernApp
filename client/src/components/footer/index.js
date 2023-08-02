import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Container,
  makeStyles,
  Button,
  Box,
  TextField,
  IconButton,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import "./footer.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SendIcon from "@material-ui/icons/Send";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Mobilefootermenu from "../footer/footermobile";
import ApiClient from "../../api-client";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import $ from "jquery";
import * as Snackbar from "../../redux/actions/SnackbarActions";
import { useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  text1: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  text2: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  text3: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 10,
  },
  text4: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  socialBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#06AEB8",
    marginRight: 8,
    width: 30,
    height: 30,
    borderRadius: 25,
    cursor: "pointer",
  },
  footer_column1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  links: {
    cursor: "pointer",
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  const [footerDetails, setFooterDetails] = useState({});
  const [socialLinks, setSocialLinks] = useState({});
  const [detailsData, setDetailsData] = useState();
  const [locationPages, setLocationPages] = useState();
  const [bottomPages, setBottomPages] = useState();
  const [hide, setHide] = useState(true);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const company_detials = localStorage.getItem("company_detials");
    if (!company_detials) populateFooterDetails();
    else {
      setFooterDetails(JSON.parse(company_detials));
    }
    populateSocialMediaLinks();
    // populateDetailData();
    populateLocationPages();
    populateBottomPages();
  }, []);
  detailsData && console.log("detailsData", detailsData);
  locationPages && console.log("locationPages", locationPages);
  bottomPages && console.log("bottomPages", bottomPages);
  const populateSocialMediaLinks = () => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/home/getFooterSocialMedia",
        {},
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      setSocialLinks(response.data);
      localStorage.setItem("social-links", JSON.stringify(response.data));
      console.log("populateSocialMediaLinks details", response.data);
    };
    getData();
  };
  // const onBottomPageHandler = (bpIndex) => {
  //   debugger;
  //   populateDetailData(bpIndex);
  // };
  // const populateDetailData = (bpId) => {
  //   const getData = async () => {
  //     const response = await ApiClient.call(
  //       ApiClient.REQUEST_METHOD.POST,
  //       "/cms/getDetailData",
  //       { _id: bpId },
  //       {},
  //       null,
  //       false
  //     );
  //     debugger;
  //     console.log("detail data", response.data);
  //     // setDetailsData(response.data);
  //     // localStorage.setItem("social-links", JSON.stringify(response.data));
  //     // console.log("populateSocialMediaLinks details", response.data);
  //   };
  //   getData();
  // };
  const populateLocationPages = () => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/cms/getLocationPages",
        {},
        {},
        null,
        false
      );
      setLocationPages(response.data);
      // localStorage.setItem("social-links", JSON.stringify(response.data));
      // console.log("populateSocialMediaLinks details", response.data);
    };
    getData();
  };
  const populateBottomPages = () => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/cms/getBottomPages",
        {},
        {},
        null,
        false
      );
      setBottomPages(response.data);
      // localStorage.setItem("social-links", JSON.stringify(response.data));
      // console.log("populateSocialMediaLinks details", response.data);
    };
    getData();
  };

  const populateFooterDetails = () => {
    console.log("populateFooterDetails");
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/home/getFooterAddress",
        {},
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      setFooterDetails(response.data);
      localStorage.setItem("company_detials", JSON.stringify(response.data));
      // console.log('populateFooterDetails details', response);
    };
    getData();
  };
  const btnClick = () => {
    setHide(!hide);
  };

  const handleData = (e) => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/newsLetter/createNewsLetter",
        { email: email, type: "general" },
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      setEmail("");
      console.log("rere", response);
      dispatch(Snackbar.showSuccessSnackbar(response.message));
    };
    getData();
  };
  return (
    <div>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={4}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Typography className={classes.text1}>VISHAL CONSTRUCTION</Typography>
          <Grid contaienr>
            <Grid item xs={12} md={12} className={classes.footer_column1}>
              <LocationOnIcon
                style={{
                  color: "#06AEB8",
                  fontSize: 20,
                  padding: 0,
                  marginRight: 8,
                }}
              />
              <Typography className={classes.text3}>
                {footerDetails ? footerDetails.address : ""}{" "}
                {footerDetails ? footerDetails.city : ""}{" "}
                {footerDetails ? footerDetails.state : ""} -{" "}
                {footerDetails ? footerDetails.pinCode : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} className={classes.footer_column1}>
              <PhoneIphoneIcon
                style={{
                  color: "#06AEB8",
                  fontSize: 20,
                  padding: 0,
                  marginRight: 8,
                }}
              />
              <Typography className={classes.text3}>
                {footerDetails ? footerDetails.mobile : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} className={classes.footer_column1}>
              <MailOutlineIcon
                style={{
                  color: "#06AEB8",
                  fontSize: 20,
                  padding: 0,
                  marginRight: 8,
                }}
              />
              <Typography className={classes.text3}>
                {footerDetails ? footerDetails.email : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} className={classes.footer_column1}>
              <AccessTimeIcon
                style={{
                  color: "#06AEB8",
                  fontSize: 20,
                  padding: 0,
                  marginRight: 8,
                }}
              />
              <Typography className={classes.text3}>
                {footerDetails ? footerDetails.timming : ""}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Typography className={classes.text1}>POPULAR LINKS</Typography>
          <Grid
            contaienr
            style={{ width: "100%", display: "flex", marginTop: 10 }}
          >
            <Grid item xs={6} md={6}>
              <Box style={{ lineHeight: "30px" }}>
                <Typography
                  className={`${classes.text3} links`}
                  component={RouterLink}
                  to={{
                    pathname: "/",
                  }}
                >
                  Home
                </Typography>
              </Box>
              <Box style={{ lineHeight: "30px" }}>
                <Typography
                  className={`${classes.text3} links`}
                  component={RouterLink}
                  to={{
                    pathname: "/about-us",
                  }}
                >
                  About Us
                </Typography>
              </Box>
              <Box style={{ lineHeight: "30px" }}>
                <Typography
                  className={`${classes.text3} links`}
                  component={RouterLink}
                  to={{
                    pathname: "search-property-details?type=Sell",
                  }}
                >
                  Properties
                </Typography>
              </Box>
              <Box style={{ lineHeight: "30px" }}>
                <Typography
                  className={`${classes.text3} links`}
                  component={RouterLink}
                  to={{
                    pathname: "carrer",
                  }}
                >
                  Careers
                </Typography>
              </Box>
              <Box style={{ lineHeight: "30px" }}>
                <Typography
                  className={`${classes.text3} links`}
                  component={RouterLink}
                  to={{
                    pathname: "blog",
                  }}
                >
                  Blog
                </Typography>
              </Box>
              <Box style={{ lineHeight: "30px" }}>
                <Typography
                  className={`${classes.text3} links`}
                  component={RouterLink}
                  to={{
                    pathname: "/supplier-form",
                  }}
                >
                  Supplier Form
                </Typography>
              </Box>
              <Box style={{ lineHeight: "30px" }}>
                <Typography
                  className={`${classes.text3} links`}
                  component={RouterLink}
                  to={{
                    pathname: "/contact-us",
                  }}
                >
                  Contact
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              {locationPages &&
                locationPages.map((lp) => (
                  <Typography
                    className={`${classes.text3} links`}
                    component={RouterLink}
                    to={{
                      pathname: "/cms-page-details",
                      state: lp._id,
                    }}
                  >
                    {lp.pageName || ""}
                  </Typography>
                ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Typography className={classes.text1}>NEWSLETTER</Typography>
          <Typography className={classes.text3}>
            Subscribe your email to get the latest news and new offer also
            discount
          </Typography>
          <Grid container>
            <Grid
              item
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: 10,
              }}
            >
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                style={{ backgroundColor: "#FFFFFF", border: "none" }}
              />
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                  backgroundColor: "#FF7601",
                  marginLeft: 8,
                }}
              >
                <SendIcon
                  onClick={(e) => handleData(e)}
                  style={{ color: "#FFFFFF", fontSize: 20, padding: 0 }}
                />
              </Box>
            </Grid>
          </Grid>
          <Typography className={classes.text2}>Follow us on</Typography>
          <Grid container>
            <Grid
              className="social-media-group"
              item
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: 10,
              }}
            >
              <Box className={`${classes.socialBox} social_icon`}>
                <a
                  className="fixed-facebook"
                  target="_blank"
                  href={socialLinks?.facebook}
                >
                  <i class="fab fa-facebook"></i>
                  {/* <FacebookIcon style={{color: '#FFFFFF', fontSize: 20, padding: 0, }} /> */}
                </a>
              </Box>

              <Box className={`${classes.socialBox} social_icon`}>
                <a
                  className="fixed-instagrem"
                  target="_blank"
                  href={socialLinks?.instagram}
                >
                  <i class="fab fa-instagram"></i>
                  {/* <InstagramIcon style={{color: '#FFFFFF', fontSize: 20, padding: 0, }} /> */}
                </a>
              </Box>
              <Box className={`${classes.socialBox} social_icon`}>
                <a
                  className="fixed-linkedin"
                  target="_blank"
                  href={socialLinks?.linkedin}
                >
                  <i class="fab fa-linkedin"></i>
                  {/* <LinkedInIcon style={{color: '#FFFFFF', fontSize: 20, padding: 0, }} /> */}
                </a>
              </Box>
              <Box className={`${classes.socialBox} social_icon`}>
                <a
                  className="fixed-twitter"
                  target="_blank"
                  href={socialLinks ? socialLinks.twitter : ""}
                >
                  <i class="fab fa-twitter"></i>
                  {/* <TwitterIcon style={{color: '#FFFFFF', fontSize: 20, padding: 0, }} /> */}
                </a>
              </Box>

              <Box className={`${classes.socialBox} social_icon`}>
                <a
                  className="fixed-youtube"
                  target="_blank"
                  href={socialLinks ? socialLinks.youtube : ""}
                >
                  <i class="fab fa-youtube"></i>

                  {/* <YouTubeIcon style={{color: '#FFFFFF', fontSize: 20, padding: 0, }} /> */}
                </a>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        style={{ marginTop: 40, display: "flex", flexWrap: "wrap" }}
        spacing={2}
      >
        {bottomPages &&
          bottomPages.map((bp) => (
            <Grid
              xs={12}
              md={2}
              mb={2}
              component={RouterLink}
              // onClick={onBottomPageHandler.bind(this, bp._id)}
              to={{
                pathname: "/cms-page-details",
                state: bp._id,
              }}
            >
              <Typography className={classes.text4}>
                {bp.pageName || ""}
              </Typography>
            </Grid>
          ))}
        {/* <Grid xs={12} md={2}>
          <Typography className={classes.text4}>
            2BHK Flats in Jaipur
          </Typography>
        </Grid>
        <Grid xs={12} md={2}>
          <Typography className={classes.text4}>
            3BHK Flats in Jaipur
          </Typography>
        </Grid>
        <Grid xs={12} md={2}>
          <Typography className={classes.text4}>
            Property/Flats in Jaipur
          </Typography>
        </Grid>
        <Grid xs={12} md={2}>
          <Typography className={classes.text4}>
            Studio Apartments in Jaipur
          </Typography>
        </Grid>
        <Grid xs={12} md={2}>
          <Typography className={classes.text4}>Villas in Jaipur</Typography>
        </Grid> */}
      </Grid>
      <Grid container style={{ marginTop: 40 }} spacing={2}>
        <Grid
          xs={12}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography className={classes.text3}>
            © 2021 Design by Dzone India Software & Technologies Pvt. Ltd All
            Right Reserved
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        style={{ marginTop: 40 }}
        spacing={2}
        className="footerSplit"
      >
        <Mobilefootermenu />
      </Grid>
      <Box className="projectquick_action genralsticky" onClick={btnClick}>
        <ul>
          <li id="show-hidden-menu" class="animatebtn social_links">
            <i class="fas fa-external-link-alt"></i>
          </li>
          <Box
            className="hidden-menu"
            style={{
              display: hide ? "none" : "block",
            }}
          >
            <div class="fixed-social">
              <a
                href={socialLinks?.facebook}
                class="fixed-facebook"
                target="_blank"
              >
                <i class="fab fa-facebook"></i>
              </a>
              <a
                href={socialLinks ? socialLinks.twitter : ""}
                class="fixed-twitter"
                target="_blank"
              >
                <i class="fab fa-twitter"></i>
              </a>
              {/* <a href="#" class="fixed-gplus" target="_blank"><i class="fab fa-google"></i></a> */}
              <a
                href={socialLinks?.linkedin}
                class="fixed-linkedin"
                target="_blank"
              >
                <i class="fab fa-linkedin"></i>
              </a>
              <a
                href={socialLinks?.instagram}
                class="fixed-instagrem"
                target="_blank"
              >
                <i class="fab fa-instagram"></i>
              </a>
              {/* <a href="#" class="fixed-tumblr" target="_blank"><i class="fab fa-tumblr"></i></a> */}
              <a
                className="fixed-youtube"
                target="_blank"
                href={socialLinks ? socialLinks.youtube : ""}
              >
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </Box>
          <li class="animatebtn">
            {" "}
            <a href="tel:+91 9571647680">
              {" "}
              <i class="fa fa-phone-alt"></i>{" "}
            </a>{" "}
          </li>
        </ul>
      </Box>
    </div>
  );
};

export default Footer;
