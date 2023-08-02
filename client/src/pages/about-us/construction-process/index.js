import React, {useEffect, useState} from 'react';
import {Container, Grid, Typography, makeStyles, Box} from '@material-ui/core';
import '../about-us.css';
import PageBanner from '../../../components/page-banner';
import ApiClient from '../../../api-client';
import HtmlParser from 'react-html-parser';


const useStyles = makeStyles((theme) => ({

}));

const ConstructionProcess = (props) => {
  const classes = useStyles();
  const [constructionProcessData, setConstructionProcessData] = useState([]);


  React.useEffect(() => {
    populateConstructionProcessDetails();

  }, []);


  const populateConstructionProcessDetails = () => {
    const getData = async () => {
      const response = await ApiClient.call(ApiClient.REQUEST_METHOD.POST, '/constructionProcess/getAllActiveConstructionProcess', {}, {}, {Cookie: ApiClient.cookie, Authorization: ApiClient.authorization}, false);

      setConstructionProcessData(response.data || []);
    };
    getData();
  };

  return (
    <div style={{background: '#fff'}}>
      <PageBanner
        bgImage={'/about_us.jpeg'}
        title="Construction Process"
        currentPage="Construction Process"
      />

      <Container>
        <Box className="content-wrapper">
          {
            constructionProcessData.map((Process, i) => {
              const img = Process?.image[0]?.path ? ApiClient.SERVER_ADDRESS + '/' + Process.image[0].path : 'no-image-available-icon-6.png';
              if (i % 2 == 0) {
                return <Box className="about-page-item">
                  <Grid container spacing={3} alignItems="center">
                    <Grid className="about-page-summery" item xs={12} md={6}>
                      <Box className="about-page-content">
                        <Typography variant="h3">{Process.title}</Typography>
                        <Typography>
                          {HtmlParser(Process.description)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid className="about-page-images" item xs={12} md={6} className={classes.style2}>
                      <Box className="about-page-image"><img src={img} alt='' /></Box>
                    </Grid>
                  </Grid>
                </Box>;
              }
              return <Box className="about-page-item">
                <Grid container spacing={3} direction="row-reverse" alignItems="center">
                  <Grid className="about-page-summery" item xs={12} md={6}>
                    <Box className="about-page-content">
                      <Typography variant="h3">{Process.title}</Typography>
                      <Typography>
                        {HtmlParser(Process.description)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid className="about-page-images" item xs={12} md={6} className={classes.style2}>
                    <Box className="about-page-image"><img src={img} alt='' /></Box>
                  </Grid>
                </Grid>
              </Box>;
            })
          }

        </Box>
      </Container>
      )
    </div>
  );
};

export default ConstructionProcess;