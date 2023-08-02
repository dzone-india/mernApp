import React, { useEffect, useState, useReducer } from "react";
import {
  Typography,
  Grid,
  Container,
  makeStyles,
  Button,
  Box,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as LoginAction from "../../redux/actions/LoginAction";
import { withRouter } from "react-router-dom";
import Header from "../../components/header";
import SectionHeader from "../../components/section-header";
import SectionMap from "../../components/section-map";
import SectionBM from "../../components/section-building-materials";
import PropertyViewCard from "../../components/property-view-card";
import OwlCarouselSlider from "../../components/carousel-slider";
// import AboutUsOwlCarouselSlider from "../../components/about/index";
import DescriptionIcon from "@material-ui/icons/Description";
import ApartmentIcon from "@material-ui/icons/Apartment";
import "./home.css";
import APP_CONSTANTS from "../../constants/app-constants";
import OuterCarouselSlider from "../../components/outer-carousel-slider";
import feedbacks from "../../utils/feedbacks.json";
import SectionTabs from "../../components/section-tabs";
import SectionClient from "../../components/section-client";
import ServiceCard from "../../components/service-card";
import SectionFeedback from "../../components/section-feedback";
import Footer from "../../components/footer";
import OnlineBooking from "../../components/online-form/online-form";
import EmiCalculater from "../../components/emiCalculater/emiCalculater";
import EnquryForm from "../../components/enquryForm/enquryForm";
import CountUp, { useCountUp } from "react-countup";
import {
  statsInfo,
  aboutSectionInfo,
  servicesInfo,
  bannersInfo,
} from "./intial-content";
import ApiClient from "../../api-client/index";
import VisibilitySensor from "react-visibility-sensor";
import SearchBox from "../../components/search-box/index";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));

function reducer(state, newState) {
  return {
    ...state,
    ...newState,
  };
}

function reducer2(state, newState) {
  return [...state, ...newState];
}

const HomePage = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [stats, setStats] = useState(statsInfo);
  const [aboutSection, setAboutUsSection] = useState({});
  const [services, setServices] = useReducer(reducer, {});
  const [banners, setBanners] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const [dealingInData, setDealingInData] = useState({});
  const [building_materials, setBuildingMaterials] = useReducer(reducer2, []);
  const [showDealingInDetails, setShowDealingInDetaisl] = useState(false);

  // useEffect(() => {
  //   dispatch(LoginAction.LoginRequestAsync({}));
  // });

  useEffect(() => {
    const cookie =
      "connect.sid=s%3AOTR7JRcRLkCbykuoWLRX4yOvqEZu20Is.4utrypcpaXicNe3A0foHiWeVNP8fQDryd6%2FdCibio%2BI";
    const authorization =
      "Bearer eyJhbGciOiJIUzI1NiJ9.VmlrcmFtSmVldFNpbmdoSkk.MaACpq-fK6F02rVz3vEAUgAYvTqDAEVKpq9zNbmWCPs";
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/property/getAllPropertyForHome",
        {},
        {},
        { Cookie: cookie, Authorization: authorization },
        false
      );
      setPropertyData(response.data);
    };
    getData();

    populateBanners(cookie, authorization);

    populateAboutUsDetails(cookie, authorization);
    populateStatsInfo(cookie, authorization);

    populatedDealingInfo(cookie, authorization);

    populateServiceInfo(cookie, authorization);

    populateBuildingMaterialInfo(cookie, authorization);
  }, []);
  const onChangeHandler = () => {
    const cookie =
      "connect.sid=s%3AOTR7JRcRLkCbykuoWLRX4yOvqEZu20Is.4utrypcpaXicNe3A0foHiWeVNP8fQDryd6%2FdCibio%2BI";
    const authorization =
      "Bearer eyJhbGciOiJIUzI1NiJ9.VmlrcmFtSmVldFNpbmdoSkk.MaACpq-fK6F02rVz3vEAUgAYvTqDAEVKpq9zNbmWCPs";
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/property/getAllPropertyForHome",
        {},
        {},
        { Cookie: cookie, Authorization: authorization },
        false
      );
      setPropertyData(response.data);
    };
    getData();
  };
  const populateBuildingMaterialInfo = (cookie, authorization) => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/builder/getBuildingMaterials",
        {},
        {},
        { Cookie: cookie, Authorization: authorization },
        false
      );

      console.log("/builder/getBuildingMaterials ", response);

      const buildingMaterialImgInfo = [];
      const baseUrl = ApiClient.SERVER_ADDRESS;

      (response?.data || []).forEach((imageInfo) => {
        const imgDetails = { imageUrl: "", desc: "", name: "" };

        imgDetails.imageUrl = baseUrl + "/" + imageInfo.image[0]?.path;
        imgDetails.desc = "";
        imgDetails.name = imageInfo.name;
        buildingMaterialImgInfo.push(imgDetails);
      });
      // console.log("buildingMaterialImgInfo", buildingMaterialImgInfo);
      setBuildingMaterials(buildingMaterialImgInfo);
      setTimeout(() => setBuildingMaterials(buildingMaterialImgInfo), 100);
    };
    getData();
  };

  const populateServiceInfo = (cookie, authorization) => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/home/getService",
        {},
        {},
        { Cookie: cookie, Authorization: authorization },
        false
      );

      // console.log("ServiceInfo ", response);
      setServices(response.data);
    };
    getData();
  };

  const populatedDealingInfo = (cookie, authorization) => {
    debugger;
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/home/getDealingIn",
        {},
        {},
        { Cookie: cookie, Authorization: authorization },
        false
      );

      // console.log("dealing in data ", response);
      setDealingInData(response.data);
      setShowDealingInDetaisl(
        response.message !== "Home DealingIn Data not found" &&
          response.message !== "Invalid token"
      );
    };
    getData();
  };

  const populateStatsInfo = (cookie, authorization) => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/home/getMovingBanner",
        {},
        {},
        { Cookie: cookie, Authorization: authorization },
        false
      );
      const data = response.data;
      const statsData = {
        years: data?.years || statsInfo.years,
        clients: data?.clients || stats.clients,
        projects: data?.projects || stats.projects,
        shortDescription: data?.shortDescription || stats.shortDescription,
      };
      // console.log("statsData", statsData);
      setStats(statsData);
    };
    getData();
  };
  const populateBanners = (cookie, authorization) => {
    const getBannerData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/slider/getHomeSlider",
        {},
        {},
        { Cookie: cookie, Authorization: authorization },
        false
      );

      const list = response?.data?.list || [];
      const bannersImages = [];
      list.forEach((element) => {
        const desc = element.description;
        const baseUrl = ApiClient.SERVER_ADDRESS;
        element.image.forEach((imageInfo) => {
          let imageUrl = baseUrl + "/" + imageInfo.path;
          const imageData = { imageUrl: imageUrl, desc: desc };

          bannersImages.push(imageData);
        });
      });
      // console.log("banner data", bannersImages);
      setBanners(bannersImages);
    };
    getBannerData();
  };
  const populateAboutUsDetails = (cookie, authorization) => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/home/getHomeAbout",
        {},
        {},
        { Cookie: cookie, Authorization: authorization },
        false
      );
      // setPropertyData(response.data);
      const aboutUsInfo = {};
      aboutUsInfo.Header = response?.data?.header;
      aboutUsInfo.title = response?.data?.title;
      aboutUsInfo.description = response?.data?.description;
      let images = [];
      const baseUrl = ApiClient.SERVER_ADDRESS;
      response?.data?.aboutImages?.forEach((imageInfo) => {
        let imageUrl = baseUrl + "/" + imageInfo.path;
        const imageData = { imageUrl: imageUrl, desc: "" };
        images.push(imageData);
      });
      aboutUsInfo.images = images;
      setAboutUsSection(aboutUsInfo);
      // console.log('About us details', aboutUsInfo, aboutSection);
    };
    getData();
  };

  const showPropertyData = () => {
    if (!propertyData) return null;
    if (
      Object.keys(propertyData).length === 0 &&
      propertyData.constructor === Object
    ) {
      // console.log("propertyData!={}", propertyData);
      return null;
    } else {
      return (
        <SectionTabs propertyData={propertyData} onChange={onChangeHandler} />
      );
    }
  };

  const Counter = (upto) => (
    <VisibilitySensor>
      {({ isVisible }) => {
        if (isVisible) {
          return (
            <CountUp
              start={0}
              end={upto}
              startOnMount={false}
              duration={4}
            ></CountUp>
          );
        } else return <span>{upto}</span>;
      }}
    </VisibilitySensor>
  );

  return (
    <div className="main-content">
      <Box className="slider-section section">
        <OwlCarouselSlider images={banners} autoPlay={true} />
      </Box>
      {/* slider-section */}

      <Box className="search-section section ">
        <SearchBox />
      </Box>
      {/*========== search-section ============*/}

      {/* <EmiCalculater />
      <EnquryForm/> */}

      <Box className="about-section section">
        <Container className="container">
          <Grid
            container
            spacing={3}
            alignItems="center"
            className="grid-container"
          >
            <Grid className="about-image-column" item xs={12} md={6}>
              {/* <img src={aboutSection.images[0].imageUrl} alt="" style={{height: 490}} /> */}
              <OwlCarouselSlider
                style={{ maxWidth: 500 }}
                images={aboutSection.images || aboutSectionInfo.images}
                autoplay={true}
              />
            </Grid>
            <Grid
              className="about-content-column animate__animated animate__backInRight"
              item
              xs={12}
              md={6}
            >
              <Grid className="about-content">
                <Typography variant="h4">
                  ABOUT VISHAL CONSTRUCTION COMPANY
                </Typography>
                <Typography variant="h2">{aboutSection.title}</Typography>
                <Typography>{aboutSection.description}</Typography>
                <Button
                  component={RouterLink}
                  to={{ pathname: "/about-us" }}
                  variant="outlined"
                  color="primary"
                  className="about-btn"
                >
                  Read More
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/*========== about-section ============*/}

      <Box className="stats-section section">
        <Container className="container">
          <Grid container spacing={3} alignItems="center">
            <Grid className="stats-item" item xs={6} md={3}>
              <Box className="stats-icon">
                <DescriptionIcon />
              </Box>
              <Typography variant="h3">
                {Counter(stats.years)}+ YEARS
              </Typography>
              <Typography>OF REDEFINING</Typography>
            </Grid>

            <Grid className="stats-item" item xs={6} md={3}>
              <Box className="stats-icon">
                <DescriptionIcon />
              </Box>
              <Typography variant="h3">{Counter(stats.projects)}+</Typography>
              <Typography>PROJECTS</Typography>
            </Grid>

            <Grid className="stats-item" item xs={6} md={3}>
              <Box className="stats-icon">
                <DescriptionIcon />
              </Box>
              <Typography variant="h3">{Counter(stats.clients)}+ </Typography>
              <Typography>Happy Clients</Typography>
            </Grid>

            <Grid className="stats-largest-block" item xs={6} md={3}>
              <Typography>{stats.shortDescription}</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/*========== stats-section ============*/}

      <Box className="property-section section">
        <Container>
          <SectionHeader
            title={APP_CONSTANTS.section2_title}
            subtitle={APP_CONSTANTS.section2_subtitle}
          />
          {showPropertyData()}
        </Container>
      </Box>
      {/*========== property-section ============*/}

      <Box className="client-section section">
        <Container>
          {showDealingInDetails ? (
            <SectionClient dealingInData={dealingInData} />
          ) : null}
        </Container>
      </Box>
      {/*========== client-section ============*/}

      <Box className="property-section section">
        <Container>
          <SectionHeader title={services.header} subtitle={services.title} />
          <Grid container spacing={3}>
            {(services.items || []).map((service) => {
              console.log("service", service);
              return (
                <Grid item xs={12} md={3}>
                  <ServiceCard service={service} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      {/*========== property-section ============*/}

      <Box className="client-feedback-section section">
        <Container>
          <SectionFeedback />
        </Container>
      </Box>
      {/*========== client-feedback-section ============*/}

      <Box className="building-material-section section">
        <Container>
          <SectionHeader
            title={APP_CONSTANTS.building_material_title}
            subtitle={APP_CONSTANTS.building_material_subtitle}
          />
          {/* <OwlCarouselSlider images={building_materials} items={5} autoplay={true} nav={true} navText={['next', 'prev']} dots={false} /> */}
          <SectionBM images={building_materials} />
        </Container>
      </Box>
      {/*========== building-material-section ============*/}

      <Box className="map-enquiry-section section">
        <Container>
          <SectionHeader
            title={APP_CONSTANTS.map_section_title}
            subtitle={APP_CONSTANTS.map_subsection_title}
          />
          <SectionMap />
        </Container>
      </Box>
      {/*========== map-enquiry-section ============*/}
    </div>
  );
};

export default withRouter(HomePage);
