import { Box, Container } from '@material-ui/core';
import React from 'react';
import "./banner-content.css"


function BannerContent(){
    return(
        <Container className="bannerContainer">
            <h2 className="bannerh2">Now Book A Vishal Ultima Online</h2>
            <h3 className="bannerh3">IN JUST 3 EASY STEPS</h3>
            <img src={process.env.PUBLIC_URL + '/banner/3steps.png'} />
            <p className="bannerancr">
                <a href="#">Home </a>
                <p>/ Book Now</p>
            </p>
        </Container>
    )
}

export default BannerContent;