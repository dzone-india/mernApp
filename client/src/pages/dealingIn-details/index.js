import React, {useEffect, useState} from 'react';
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
  Paper,
} from '@material-ui/core';
import './dealingIn-details.css';
import PageBanner from '../../components/page-banner';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import ApiClient from '../../api-client';
import ReactHtmlParser from 'react-html-parser';
// import {NoDataAvailable} from '../../components/no-details-available/no-details-available';
import CircularProgress from "@mui/material/CircularProgress";


const useStyles = makeStyles((theme) => ({
  text1: {
    fontFamily: '"Open Sans",sans-serif',
    color: '#777777',
    fontSize: 13,
    marginTop: 10,
    marginBottom: 10,
  },
  text3: {
    fontFamily: '"Open Sans",sans-serif',
    color: '#666666',
    fontSize: 14,
  },
  text4: {
    fontFamily: '"Open Sans",sans-serif',
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text5: {
    fontFamily: '"Open Sans",sans-serif',
    color: '#FF7601',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text6: {
    fontFamily: '"Open Sans",sans-serif',
    color: '#888888',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.8,
  },
  text7: {
    fontFamily: '"Open Sans",sans-serif',
    color: '#333333',
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 10,
  },
  text8: {
    fontFamily: '"Open Sans",sans-serif',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 10,
  },
  icon: {
    color: '#FF7601',
    fontSize: 20,
    paddingRight: 10,
  },
  style1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  btn1: {
    borderRadius: 8,
    color: '#FFFFFF',
    textTransform: 'none',
    fontFamily: '"Open Sans",sans-serif',
    backgroundColor: '#FF7601',
  },
  btn2: {
    borderRadius: 15,
    color: '#FFFFFF',
    textTransform: 'none',
    marginRight: 10,
    fontFamily: '"Open Sans",sans-serif',
  },
  style2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  style3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  box1: {
    width: 10,
    paddingRight: 5,
    paddingLeft: 5,
    color: '#333333',
  },
}));

const DealingInItemDetailPage = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const {item} = props;
  const dispatch = useDispatch();
  let query = useQuery();
  const [viewDetails, setViewDetails] = React.useState(false);
  const [dealingInDetail, setDealingInDetail] = React.useState({});
  let token = query.get('token');

  // const propertyListItem = useSelector((state) => state.PropertyDetail.data);
  // console.log("propertyListItem", propertyListItem);
  // if (propertyListItem) {
  //   if (viewDetails === false) {
  //     console.log(propertyListItem);
  //     setViewDetails(true);
  //     setPropertyDetail(propertyListItem.data);
  //   }
  // }
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  React.useEffect(() => {
    // let reqData = {
    //   // serviceId: location?.state,

    // };
    const _id = location?.state;
    fetchDealingInDetails(_id);
  }, []);

  const fetchDealingInDetails = (_id) => {

    const getData = async () => {
      const response = await ApiClient.call(ApiClient.REQUEST_METHOD.POST, '/home/getDealingInItem', {_id: _id}, {}, {Cookie: ApiClient.cookie, Authorization: ApiClient.authorization}, false);

      console.log("Service Details Info ", response.data);
      if (response.data) {
        setDealingInDetail(response.data);
        setViewDetails(true);
      }
    };
    getData();
  };

  let img1 = '/property_img3.jpeg';
  let banner = '/about_us.jpeg';
  if (dealingInDetail !== {} && dealingInDetail.media && dealingInDetail.media.length > 0 && dealingInDetail.media[0].image && dealingInDetail.media[0].image.length > 0) {
    img1 = ApiClient.SERVER_ADDRESS + "/" + dealingInDetail.media[0].image[0].path;
    console.log(" imag ***x", img1);
    banner = ApiClient.SERVER_ADDRESS + "/" + dealingInDetail.media[0].banner[0].path;
    console.log("banner", banner);
  }


  return (
    <div style={{background: '#F7F7F7'}}>
      <PageBanner
        bgImage={banner}
        title="Dealing In Item details"
        currentPage="DEALING IN ITEM DETAILS"
      />
      {/* <Gallery /> */}
      {viewDetails ? (
        <Container>

          <Paper elevation={0} style={{padding: 20, marginTop: 20}}>

            <Grid container>
              <Grid item xs={12} md={6} className={classes.style2} >
                <img src={img1} height={"auto"} alt="" width={'110%'} />
              </Grid>
              <Grid item xs={12} md={6} style={{padding: 20, backgroundColor: "#ff7600", height: 'fit-content', margin: 'auto'}}>
                <Typography className={classes.text8} style={{padding: 20}}> {dealingInDetail.title}</Typography>
                <Typography className={classes.text3} style={{padding: 20, lineHeight: "2.3em", color: '#fff'}} >
                  {ReactHtmlParser(dealingInDetail.description)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          {/* <Paper elevation={0} style={{padding: 20, marginTop: 20, marginBottom: 20}}>

            <Grid container style={{marginBottom: 20}}>
              <Grid item xs={12} md={6} style={{padding: 20, marginTop: 20}}>
                <Typography className={classes.text5} style={{paddingLeft: 20}} >Why Us</Typography>
                <Typography className={classes.text7} style={{padding: 20}}>
                  Why Are We Awesome?</Typography>
                <Typography className={classes.text3} style={{padding: 20, lineHeight: "2.3em"}} >
                  Vishal Construction Company is a Jaipur based construction company which today is a renowned name in providing best in class real estate services to its clients located all over India. Vishal Construction Company specializes in its area of work wherein they are expert in the real estate services, construction process of housing, commercial and other types of properties. They majorly serve clientele of Rajasthan, Hyderabad, Kolkata and other metro cities of India.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} className={classes.style2} style={{backgroundImage: "#03b2cb", padding: 40}}>
                <img src="Happy-Family.jpeg" height={"100%"} width={'100%'} />
              </Grid>

            </Grid>
          </Paper> */}
        </Container>
      ) : 
      // NoDataAvailable('No Data Available')
      <CircularProgress />
      }
    </div>
  );
};

export default DealingInItemDetailPage;

