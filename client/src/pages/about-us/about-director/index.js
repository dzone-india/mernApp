import React, {useEffect, useState} from 'react';
import {Container, Grid, Typography, makeStyles, Box} from '@material-ui/core';
import '../about-us.css';
import PageBanner from '../../../components/page-banner';
import ApiClient from '../../../api-client';
import ReactHtmlParser from 'react-html-parser';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from '@material-ui/icons/YouTube';
// import {NoDataAvailable} from '../../components/no-details-available/no-details-available';



const useStyles = makeStyles((theme) => ({
  text1: {
    fontFamily: '"Open Sans",sans-serif',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text2: {
    fontFamily: '"Open Sans",sans-serif',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },
  text3: {
    fontFamily: '"Open Sans",sans-serif',
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 10
  },
  text4: {
    fontFamily: '"Open Sans",sans-serif',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  socialBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#06AEB8',
    marginRight: 8,
    width: 30,
    height: 30,
    borderRadius: 25,
    cursor: 'pointer'
  },
  footer_column1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  links: {
    cursor: 'pointer',
  }

}));


const SocialIcons = ({socialLinks}) => {
  console.log("social links ", socialLinks);

  const classes = useStyles();
  return <Grid container>
    <Grid item style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10}}>
      <Box className={`${classes.socialBox} social_icon`}>
        <a target='_blank' href={socialLinks?.facebook}>
          <FacebookIcon style={{color: '#FFFFFF', fontSize: 20, padding: 0, }} />
        </a>
      </Box>

      <Box className={`${classes.socialBox} social_icon`}>
        <a target='_blank' href={socialLinks?.instagram}>
          <InstagramIcon style={{color: '#FFFFFF', fontSize: 20, padding: 0, }} />
        </a>
      </Box>
      <Box className={`${classes.socialBox} social_icon`}>
        {console.log("socialLinks?.linkedin", socialLinks.linkedin)}
        <a target='_blank' href={socialLinks?.linkedin}>

          <LinkedInIcon style={{color: '#FFFFFF', fontSize: 20, padding: 0, }} />
        </a>
      </Box>
      <Box className={`${classes.socialBox} social_icon`}>
        <a target='_blank' href={socialLinks ? socialLinks.twitter : ''}>
          <TwitterIcon style={{color: '#FFFFFF', fontSize: 20, padding: 0, }} />
        </a>
      </Box>

    </Grid>
  </Grid>;
};


const AboutDirectors = (props) => {
  const classes = useStyles();
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    populateDirectorDetails();
  }, []);


  const populateDirectorDetails = () => {
    const getData = async () => {
      const response = await ApiClient.call(ApiClient.REQUEST_METHOD.POST, '/team/getDirector', {}, {}, {Cookie: ApiClient.cookie, Authorization: ApiClient.authorization}, false);
      console.log("director details ", response.data);

      setDirectors(response?.data?.list || []);
      // console.log('About us details', aboutUsInfo, aboutSection);
    };
    try {
      setLoading(true);
      getData();
      setLoading(false);
    } catch (e) {
      console.log("populateDirectorDetails::e", e);
      setLoading(false);
    }
  };

  return (loading == false ?
    <div style={{background: '#fff'}}>
      <PageBanner
        bgImage={'/about_us.jpeg'}
        title="About Directors"
        currentPage="About The Director"
      />

      <Container>
        <Box className="content-wrapper">


          {
            directors.map((director, i) => {

              const {facebook, twitter, instagram, linkedin} = director;

              const profileImg = director?.image[0]?.path ? ApiClient.SERVER_ADDRESS + "/" + director?.image[0]?.path : 'no-image-available-icon-6.png';

              return (i % 2 == 0 ? <Box className="about-block-item">
                <Grid container alignItems="center">
                  <Grid className="about-block-images" item xs={12} md={6}>
                    <Box className="about-block-image">
                      <img src={profileImg} alt="" />
                    </Box>
                  </Grid>
                  <Grid className="about-block-summery" item xs={12} md={6}>
                    <Box className="about-block-content">
                      <Typography variant="h3">{director.name}</Typography>
                      <Typography variant="h6">{director.designation}</Typography>
                      <Typography>
                        {ReactHtmlParser(director.shortDescription)}
                      </Typography>
                      <Typography>
                        {ReactHtmlParser(director.description)}
                      </Typography>
                      <SocialIcons socialLinks={{...director}} />
                    </Box>
                  </Grid>
                </Grid>
              </Box> :

                <Box className="about-block-item about-block-left-content">
                  <Grid container alignItems="center">
                    <Grid className="about-block-summery" item xs={12} md={6}>
                      <Box className="about-block-content">
                        <Typography variant="h3">{director.name}</Typography>
                        <Typography variant="h6">{director.designation}</Typography>
                        <Typography>
                          {ReactHtmlParser(director.shortDescription)}
                        </Typography>
                        <Typography>
                          {ReactHtmlParser(director.description)}
                        </Typography>
                        <SocialIcons socialLinks={{...director}} />
                      </Box>
                    </Grid>
                    <Grid className="about-block-images" item xs={12} md={6}>
                      <Box className="about-block-image">
                        <img src={profileImg} alt="" />
                      </Box>
                    </Grid>

                  </Grid>
                </Box>);
            })}
        </Box>
      </Container>
      )
    </div> : <div style={{textAlign: 'center'}}>loading...</div>
  );
};

export default AboutDirectors;