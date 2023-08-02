import React, {useEffect, useState} from 'react';
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
  Paper,
} from '@material-ui/core';
import './about-us.css';
import PageBanner from '../../components/page-banner';
import InfoCard from './components/ourTeam';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import OurTeam from './components/ourTeam/index';
import ApiClient from '../../api-client';
import OwlCarouselSlider from '../../components/carousel-slider';
import HtmlParser from 'react-html-parser';

const useStyles = makeStyles((theme) => ({

}));

const AboutUsPage = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const {item} = props;
  const dispatch = useDispatch();
  let query = useQuery();
  const [viewDetails, setViewDetails] = useState(false);
  let token = query.get('token');
  const [aboutUsSection, setAboutUsSection] = useState([]);
  const [team, setTeam] = useState([]);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  React.useEffect(() => {
    populateAboutUsDetails();
    populateTeamDetails();
  }, []);


  const populateAboutUsDetails = () => {
    const getData = async () => {
      const response = await ApiClient.call(ApiClient.REQUEST_METHOD.POST, '/aboutPage/getAboutPageData', {}, {}, {Cookie: ApiClient.cookie, Authorization: ApiClient.authorization}, false);

      setAboutUsSection(response.data || []);
      // console.log('About us details', aboutUsInfo, aboutSection);
    };
    getData();
  };

  const populateTeamDetails = () => {
    const getData = async () => {
      const response = await ApiClient.call(ApiClient.REQUEST_METHOD.POST, '/team/getClientTeamMember', {}, {}, {Cookie: ApiClient.cookie, Authorization: ApiClient.authorization}, false);
      // setPropertyData(response.data);

      setTeam(response.data.list);
      setViewDetails(true);
      // console.log('About us details', aboutUsInfo, aboutSection);
    };
    getData();
  };

  return (
    <div style={{background: '#fff'}}>
      <PageBanner
        bgImage={'/about_us.jpeg'}
        title="About Us"
        currentPage="ABOUT US"
      />
      {/* <Gallery /> */}
      {viewDetails ? (
        <Container>
          <Box className="content-wrapper">
            {
              aboutUsSection.map((aboutUsData, i) => {

                const img = aboutUsData?.image[0]?.path ? ApiClient.SERVER_ADDRESS + '/' + aboutUsData.image[0].path : 'no-image-available-icon-6.png';

                if (i % 2 === 0) {
                  return <Box className="about-block-item">
                    <Grid container alignItems="center">
                      <Grid className="about-block-images" item xs={12} md={6}>
                        <Box className="about-block-image">
                          {/* <img src={aboutUsSection.images[0].imageUrl || "about-img.jpeg"} height={"auto"} alt={''} /> */}
                          {/* <OwlCarouselSlider images={aboutUsSection.images || []} autoplay={true} /> */}
                          <img src={img} alt='' />
                        </Box>
                      </Grid>
                      <Grid className="about-block-summery" item xs={12} md={6}>
                        <Box className="about-block-content">
                          <Typography variant="h3">{aboutUsData.title}</Typography>
                          <Typography>
                            {HtmlParser(aboutUsData.description)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>;
                }
                return < Box className="about-page-item about-whyus-item">
                  <Grid container spacing={3}>
                    <Grid className="about-page-summery" item xs={12} md={6}>
                      <Box className="about-page-content">
                        {/* <Typography variant="h4">Why Us</Typography> */}
                        <Typography variant="h3">{aboutUsData.title}</Typography>
                        <Typography>
                          {HtmlParser(aboutUsData.description)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid className="about-page-images" item xs={12} md={6} className={classes.style2}>
                      <Box className="about-page-image"> <img src={img} alt='' /></Box>
                    </Grid>
                  </Grid>
                </Box>;
              })
            }

            {/* <Box className="about-page-item">
              <Box className="about-page-content">
                <Typography variant="h4"> {aboutUsSection.header}</Typography>
                <Typography variant="h3"> {aboutUsSection.title}</Typography>
                <Typography>
                  {aboutUsSection.description}
                </Typography>
              </Box>
            </Box> */}

            <Box className="page-section-header" align="center">
              <Box component="h2" className="page-section-title">Our Team</Box>
            </Box>
            <OurTeam team={team} />
          </Box>
        </Container>
      ) : null}
    </div >
  );
};

export default AboutUsPage;