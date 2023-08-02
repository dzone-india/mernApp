import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import {Container, Grid, Box} from '@material-ui/core';
import APP_CONSTANTS from '../../utils/constants';
import Rating from '@material-ui/lab/Rating';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Paper, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: 300
    },
    cover: {
        width: "100%"
    },
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
    },
    style3: {
        display: 'flex',
        alignContent: 'end'
    },
    box1: {
        width: 10,
        paddingRight: 5,
        paddingLeft: 5,
        color: '#333333',
    },
}));

export default function PropertCard() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Container className={classes.root} style={{display: 'flex'}}>
            <Grid container={true} xs={12} md={4}>


                <CardMedia
                    className={classes.cover}
                    image="Happy-Family.jpeg"
                    title="Live from space album cover"
                />



            </Grid>


            {/* <Typography>
                    Semi Detached 5 Bedroom house for sale
                </Typography> */}

            <Grid item xs={12} md={8} style={{paddingLeft: 20}} >

                <Paper elevation={1} style={{padding: 20, marginTop: 20}}>
                    <Grid container>
                        <Grid item xs={12} md={8} className={classes.style2}>
                            <Typography className={classes.text7}>
                                Semi Detached 5 Bedroom
                                {/* {PropertyDetail.nameOfProject} */}
                            </Typography>
                            <Typography style={{
                                textTransform: 'capitalize', backgroundColor: "#00afb8", padding: "3px 7px", borderRadius: 5, fontSize: 10, color: "#fff", lineHeight: 3
                            }}>FOR Sale </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} className={classes.style3}>
                            <Typography className={classes.text3}>Starts From</Typography>
                            <Box className={classes.box1}>/</Box>
                            <Typography className={classes.text5}>Rs. 3250000</Typography>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginTop: 10}}>
                        <Grid item xs={12} md={8} className={classes.style2}>
                            <LocationOnIcon
                                style={{
                                    color: '#FF7601',
                                    fontSize: 20,
                                    padding: 0,
                                    marginRight: 8,
                                }}
                            />
                            <Typography className={classes.text3}>
                                {/* {PropertyDetail?.address?.latitude} {PropertyDetail?.address?.longitude}  {PropertyDetail?.address?.address} {PropertyDetail?.address?.city} {PropertyDetail?.address?.State} {PropertyDetail?.address?.pinCode} */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} className={classes.style3}>
                            <Rating name="half-rating-read" defaultValue={4} precision={0.5} value={4} readOnly />
                        </Grid>
                        <Grid item xs={12} md={12} style={{marginTop: 20}}>
                            <Button
                                variant="contained"
                                className={`${classes.btn2} btn-book-online`}
                            // onClick={() => {
                            //     if (!localStorage.getItem('user')) {
                            //         localStorage.setItem('bookNow', true);
                            //         localStorage.setItem('pid', location?.state);
                            //         return props.history.push('/signin');
                            //     }
                            //     setBookNow(true);
                            //     console.log('book now clicked');
                            // }}
                            >
                                {APP_CONSTANTS.book_now}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>




        </Container>
    );
}
