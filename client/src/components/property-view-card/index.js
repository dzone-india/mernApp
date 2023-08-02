import React, {useEffect} from "react";
import { Typography, Grid, Container, makeStyles, Button, Box } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import BathtubIcon from '@material-ui/icons/Bathtub';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import './property-view-card.css';
import InnerCarouselSlider from "../inner-carousel-slider";

const useStyles = makeStyles((theme)=> ({
    text1: {
      fontFamily: '"Open Sans",sans-serif',
      color: '#FF7601',
      fontSize: 14,
      marginTop: 10
    },
    text2: {
      fontFamily: '"Open Sans",sans-serif',
      color: '#333333',
      fontSize: 18,
      fontWeight: 'bold'
    },
    text3: {
        fontFamily: '"Open Sans",sans-serif',
        color: '#666666',
        fontSize: 14,
      },
    text4: {
        fontFamily: '"Open Sans",sans-serif',
        color: '#333333',
        fontSize: 14,
        fontWeight: 'bold'
      },
    features: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        paddingTop: 20
    },
    icon: {
        color: '#FF7601', 
        fontSize: 20,
        paddingRight: 10
    },
    btnBox1: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', 
        cursor: 'pointer', 
        paddingTop: 15, 
        paddingBottom: 15,
        backgroundColor: '#FF7601',
        color: '#FFFFFF',
        fontFamily: '"Open Sans",sans-serif',
        fontWeight: 'bold'
    },
    btnBox2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', 
        cursor: 'pointer', 
        paddingTop: 15, 
        paddingBottom: 15,
        backgroundColor: '#222222',
        color: '#FFFFFF',
        fontFamily: '"Open Sans",sans-serif',
        fontWeight: 'bold'
    }
  }));

const PropertyViewCard = props => {
    const {title, subtitle, location, features} = props;
    const classes = useStyles();

    return (
        <Box style={{marginTop: 50, width: 350}}>
        <Grid contaienr >
            <Grid item xs={12} md={12} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                <InnerCarouselSlider />
                <Typography className={classes.text1}>{title}</Typography>
                <Typography className={classes.text2}>{subtitle}</Typography>
                <Grid contaienr>
                    <Grid item style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10}}>
                        <LocationOnIcon style={{color: '#FF7601', fontSize: 20, padding: 0, marginRight: 8}} />
                        <Typography className={classes.text3}>{location}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6} md={6} className={classes.features}>
                    <ZoomOutMapIcon className={classes.icon} />
                    <Typography className={classes.text4}>356 Sq-Ft</Typography>
                </Grid>
                <Grid item xs={6} md={6} className={classes.features}>
                    <LocalHotelIcon className={classes.icon} />
                    <Typography className={classes.text4}>4 Bedrooms</Typography>
                </Grid>
                <Grid item xs={6} md={6} className={classes.features}>
                    <DriveEtaIcon className={classes.icon} />
                    <Typography className={classes.text4}>3 Garage</Typography>
                </Grid>
                <Grid item xs={6} md={6} className={classes.features}>
                    <BathtubIcon className={classes.icon} />
                    <Typography className={classes.text4}>3 Bathroom</Typography>
                </Grid>
             </Grid>
             <Grid container style={{marginTop: 20}}>
                 <Grid item xs={6} md={6}>
                     <Box className={`${classes.btnBox1} btn-more-detail`}>
                        MORE DETAIL
                     </Box>
                 </Grid>
                 <Grid item xs={6} md={6}>
                    <Box className={`${classes.btnBox2} btn-call-now`}>
                        CALL NOW
                    </Box>
                 </Grid>
             </Grid>
        </Grid>
        </Box>
    );
}

export default PropertyViewCard;